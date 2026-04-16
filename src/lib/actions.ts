'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// --- AUTH ACTIONS ---

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  let success = false;
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    success = true;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }

  if (success) {
    revalidatePath('/', 'layout'); 
    redirect('/account/home');
  }
}

export async function register(prevState: string | undefined, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string || 'customer';

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
        `;

    } catch (error: any) {
        if (error.code === '23505') {
            return 'Email already exists.';
        }
        console.error('Registration Error:', error);
        return 'Failed to create account.';
    }

    redirect('/login');
}

// --- PRODUCT ACTIONS ---

export async function createProduct(prevState: string | undefined, formData: FormData) {
    const session = await auth();
    
    // Type Guard: Narrowing session.user.id to string
    const sellerId = session?.user?.id;

    if (!sellerId || session.user.role !== 'seller') {
        return 'Unauthorized: Only logged-in sellers can create products.';
    }

    try {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const image_url = (formData.get('image_url') as string) || 'https://placehold.co/400x400';
        
        const categoryInput = formData.get('category') as string;
        const category = categoryInput?.trim() ? categoryInput : 'Others';

        await sql`
            INSERT INTO products (seller_id, name, description, price, category, image_url)
            VALUES (${sellerId}, ${name}, ${description}, ${price}, ${category}, ${image_url})
        `;

    } catch (error) {
        console.error('Database Error:', error);
        return 'Database Error: Failed to Create Product.';
    }

    revalidatePath('/shop');
    revalidatePath('/seller/products');
    redirect('/seller/products');
}

// --- REVIEW ACTIONS ---

const ReviewSchema = z.object({
    product_id: z.string(),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(1, "Comment cannot be empty"),
});

export async function createReviews(formData: FormData) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('You must be logged in to leave a review.');
    }

    const validatedFields = ReviewSchema.safeParse({
        product_id: formData.get('product_id'),
        rating: formData.get('rating'),
        comment: formData.get('comment'),
    });

    if (!validatedFields.success) {
        throw new Error('Invalid review data.');
    }

    const { product_id, rating, comment } = validatedFields.data;
    const reviewId = randomUUID();

    try {
        await sql`
            INSERT INTO reviews (id, product_id, user_id, rating, comment)
            VALUES (${reviewId}, ${product_id}, ${userId}, ${rating}, ${comment})
        `;
        
        revalidatePath(`/shop/${product_id}`);
    } catch (error) {
        console.error('Review Error:', error);
        throw new Error('Failed to post review.');
    }
}
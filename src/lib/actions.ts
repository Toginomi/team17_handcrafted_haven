'use server';

import { randomUUID } from 'crypto';
import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    product_id: z.string(),
    user_id: z.string(),
    rating: z.coerce.number(),
    comment: z.string(),
});

const CreateReview = FormSchema;

export async function createReviews(formData:FormData) {
    // Rows in DB: id, product_id, user_id, rating, created_at = null, comment
    // User id for unknown user: 8990c972-a47b-420d-8fcc-efbf31f7024c

    // getting data from form
    const { product_id, rating, comment, id, user_id } = CreateReview.parse({
        product_id: formData.get('product_id'),
        user_id: '8990c972-a47b-420d-8fcc-efbf31f7024c',
        rating: formData.get('rating'),
        comment: formData.get('comment'),
        id: randomUUID(),
    });

    await sql`
        INSERT INTO reviews (id, product_id, user_id, rating, comment)
        VALUES (${id}, ${product_id}, ${user_id}, ${rating}, ${comment})
    `;
}
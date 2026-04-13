import Image from "next/image";
import { fetchProductDetails } from "@/lib/data";
import styles from "./page.module.css";
import { Product } from "@/lib/definitions";
import AddToCartButton from "../../layout_components/AddToCartButton";

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const { product, reviews } = await fetchProductDetails(id);

    if (!product) {
        return (
            <main className={styles.page}>
                <p className={styles.error}>Product not found.</p>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.layout}>
                {/* Product Image */}
                <div className={styles.imageWrap}>
                    <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill 
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.image} 
                    />
                </div>

                {/* Product Info */}
                <div className={styles.info}>
                    <div className={styles.artisanHeader}>
                        <div className={styles.avatarWrap}>
                            <Image 
                                src={product.seller_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.shop_name)}&background=random`} 
                                alt={product.shop_name}
                                fill
                                sizes="40px"
                                className={styles.avatar}
                            />
                        </div>
                        <p className={styles.artisanName}>Crafted by {product.shop_name}</p>
                    </div>

                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
                    <p className={styles.description}>{product.description}</p>

                    <AddToCartButton product={product as Product} />

                    {/* Artisan Mini-Bio */}
                    <div className={styles.sellerSection}>
                        <h3>About the Artisan</h3>
                        <p>{product.seller_bio}</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className={styles.reviewsSection}>
                <h2>Customer Reviews</h2>
                {reviews.length > 0 ? (
                    <div className={styles.reviewsList}>
                        {reviews.map((review: any) => (
                            <div key={review.id} className={styles.reviewCard}>
                                <p className={styles.reviewUser}><strong>{review.user_name}</strong></p>
                                <p className={styles.rating}>{"⭐".repeat(review.rating)}</p>
                                <p className={styles.comment}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet for this piece.</p>
                )}
            </section>
        </main>
    );
}
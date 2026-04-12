"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

const products = [
    {
        id: 1,
        name: "Walnut Accent Chair",
        price: "$189",
        description:
            "A clean handcrafted chair with a warm walnut finish for modern living spaces.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 2,
        name: "Rustic Coffee Table",
        price: "$245",
        description:
            "Solid wood center table built to bring warmth and character into the room.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 3,
        name: "Floating Wall Shelf",
        price: "$72",
        description:
            "Minimal shelf piece designed for décor, books, and small everyday items.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 4,
        name: "Dining Bench",
        price: "$158",
        description:
            "Hand-finished bench seating with a sturdy frame and timeless farmhouse feel.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 5,
        name: "Bedside Table",
        price: "$129",
        description:
            "Compact bedside storage piece crafted for both style and daily function.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 6,
        name: "Entryway Console",
        price: "$210",
        description:
            "Slim handcrafted console table ideal for hallways, foyers, and display décor.",
        image: "/images/hero-image.jpg",
    },
];

export default function ProductDetailPage() {
    const { id } = useParams() as { id: string }; 
    const router = useRouter();

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <main className={styles.page}>
                <p>Product not found.</p>
            </main>
        );
    }

    function addToCart() {
        if (!product) return;
        
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("storage"));

        alert(`${product.name} added to cart!`);
    }

    return (
        <main className={styles.page}>
            <button className={styles.backButton} onClick={() => router.back()}>
                ← Back to Shop
            </button>

            <div className={styles.layout}>
                <div className={styles.imageWrap}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                    />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>{product.price}</p>
                    <p className={styles.description}>{product.description}</p>

                    <button className={styles.addButton} onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    );
}

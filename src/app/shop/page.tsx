import Image from "next/image";
import styles from "./page.module.css";

const products = [
  {
    id: 1,
    name: "Walnut Accent Chair",
    price: "$189",
    description: "A clean handcrafted chair with a warm walnut finish for modern living spaces.",
    image: "/images/hero-image.jpg",
  },
  {
    id: 2,
    name: "Rustic Coffee Table",
    price: "$245",
    description: "Solid wood center table built to bring warmth and character into the room.",
    image: "/images/hero-image.jpg",
  },
  {
    id: 3,
    name: "Floating Wall Shelf",
    price: "$72",
    description: "Minimal shelf piece designed for décor, books, and small everyday items.",
    image: "/images/hero-image.jpg",
  },
  {
    id: 4,
    name: "Dining Bench",
    price: "$158",
    description: "Hand-finished bench seating with a sturdy frame and timeless farmhouse feel.",
    image: "/images/hero-image.jpg",
  },
  {
    id: 5,
    name: "Bedside Table",
    price: "$129",
    description: "Compact bedside storage piece crafted for both style and daily function.",
    image: "/images/hero-image.jpg",
  },
  {
    id: 6,
    name: "Entryway Console",
    price: "$210",
    description: "Slim handcrafted console table ideal for hallways, foyers, and display décor.",
    image: "/images/hero-image.jpg",
  },
];

export default function ShopPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Handcrafted Collection</p>
        <h1 className={styles.heading}>Shop Our Featured Pieces</h1>
        <p className={styles.subheading}>
          Explore a curated set of handcrafted furniture and décor pieces built
          for warmth, function, and timeless style.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {products.map((product) => (
            <article key={product.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={product.id === 1 ? "eager" : "lazy"}
                  className={styles.image}
                />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.titleRow}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <span className={styles.price}>{product.price}</span>
                </div>

                <p className={styles.description}>{product.description}</p>

                <button type="button" className={styles.cardButton}>
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
import Image from "next/image";
import styles from "./page.module.css";

export default function AboutUsPage() {
  return (
    <main className={styles.container}>

      {/* Page Title */}
      <section className={styles.titleSection}>
        <h1>About Handcrafted Haven</h1>
      </section>

      {/* Our Story */}
      <section className={styles.storySection}>
        <div className={styles.storyText}>
          <h2>Our Story</h2>
          <p>
            Handcrafted Haven was created to celebrate the beauty, skill, and
            authenticity behind handmade goods. We believe every crafted item
            carries a story — a connection between the artisan and the person
            who brings that piece into their home. Our platform gives creators
            a space to share their passion and customers a place to discover
            meaningful, sustainable treasures.
          </p>
        </div>

        <div className={styles.storyImage}>
          <Image
            src="/images/about/story.jpg"
            alt="Artisan working in pottery studio"
            width={600}
            height={400}
            className={styles.storyRealImage}
            priority
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className={styles.missionSection}>

        {/* Row of 3 images */}
        <div className={styles.missionImagesRow}>
          <Image
            src="/images/about/mission1.jpg"
            alt="Potter shaping clay on a wheel"
            width={300}
            height={300}
            className={styles.missionRealImage}
          />

          <Image
            src="/images/about/mission2.jpg"
            alt="Artisan shaping pottery in warm workshop"
            width={300}
            height={300}
            className={styles.missionRealImage}
          />

          <Image
            src="/images/about/mission3.jpg"
            alt="Hands shaping clay in natural light"
            width={300}
            height={300}
            className={styles.missionRealImage}
          />
        </div>

        {/* Text underneath */}
        <div className={styles.missionTextUnder}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower artisans, uplift local craftsmanship, and
            promote conscious consumerism. We aim to create a thriving community
            where creators can share their work, customers can shop with purpose,
            and handmade artistry is celebrated every day.
          </p>
        </div>

      </section>

      {/* Our Values */}
      <section className={styles.valuesSection}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3>Authenticity</h3>
            <p>
              Every item on Handcrafted Haven is made with intention, care, and
              individuality. We honor the stories behind each creation.
            </p>
          </div>

          <div className={styles.valueCard}>
            <h3>Sustainability</h3>
            <p>
              We champion slow-made, eco-conscious craftsmanship that respects
              both people and the planet.
            </p>
          </div>

          <div className={styles.valueCard}>
            <h3>Community</h3>
            <p>
              We believe in uplifting one another — artisans, customers, and
              collaborators alike.
            </p>
          </div>

          <div className={styles.valueCard}>
            <h3>Creativity</h3>
            <p>
              Innovation and artistry are at the heart of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className={styles.offerSection}>
        <div className={styles.offerText}>
          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Seller Profiles:</strong> Artisans can create personalized
              profiles to share their story and showcase their work.
            </li>
            <li>
              <strong>Product Listings:</strong> A curated marketplace of
              handcrafted goods with images, descriptions, and pricing.
            </li>
            <li>
              <strong>Reviews & Ratings:</strong> Customers can leave feedback to
              support artisans and guide other shoppers.
            </li>
            <li>
              <strong>Community Connection:</strong> A space where creators and
              customers can interact, appreciate, and celebrate handmade art.
            </li>
          </ul>
        </div>

        <div className={styles.offerImage}>
          <Image
            src="/images/about/story.jpg"
            alt="Handcrafted pottery displayed on shelves"
            width={500}
            height={350}
            className={styles.offerRealImage}
          />
        </div>
      </section>

    </main>
  );
}

import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: "This is the home page for the handcrafted haven site",
}

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.p}>Hello World!</p>
      </main>
    </div>
  );
}

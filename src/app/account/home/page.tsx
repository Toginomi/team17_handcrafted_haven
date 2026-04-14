import styles from "./account_home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.all}>
            <h1>You're Logged in!</h1>
            <p className={styles.question}>What would you like to do?</p>
            <ul className={styles.ul}>
                <li><Link href="/account/add/">Add a product to sell</Link></li>        
            </ul>
        </div>
    );
}
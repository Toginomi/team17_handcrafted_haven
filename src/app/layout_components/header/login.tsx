import Link from "next/link";
import styles from "./header.module.css"

export default function LoginButton() {
    return (
        <Link href='/account' className={styles.login}>Login</Link>
    );
}
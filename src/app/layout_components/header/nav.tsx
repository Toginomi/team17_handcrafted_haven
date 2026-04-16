"use client";

import NavLink from "./navLink";
import styles from "@/app/layout_components/header/header.module.css"
import { useSession } from "next-auth/react";

export default function Nav() {
    const { data: session, status } = useSession();
    const userRole = session?.user?.role;

    if (status === "loading") {
        return (
            <nav className={styles.navigation}>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about_us">About</NavLink>
                <NavLink href="/shop">Shop</NavLink>
            </nav>
        );
    }

    return (
        <nav className={styles.navigation}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about_us">About</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            
            {status === "authenticated" && (userRole === 'seller' || userRole === 'admin') && (
                <NavLink href="/seller/products">Seller Dashboard</NavLink>
            )}
        </nav>
    );
}
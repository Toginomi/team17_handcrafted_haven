'use client';

import Image from "next/image";
import styles from "./header.module.css"
import Link from "next/link";
import Nav from "./nav";
import LoginButton from "./login";
import Hamburger from "./hamburger";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <>
            <header className={styles.header}>
                <div className={styles.siteInfo}>
                    {/* Logo */}
                    <Image
                        src="/images/hch_logo.svg"
                        alt="Handcrafted Haven Logo"
                        width={50}
                        height={50}
                        loading="eager"
                        className={styles.logo}
                    />
                    {/* Site Name / Title */}
                    <Link href="/" className={styles.siteName}>
                        <span>Handcrafted Haven</span>
                    </Link>
                </div>

                {/* Navigation (Desktop) */}
                <div className={styles.desktopMenu}>
                    <Nav /> 
                </div>


                {/* login button */}
                <LoginButton />

                {/* Hamburger button for Mobile menu */}
                <Hamburger toggleMenu={toggleMenu} />
            </header>

            {/* moblie navigation*/}          
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <Hamburger toggleMenu={toggleMenu} classes={`${styles.hamburger} ${styles.openMenu}`} />
                <Nav />
            </div>
        </>
    );
}
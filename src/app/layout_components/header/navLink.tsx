"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './header.module.css';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
    // getting path in URL
    const pathname = usePathname();

    // checking to see if the current pathname equals the href
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`${isActive ? styles.active : ""}`}
        >
            {children}
        </Link>
    );
}
import styles from "./header.module.css";

type HamburgerProps = {
    toggleMenu: () => void;
    classes?: string;
}

export default function Hamburger({
    classes = styles.hamburger, 
    toggleMenu
}: HamburgerProps) {
    {/* Hamburger button for Mobile menu */ }
    return (
        // {`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
        // {styles.hamburger}
        <button className={classes} onClick={toggleMenu} />  
    );
}
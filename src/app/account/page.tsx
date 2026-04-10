import Image from "next/image";
import styles from "./login.module.css";
import { Metadata } from "next";
import LoginForm from './components/login_form';

export const metadata: Metadata = {
    title: 'Login',
};

export default function Login() {
    return (
        <>
            <h1 className={styles.h1}>Have an account? Login Here!</h1>
            <LoginForm />
        </>
    );
}
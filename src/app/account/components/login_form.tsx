"use client"

import Image from "next/image";
import styles from "../login.module.css";

const showPassword = () => {
    const eyeSVG = document.querySelector('#eyeSVG');
    const pswdInput = document.querySelector('#password');
    const type = pswdInput?.getAttribute('type');

    if (type === 'password') {
        pswdInput?.setAttribute('type', 'text');
        eyeSVG?.setAttribute('src', "/images/login/eye-slash.svg");
    }
    else {
        pswdInput?.setAttribute('type', 'password');
        eyeSVG?.setAttribute('src', "/images/login/eye.svg");
    }
};

export default function LoginForm() {

    return (
        <form className={styles.loginForm} /*action= need to add an action here  }}*/ >
            {/* VVVVV Username VVVVV */}
            <label className={styles.inputArea} htmlFor="username">
                Username:
                <input
                    className={styles.input}
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username here"
                    required
                />
            </label>
            <div className={styles.passwordField}>
                <label className={styles.inputArea} htmlFor="password">
                    Password:
                    <input
                        className={styles.input}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password here"
                        required
                    />
                </label>
                <Image
                    height={32}
                    width={40}
                    src="/images/login/eye.svg"
                    alt="show password button"
                    id="eyeSVG"
                    onClick={showPassword}
                />
            </div>
            <input
                type="submit"
                value="Login"
                id="login"
                className={styles.login}
                name="login"
            />
        </form>
    );
}
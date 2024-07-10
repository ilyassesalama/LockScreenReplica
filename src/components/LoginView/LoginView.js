import React, { useEffect, useState } from 'react';
import styles from './LoginView.module.css';

export default function LoginView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passWrong, setPassWrong] = useState(false);

    useEffect(() => {
        document.getElementById('password_input').focus();
        window.electron.receiveMessage('message-from-main', data => {
            setUsername(data[0]);
        });
        return () => {
            window.electron.receiveMessage('message-from-main', null);
        };
    }, []);

    useEffect(() => {
        if (password.length > 0) {
            document.querySelector('#login-btn').style.visibility = 'visible';
            document.querySelector('#password_hint').style.visibility = 'hidden';
        } else {
            document.querySelector('#login-btn').style.visibility = 'hidden';
            document.querySelector('#password_hint').style.visibility = 'visible';
        }
    }, [password]);

    const handleLoginClick = e => {
        e.preventDefault();
        const passwordInput = document.getElementById('password_input');
        const loginBtn = document.getElementById('login-btn');

        if (password.length === 0) return;

        loginBtn.style.opacity = '0.6';
        loginBtn.style.pointerEvents = 'none';
        passwordInput.disabled = true;

        setTimeout(() => {
            setPassWrong(true);
            loginBtn.style.opacity = '1';
            loginBtn.style.pointerEvents = 'auto';
            passwordInput.disabled = false;
            passwordInput.focus();
            setTimeout(() => {
                setPassWrong(false);
            }, 500);
        }, 1500);
    };

    return (
        <div className={styles.login_view}>
            <div className={styles.user_info_holder}>
                <img className={styles.avatar} src='assets/images/avatar.png' />
                <h1 className={styles.username}>{username}</h1>
            </div>
            <form className={styles.login_form} onSubmit={e => handleLoginClick(e)}>
                <div
                    id='login-input-holder'
                    className={`${styles.login_input_holder} ${
                        passWrong ? styles.vibrate : ''
                    }`}>
                    <div className={styles.password_input_holder}>
                        <input
                            id='password_input'
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                            placeholder=''
                        />
                        <p id='password_hint'>Enter Password</p>
                    </div>
                    <img
                        onClick={handleLoginClick}
                        id='login-btn'
                        src='assets/icons/arrow.svg'
                        alt='login'
                    />
                </div>
            </form>
        </div>
    );
}

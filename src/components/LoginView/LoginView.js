import React, { useEffect, useState } from 'react';
import styles from './LoginView.module.css';

export default function LoginView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.getElementById("password_input").focus();
        window.electron.receiveMessage('message-from-main', data => {
            setUsername(data[0]);
        });
        return () => {
            window.electron.receiveMessage('message-from-main', null);
        };
    }, []);

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPress);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);

    useEffect(() => {
        if (password.length > 0) {
            document.querySelector('#login-btn').style.visibility = 'visible';
        } else {
            document.querySelector('#login-btn').style.visibility = 'hidden';
        }
    }, [password]);

    const handleLoginClick = () => {
        const login_input_holder = document.querySelector('#login-input-holder');
        login_input_holder.classList.add('vibrate');
        setTimeout(() => {
            login_input_holder.classList.remove('vibrate');
        }, 200);
    };

    return (
        <div className={styles.login_view}>
            <div className={styles.user_info_holder}>
                <img className={styles.avatar} src='assets/images/avatar.png' />
                <h1 className={styles.username}>{username}</h1>
            </div>

            <div id='login-input-holder' className={styles.login_input_holder}>
                <input
                    id='password_input'
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    placeholder='Enter Password'
                />
                <img
                    onClick={handleLoginClick}
                    id='login-btn'
                    src='assets/icons/arrow.svg'
                    alt='login'
                />
            </div>
        </div>
    );
}
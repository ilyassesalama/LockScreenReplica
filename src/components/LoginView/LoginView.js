import React, { useEffect, useState } from 'react';
import styles from './LoginView.module.css';

export default function LoginView() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        window.electron.receiveMessage('message-from-main', data => {
            setUsername(data[0]);
        });

        return () => {
            window.electron.receiveMessage('message-from-main', null);
        };
    }, []);

    return (
        <div className={styles.login_view}>
            <div className={styles.user_info_holder}>
                <img className={styles.avatar} src='assets/images/avatar.png' />
                <h1 className={styles.username}>{username}</h1>
            </div>

            <div className={styles.login_input_holder}>
                <input
                    type='password'
                    placeholder='Enter Password'
                />
                <img src='assets/icons/arrow.svg' alt='cancel' />
            </div>
        </div>
    );
}

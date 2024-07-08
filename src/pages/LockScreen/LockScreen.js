import '../../App.css';
import React, { useEffect, useState } from 'react';
import styles from './LockScreen.module.css';
import Clock from '../../components/Clock/Clock';
import LoginView from '../../components/LoginView/LoginView';

export default function LockScreen() {
    const [location, setLocation] = useState('');

    useEffect(() => {
        window.electron.receiveMessage('message-from-main', data => {
            setLocation(data[1]);
        });

        return () => {
            window.electron.receiveMessage('message-from-main', null);
        };
    }, []);

    return (
        <div className={styles.root_view}>
            <img className={styles.wallpaper} src='assets/images/wallpaper.heic' />
            <div>
                <Clock />
                <img className={styles.wifikeyicon} src='assets/images/wifi_key.png' />
            </div>

            <div className={styles.login_view}>
                <LoginView />
            </div>

            <div className={styles.cancel_holder}>
                <div className={styles.cancel_button}>
                    <img src='assets/icons/close.png' alt='cancel' />
                </div>
                <p>Cancel</p>
            </div>
            <h1 className={styles.location}>mds_1.0- p - {location}</h1>
        </div>
    );
}

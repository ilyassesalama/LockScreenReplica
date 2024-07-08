import './App.css';
import React, { useEffect, useState } from 'react';
import NoSleep from 'nosleep.js';
import LockScreen from './pages/LockScreen/LockScreen';

const App = () => {
    const [isLocked, setIsLocked] = useState(false);
    const nosleep = typeof NoSleep !== 'undefined' ? new NoSleep() : null;
    const [lockTimer, setLockTimer] = useState(null);

    useEffect(() => {
        if (nosleep) {
            nosleep.enable();
        }
    }, []);

    useEffect(() => {
        const unlockScreen = () => {
            document.getElementById('password_input').focus();
            setIsLocked(false);
        };

        document.addEventListener('keypress', unlockScreen);
        document.addEventListener('click', unlockScreen);

        return () => {
            document.removeEventListener('keypress', unlockScreen);
            document.removeEventListener('click', unlockScreen);
        };
    }, []);

    useEffect(() => {
        if (isLocked) {
            document.body.classList.add('fadein');
            document.body.style.cursor = 'none';
            console.log('Locked');
        } else {
            document.body.classList.remove('fadein');
            document.body.style.cursor = 'default';
            document.getElementById('password_input').focus();
            console.log('Unlocked');
        }
    }, [isLocked]);

    useEffect(() => {
        if (!isLocked) {
            setLockTimer(
                setTimeout(() => {
                    setIsLocked(true);
                }, 30000)
            );
        } else {
            clearTimeout(lockTimer);
        }

        return () => {
            clearTimeout(lockTimer);
        };
    }, [isLocked]);

    return (
        <div className='App'>
            <LockScreen />
        </div>
    );
};

export default App;

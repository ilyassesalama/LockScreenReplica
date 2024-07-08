import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import NoSleep from 'nosleep.js';
import LockScreen from './pages/LockScreen/LockScreen';

const App = () => {
    const [lockTimer, setLockTimer] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const isLockedRef = useRef(isLocked);
    const nosleep = typeof NoSleep !== 'undefined' ? new NoSleep() : null;

    const unlockScreen = () => {
        document.getElementById('password_input').focus();
        if (isLockedRef.current) {
            setIsLocked(false);
        }
    };

    useEffect(() => {
        if (nosleep) {
            nosleep.enable();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keypress', unlockScreen);
        document.addEventListener('click', unlockScreen);

        return () => {
            document.removeEventListener('keypress', unlockScreen);
            document.removeEventListener('click', unlockScreen);
        };
    }, []);

    useEffect(() => {
        isLockedRef.current = isLocked;

        if (isLocked) {
            document.body.classList.add('fadein');
            document.body.style.cursor = 'none';
        } else {
            document.body.classList.remove('fadein');
            document.body.style.cursor = 'default';
            document.getElementById('password_input').focus();
        }
    }, [isLocked]);

    useEffect(() => {
        if (!isLocked) {
            setLockTimer(
                setTimeout(() => {
                    setIsLocked(true);
                }, 65000)
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
            <LockScreen isLocked={isLocked} setIsLocked={setIsLocked} />
        </div>
    );
};

export default App;

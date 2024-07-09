import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import NoSleep from 'nosleep.js';
import LockScreen from './pages/LockScreen/LockScreen';

const App = () => {
    const [isLocked, setIsLocked] = useState(false);
    const lockTimerRef = useRef(null);
    const isLockedRef = useRef(isLocked);
    const nosleep = typeof NoSleep !== 'undefined' ? new NoSleep() : null;

    useEffect(() => {
        if (nosleep) {
            nosleep.enable();
        }
    }, [nosleep]);

    const startLockTimer = () => {
        if (lockTimerRef.current) {
            clearTimeout(lockTimerRef.current);
        }
        lockTimerRef.current = setTimeout(() => {
            setIsLocked(true);
        }, 30000);
    };

    const resetTimerAndUnlockScreen = () => {
        if (isLockedRef.current) {
            setIsLocked(false);
        }
        if (document.activeElement.id !== 'password_input') {
            document.getElementById('password_input').focus();
        }
        startLockTimer();
    };

    useEffect(() => {
        const handleUserActivity = () => {
            resetTimerAndUnlockScreen();
        };

        document.addEventListener('keydown', handleUserActivity);
        document.addEventListener('click', handleUserActivity);
        document.addEventListener('mousemove', handleUserActivity);

        return () => {
            document.removeEventListener('keydown', handleUserActivity);
            document.removeEventListener('click', handleUserActivity);
            document.removeEventListener('mousemove', handleUserActivity);
        };
    }, []);

    useEffect(() => {
        isLockedRef.current = isLocked;

        if (isLocked) {
            document.body.classList.add('fadeout');
            document.body.style.cursor = 'none';
        } else {
            document.body.classList.remove('fadeout');
            document.body.style.cursor = 'default';
            document.getElementById('password_input').focus();
        }
    }, [isLocked]);

    useEffect(() => {
        if (!isLocked) {
            startLockTimer();
        } else {
            clearTimeout(lockTimerRef.current);
        }

        return () => {
            clearTimeout(lockTimerRef.current);
        };
    }, [isLocked]);

    return (
        <div className='App'>
            <LockScreen isLocked={isLocked} setIsLocked={setIsLocked} />
        </div>
    );
};

export default App;

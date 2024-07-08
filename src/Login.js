import React, { useState, useEffect } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 's') {
      document.body.className = 'fadeout';
    }
  };

  useEffect(() => {
    const handleKeyup = (e) => {
      if (e.target.value.length > 0) {
        document.querySelector('#login-arrow').style.visibility = 'visible';
        document.querySelector('#login-btn').style.visibility = 'visible';
      } else {
        document.querySelector('#login-arrow').style.visibility = 'hidden';
        document.querySelector('#login-btn').style.visibility = 'hidden';
      }
    };

    const passwordInput = document.querySelector('#password_input');
    passwordInput.addEventListener('keyup', handleKeyup);

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      passwordInput.removeEventListener('keyup', handleKeyup);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const handleClick = () => {
    const inputElements = document.querySelectorAll('.input-view');
    inputElements.forEach((element) => element.classList.add('vibrate'));
    setTimeout(() => {
      inputElements.forEach((element) => element.classList.remove('vibrate'));
    }, 200);
  };

  return (
    <>
      <input
        id="password_input"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input className="input-view" id="login-btn" type="button" value="" onClick={handleClick} />
      <img className="input-view" id="login-arrow" src="assets/icons/arrow.svg" alt="" onClick={handleClick} />
    </>
  );
};

export default Login;

import React from 'react';

const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = 'https://www.google.fr';
    };

    return (
        <button onClick={handleLogin}>Login</button>
    );
};

export default LoginButton;
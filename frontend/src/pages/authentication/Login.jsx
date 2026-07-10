import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase.js'; 
import api from '../../utils/axiosconfig.js'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            const response = await api.post('/api/auth/login', { token: idToken });
            console.log(response);

            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            setError('Google login failed. Please try again.');
            console.error(err);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        try {
            const response = await api.post('/api/auth/login', { email, password });
            console.log(response);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h2>Login</h2>
            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Login</button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>

            <p style={{ margin: '20px 0' }}>OR</p>

            {/* Google Login Button */}
            <button onClick={handleGoogleLogin} style={{ padding: '10px', cursor: 'pointer', background: '#4285F4', color: 'white', border: 'none' }}>
                Continue with Google
            </button>

            <p style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
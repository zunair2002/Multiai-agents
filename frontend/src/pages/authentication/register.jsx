import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosconfig.js'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            const response = await api.post('/api/auth/register', { name, email, password });
            console.log(response);
            if (response.status === 201) {
                // On successful registration, the backend logs the user in.
                // You might want to update user state here if you use a global context
                navigate('/'); // Redirect to homepage
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
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
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Register</button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
            <p style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
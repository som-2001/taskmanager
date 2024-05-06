// pages/login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {

    const router=useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);
            console.log(response);
            if(response.data.message ==='Login successful')
                {
                    console.log(response.data.user);
                    localStorage.setItem('userid',response.data.user._id);
                    setTimeout(()=>{
                     router.push('/dashboard');
                    },2000);
                }
            toast.success(response.data);
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed');
        }
    };

    return (
        <Container maxWidth="xs" style={{marginTop:"5%"}}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
                Don't have an account? <Link href="/register">Register</Link>
            </Typography>
        </Container>
    );
};

export default Login;

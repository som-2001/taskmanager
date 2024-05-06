// pages/register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Add = () => {

    const router=useRouter();

    const [formData, setFormData] = useState({
        name: '',
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
            const response = await axios.post('taskmanager-khaki-five.vercel.app/api/register', formData);
            setTimeout(()=>{
                if(response.data==='successfully registered')
                router.push('/login')
            },2000);
            toast.success(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed');
        }
    };

    return (
        <Container maxWidth="xs" style={{marginTop:"5%"}}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
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
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
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
                    Register
                </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
                Already have an account? <Link href="/login">Login</Link>
            </Typography>
        </Container>
    );
};

export default Add;

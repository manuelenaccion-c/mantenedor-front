
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import { TextField, Button, FormControl, FormHelperText, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';


const FormLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email es requerido';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email no tiene el formato válido';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password es requerido';
            valid = false;
        }
        if (formData.password.length <= 3) {
            newErrors.password = 'El password no puede tener menos de 4 valores';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(import.meta.env.VITE_URL_API + '/user/login', formData);
                if (response.status === 201) {
                    // Login exitoso
                    login(response.data.access_token);
                    toast.success(response.data.message);
                    navigate('/dashboard');
                } else if (response.status === 401) {
                    // Error en las credenciales
                    toast.error('Error en credenciales. Por favor, verifica tu usuario y contraseña.');
                } else {
                    // Otros posibles errores
                    toast.error('Error en el servidor. Intenta nuevamente.');
                }
            } catch (error) {
                // Manejo de errores, como problemas de conexión
                if (error.response && error.response.status === 401) {
                    toast.error('Error en credenciales. Por favor, verifica tu usuario y contraseña.');
                } else {
                    toast.error('Error durante el login. Por favor, intenta nuevamente.');
                }
                console.error('Error durante el login:', error);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 3, padding: 3, backgroundColor: 'white', border: '1px solid #d3d1d1', borderRadius: '5px' }}>
            <Typography variant="h4" gutterBottom>Login Form</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal" error={Boolean(errors.email)}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth margin="normal" error={Boolean(errors.password)}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default FormLogin;
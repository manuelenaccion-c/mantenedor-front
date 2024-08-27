
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, FormControl, FormHelperText, Box, Typography, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const FormLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
        setLoading(true)
        if (validateForm()) {
            try {
                const response = await axios.post(import.meta.env.VITE_URL_API + '/user/login', formData);
                if (response.status === 201) {
                    // Login exitoso
                    toast.success("Login exitoso, bienvenido");
                    login(response.data.access_token);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, "1000");
                    ;
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
            finally {
                setLoading(false)
            }
        }
        setLoading(false)
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
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                </FormControl>
                <Button type='submit' variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
                </Button>
            </form>
        </Box>
    );
};

export default FormLogin;
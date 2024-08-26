
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Navigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ProtectedRoutes = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    async function validateAuth() {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(import.meta.env.VITE_URL_API + '/user/validate-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAuth(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Sesión expirada o no autorizada, redirigiendo al login');
                localStorage.clear();
                setAuth(false);
                navigate('/');
            }
            setAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        validateAuth()
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        auth ? <Outlet /> : navigate('/')
    )
}

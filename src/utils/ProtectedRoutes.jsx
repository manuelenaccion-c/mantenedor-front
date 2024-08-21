
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import { Navigate } from 'react-router'
import axios from 'axios'



export const ProtectedRoutes = () => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    async function validateAuth() {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get('http://localhost:3001/user/validate-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAuth(response.data);
        } catch (error) {
            console.error(error);
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

        auth ? <Outlet /> : <Navigate to='/' />
    )
}

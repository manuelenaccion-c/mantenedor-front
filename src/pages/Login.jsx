

import React, { useEffect } from 'react'
import FormLogin from '../components/FormLogin'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'


export const Login = () => {
    const navigate = useNavigate()
    const { user } = useAuth()


    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className='container'>
            <FormLogin />
        </div>
    );
};


import { Container, useMediaQuery } from '@mui/material'
import React from 'react'

export const Dashboard = () => {

    const match = useMediaQuery('(min-width:600px)')

    const sytles = {
        height: '40%',
        width: '90%',
    }


    return (
        <>
            <img src="https://enaccion-c.cl/images/1.jpg" alt="Descripción de la imagen" style={sytles} />
        </>
    )
}


import React from 'react'
import TableClients from '../components/TableClients'
import { Container, Paper } from '@mui/material'

export const Clients = () => {

    return (
        <Container sx={{ backgroundColor: '#e9e9e9', marginBottom: '20px', marginTop: '20px' }} component={Paper} >
            <TableClients />
        </Container>
    )
}

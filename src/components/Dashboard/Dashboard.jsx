


import React from 'react'
import CountClients from './CountsClients'
import { Container, Grid } from '@mui/material'
import GenderClients from './GenderClients';
import ListLastCLient from './ListLastClients';
import InactiveClients from './InactiveClient';

const data = {
    statistics_clients: [
        {
            total: 100,
            title: "Clientes totales"
        },
        {
            total: 80,
            title: "Clientes activos"
        },
        {
            total: 20,
            title: "Clientes Inactivos"
        },
    ],
    gender_distribution: [
        { gender: "Masculino", count: 40 },
        { gender: "Femenino", count: 60 },
    ],
    client_month: [
        { month: "2024-01-01T00:00:00.000Z", count: 10 },
        { month: "2024-02-01T00:00:00.000Z", count: 20 },
        { month: "2024-03-01T00:00:00.000Z", count: 70 }
    ],
    recent_clients: [
        {
            id: 1,
            name: "John",
            last_name: "Doe",
            rut: "12345678-9",
            email: "john.doe@example.com",
            gender: "Masculino",
            status: true,
            created_at: "2024-08-20T15:30:00.000Z"
        },
        {
            id: 2,
            name: "Jane",
            last_name: "Smith",
            rut: "98765432-1",
            email: "jane.smith@example.com",
            gender: "Femenino",
            status: true,
            created_at: "2024-08-21T10:15:00.000Z"
        },
        {
            id: 3,
            name: "Jane",
            last_name: "Smith",
            rut: "98765432-1",
            email: "jane.smith@example.com",
            gender: "Femenino",
            status: true,
            created_at: "2024-08-21T10:15:00.000Z"
        }
    ],
    inactive_clients_data: [
        {
            id: 3,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        },
        {
            id: 2,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        },
        {
            id: 4,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        },
        {
            id: 5,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        },
        {
            id: 6,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        },
        {
            id: 7,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        },
        {
            id: 8,
            name: "Alice",
            last_name: "Johnson",
            rut: "11223344-5",
            email: "alice.johnson@example.com",
            gender: "Femenino",
            status: false,
            created_at: "2023-05-10T08:00:00.000Z"
        }
    ]
};

export const Dashboard = () => {
    return (
        <Container sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2}>
                {
                    data.statistics_clients.map((count, index) => (
                        <Grid item md={3} xs={12} key={index}>
                            <CountClients title={count.title} countClients={count.total} />
                        </Grid>
                    ))
                }


                <Grid item md={3} xs={12}><GenderClients gender_distribution={data.gender_distribution} /></Grid>
            </Grid>

            <Grid container sx={{ marginTop: 5 }}>
                <Grid item md={8} xs={12}> tabla</Grid>
                <Grid item md={4} xs={12}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item md={4} xs={12}><ListLastCLient recent_clients={data.recent_clients} /></Grid>
                        <Grid item md={4} xs={12}><InactiveClients inactive_clients_data={data.inactive_clients_data} /></Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>



    )
}

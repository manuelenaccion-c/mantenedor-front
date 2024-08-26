


import React, { useEffect, useState } from 'react'
import CountClients from './CountsClients'
import { Container, Grid } from '@mui/material'
import GenderClients from './GenderClients';
import ListLastClient from './ListLastClients';
import InactiveClients from './InactiveClient';
import ClientsChart from './ClientsChart';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const Dashboard = () => {
	const navigate = useNavigate()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	const getStatisticCLients = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			console.error('Token no encontrado en el localStorage');
			setLoading(false);
			return;
		}
		setLoading(false)
		try {
			const response = await axios.get(import.meta.env.VITE_URL_API + '/client/overall', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			setData(response.data);
		} catch (error) {
			console.error('Error al obtener los clientes:', error);

		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getStatisticCLients()
	}, [])

	if (data.length === 0) {
		return "cargando..."
	}

	return (
		<Container>
			<Grid container spacing={2}>
				{data.statistics_clients.map((count, index) => (
					<Grid item md={3} xs={12} key={index}>
						<CountClients title={count.title} countClients={count.total} />
					</Grid>
				))}
				<Grid item md={3} xs={12}>
					<GenderClients gender_distribution={data.gender_distribution} />
				</Grid>
			</Grid>
			<Grid container sx={{ marginTop: 2 }}>
				<Grid item md={6} xs={12}>
					<ClientsChart client_month={data.client_month} />
				</Grid>
				<Grid item md={6} xs={12}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<ListLastClient recent_clients={data.recent_clients} />
						</Grid>
						<Grid item md={6} xs={6}>
							<InactiveClients inactive_clients_data={data.inactive_clients_data} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

export default function InactiveClients({ inactive_clients_data }) {
    const matches = useMediaQuery('(min-width:900px)')

    return (
        <Card sx={{ maxWidth: matches ? '100%' : 345, }}>
            <CardHeader
                title="Clientes inactivos"
                // subheader={date}
                sx={{ borderBottom: "1px solid black" }}
            />
            <CardContent sx={{
                padding: 0, '&:last-child': {
                    borderBottom: "none",
                    paddingBottom: 0,
                },
                maxHeight: matches ? 153 : 205,
                overflow: 'auto'
            }}>
                {inactive_clients_data.length > 0 ? (inactive_clients_data.map((client, id) => (
                    <Typography key={id} sx={{ borderBottom: "1px solid #cacaca", padding: 2, }} variant="body2" color="text.secondary">
                        {client.name} {client.last_name} {client.email}
                    </Typography>
                ))) :
                    <Typography sx={{ borderBottom: "1px solid #cacaca", padding: 2, }} variant="body2" color="text.secondary">
                        No hay clientes inactivos
                    </Typography>
                }
            </CardContent>
        </Card>
    );
}
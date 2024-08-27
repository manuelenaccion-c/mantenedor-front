import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, useMediaQuery } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

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
                    <Typography key={id} sx={{ borderBottom: "1px solid #cacaca", padding: 2, display: 'flex', justifyContent: 'space-between' }} variant="body2" color="text.secondary">
                        {client.name} {client.last_name} <Button href={`mailto:${client.email}`} sx={{ padding: 0 }}><EmailIcon sx={{ fontSize: '1rem', color: '#282A3A' }} /> </Button>
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
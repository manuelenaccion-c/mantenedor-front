import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

export default function InactiveClients({ inactive_clients_data }) {
    const matches = useMediaQuery('(min-width:900px)')

    console.log(inactive_clients_data);


    return (
        <Card sx={{ maxWidth: matches ? '100%' : 345, }}>
            <CardHeader
                title="Ultimos Clientes Registrados"
                subheader="September 14, 2016"
                sx={{ borderBottom: "1px solid black" }}
            />
            <CardContent sx={{
                padding: 0, '&:last-child': {
                    borderBottom: "none",
                    paddingBottom: 0,
                },
                maxHeight: 150,
                overflow: 'auto'
            }}>
                {inactive_clients_data.map((client, id) => (
                    <Typography key={id} sx={{ borderBottom: "1px solid #cacaca", padding: 2, }} variant="body2" color="text.secondary">
                        {client.name} {client.last_name}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
}
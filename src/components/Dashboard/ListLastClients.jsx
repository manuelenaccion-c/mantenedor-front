import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { newDate } from '../../utils/utils';


export default function ListLastClient({ recent_clients }) {
    const matches = useMediaQuery('(min-width:900px)')

    return (
        <Card sx={{ maxWidth: matches ? '100%' : 345, }}>
            <CardHeader
                title="Ultimos Clientes"
                // subheader="September 14, 2016"
                sx={{ borderBottom: "1px solid black" }}
            />
            <CardContent sx={{
                padding: 0, '&:last-child': {
                    borderBottom: "none",
                    paddingBottom: 0,
                    maxHeight: matches ? 153 : 205,
                }
            }}>
                {recent_clients.length > 0 ?
                    recent_clients.map((client, id) => (
                        <Typography key={id} sx={{ borderBottom: "1px solid #cacaca", padding: 2, display: 'flex', justifyContent: 'space-between' }} variant="body2" color="text.secondary">
                            {client.name} {client.last_name}  <span>{client.created_at}</span>
                        </Typography>
                    )) :
                    <Typography sx={{ borderBottom: "1px solid #cacaca", padding: 2, }} variant="body2" color="text.secondary">
                        No hay nuevos clientes
                    </Typography>
                }
            </CardContent>
        </Card>
    );
}
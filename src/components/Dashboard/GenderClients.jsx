
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function GenderClients({ gender_distribution }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <PersonIcon />
                }
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        {expanded ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </ExpandMore>
                }
                title="Genero"
            />

            <CardContent>
                {expanded ? (
                    <Box sx={{ display: 'flex', gap: 2 }}> {/* gap controla el espacio entre los elementos */}
                        {gender_distribution.map(({ gender, count }, index) => (
                            <Typography key={index} variant="body2" color="text.secondary">
                                {gender}: {count}
                            </Typography>
                        ))}
                    </Box>
                ) :
                    <Typography variant="body2" color="text.secondary">
                        xxxx
                    </Typography>}
            </CardContent>
        </Card>
    );
}

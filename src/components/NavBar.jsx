import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function ButtonAppBar() {



    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const settings = ['Clientes', 'Logout'];

    const handleLogout = () => {
        logout(); // Esto limpia el user en el contexto
        localStorage.removeItem('authToken');
        navigate('/') // Limpiar el token del localStorage
        handleCloseUserMenu(); // Cerrar el menú después del logout
    };

    const handleClients = () => {
        navigate('/dashboard/clients'); // Navegar a la ruta de Clientes
        handleCloseUserMenu(); // Cerrar el menú después de la navegación
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'space-between' }}>
            <AppBar position="static" sx={{ backgroundColor: '#282A3A' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MenuIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={setting === 'Logout' ? handleLogout : setting === 'Clientes' ? handleClients : handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <BusinessIcon />
                </Toolbar>
            </AppBar>
        </Box >
    );
}
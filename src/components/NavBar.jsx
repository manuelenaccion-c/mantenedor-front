import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';



export default function ButtonAppBar() {
    const location = useLocation();

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
    const settings = ['Dashboard', 'Clientes', 'Logout'];

    const handleLogout = () => {
        logout();
        localStorage.removeItem('authToken');
        navigate('/')
        handleCloseUserMenu();
    };

    const handleClients = () => {
        navigate('/dashboard/clients');
        handleCloseUserMenu();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'space-between' }}>
            <AppBar position="static" sx={{ backgroundColor: '#282A3A' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flexGrow: 0 }}>
                        {user && (<Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MenuIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>)}
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
                            {/* {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={setting === 'Logout' ? handleLogout : setting === 'Clientes' ? handleClients : handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                            {location.pathname !== '/dashboard' &&
                                <MenuItem>
                                    <Link to={'/dashboard'} onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">Dashboard</Typography>
                                    </Link>
                                </MenuItem>}
                            <MenuItem>
                                <Link to={'/dashboard/clients'} onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                                    <Typography textAlign="center">Clientes</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Link to={user && '/dashboard'} style={{ cursor: user ? 'pointer' : 'auto' }}>
                        <BusinessIcon sx={{ color: 'white' }} />
                    </Link>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
import React from 'react';
import { Modal, Box, Typography, Button, useMediaQuery, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

export function DeleteCustomer({ openModalDelete, closeDeleteModal, customerInfo }) {
    const match = useMediaQuery('(min-width:600px)')
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 20,
        borderRadius: '5px',
        p: 2,
        width: match ? '500px' : '85%',
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Token no encontrado en el localStorage');
            return;
        }

        try {
            const response = await axios.delete(import.meta.env.VITE_URL_API + `/client/${customerInfo.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Cliente eliminado exitosamente');
            closeDeleteModal();
        } catch (error) {
            toast.error('Error al eliminar el cliente');
            console.error('Error al eliminar cliente:', error);
        }
    };

    if (!customerInfo) return null;

    return (
        <Modal
            open={openModalDelete}
            onClose={closeDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Eliminar cliente
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    ¿Estás seguro de que deseas eliminar al cliente <b> {customerInfo.name}  {customerInfo.last_name} </b>?. Esta acción no se puede revertir
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6} md={6}>
                        <Button onClick={handleDelete} color="error" variant="contained" fullWidth>
                            Eliminar
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button onClick={closeDeleteModal} variant="contained" fullWidth >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
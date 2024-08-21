import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

export function DeleteCustomer({ openModalDelete, closeDeleteModal, customerInfo }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 20,
        p: 4,
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Token no encontrado en el localStorage');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:3001/client/${customerInfo.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Cliente eliminado exitosamente');
            closeDeleteModal(); // Cierra el modal si la solicitud es exitosa
            // Aquí podrías también actualizar la lista de clientes
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
                    ¿Estás seguro de que deseas eliminar al cliente {customerInfo.name} {customerInfo.last_name}?, esta acción no se puede revertir
                </Typography>
                <Button onClick={handleDelete} color="error" variant="contained" sx={{ mt: 2 }}>
                    Eliminar
                </Button>
                <Button onClick={closeDeleteModal} variant="contained" sx={{ mt: 2 }}>
                    Cancelar
                </Button>
            </Box>
        </Modal>
    );
}
import React from 'react';
import axios from 'axios';
import useCustomerForm from '../../hooks/useCustomerForm';
import { Modal, Box, Typography, Button, Container, FormControl, Grid, TextField, Select, MenuItem, useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';

export function CreateCustomer({ openModalCreate, closeCreateModal }) {
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

    const { formData, errors, validateForm, handleChange, clearFormData } = useCustomerForm({
        name: '',
        last_name: '',
        email: '',
        rut: '',
        gender: '',
    });

    React.useEffect(() => {
        if (!openModalCreate) {
            clearFormData();
        }
    }, [openModalCreate]);


    const onSubmitEditClient = async () => {
        const token = localStorage.getItem('authToken');
        if (validateForm()) {
            try {
                const response = await axios.post(import.meta.env.VITE_URL_API + '/client', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success('Cliente creado existosamente')
                console.log('Cliente actualizado:', response.data);
                closeCreateModal();
            } catch (error) {
                toast.error(error.response.data.message)
                console.error('Error al actualizar cliente:', error);

            }
        }
    };

    return (
        <Modal
            open={openModalCreate}
            onClose={closeCreateModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component='form' sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h4" sx={{ paddingBottom: '30px' }}>
                    Crear Cliente
                </Typography>
                <FormControl>
                    <Grid container sx={{}} spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                id="last_name"
                                name="last_name"
                                label="Apellido"
                                value={formData.last_name}
                                onChange={handleChange}
                                error={!!errors.last_name}
                                helperText={errors.last_name}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                id="rut"
                                name="rut"
                                label="RUT"
                                value={formData.rut}
                                onChange={handleChange}
                                error={!!errors.rut}
                                helperText={errors.rut}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                displayEmpty
                                error={!!errors.gender}
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Género
                                </MenuItem>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Femenino">Femenino</MenuItem>
                            </Select>
                            {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Button variant="contained" color="primary" onClick={onSubmitEditClient} fullWidth>Crear</Button>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Button variant="contained" color="error" onClick={() => { closeCreateModal(), clearFormData() }} fullWidth>Cerrar</Button>
                        </Grid>
                    </Grid>
                </FormControl>

            </Box>
        </Modal>

    );
}
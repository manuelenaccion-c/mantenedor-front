import React from 'react';
import axios from 'axios';
import useCustomerForm from '../../hooks/useCustomerForm';
import { Modal, Box, Typography, Button, Container, FormControl, Grid, TextField, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

export function CreateCustomer({ openModalCreate, closeCreateModal }) {
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
                const response = await axios.post(`http://localhost:3001/client`, formData, {
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Crear Cliente
                </Typography>
                <Container>
                    <FormControl fullWidth>
                        <Grid container sx={{ padding: '20px' }} spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="last_name"
                                    name="last_name"
                                    label="Apellido"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="rut"
                                    name="rut"
                                    label="RUT"
                                    value={formData.rut}
                                    onChange={handleChange}
                                    error={!!errors.rut}
                                    helperText={errors.rut}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    displayEmpty
                                    error={!!errors.gender}
                                >
                                    <MenuItem value="" disabled>
                                        Género
                                    </MenuItem>
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                    <MenuItem value="Femenino">Femenino</MenuItem>
                                </Select>
                                {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                            </Grid>

                        </Grid>
                        <Button variant="contained" color="primary" onClick={onSubmitEditClient}>Crear</Button>
                        <Button variant="contained" color="error" onClick={() => { closeCreateModal(), clearFormData() }}>Cerrar</Button>
                    </FormControl>
                </Container>
            </Box>
        </Modal>

    );
}
import * as React from 'react';
import axios from 'axios';
import useCustomerForm from '../../hooks/useCustomerForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Container, FormControl, FormControlLabel, Grid, MenuItem, Select, Switch, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export function EditCustomer({ openEditoModal, closeEditoModal, customerInfo }) {
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

    const { formData, setFormData, errors, validateForm, handleChange } = useCustomerForm({
        name: customerInfo?.name || '',
        last_name: customerInfo?.last_name || '',
        email: customerInfo?.email || '',
        rut: customerInfo?.rut || '',
        gender: '',
        status: customerInfo?.status || false
    });

    React.useEffect(() => {
        if (customerInfo) {
            setFormData({
                name: customerInfo.name,
                last_name: customerInfo.last_name,
                email: customerInfo.email,
                rut: customerInfo.rut,
                gender: customerInfo.gender,
                status: customerInfo.status
            });
        }
    }, [customerInfo]);

    const onSubmitEditClient = async () => {
        const token = localStorage.getItem('authToken');
        if (validateForm()) {
            try {
                const response = await axios.put(`http://localhost:3001/client/${customerInfo.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success('cliente Actualizado')
                console.log('Cliente actualizado:', response.data);
                closeEditoModal();
            } catch (error) {
                toast.error('Error al actualiar')
                console.error('Error al actualizar cliente:', error);

            }
        }
    };

    if (!customerInfo) return null;

    return (
        <Modal
            open={openEditoModal}
            onClose={closeEditoModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component='form' sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Cliente
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
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.status}
                                            onChange={handleChange}
                                            name="status"
                                            color="primary"
                                        />
                                    }
                                    label={formData.status ? 'Activo' : 'Inactivo'}
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={onSubmitEditClient}>Actualizar</Button>
                        <Button variant="contained" color="error" onClick={closeEditoModal}>Cerrar</Button>
                    </FormControl>
                </Container>
            </Box>
        </Modal>
    );
}

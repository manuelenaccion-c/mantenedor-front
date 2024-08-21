

import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'

export const SearchBar = ({ queryParams, setQueryParams, setField, gender, selectGender, statusClient, selectStatus }) => {
    return (
        <Grid container sx={{ marginTop: '20px' }} spacing={2}>
            <Grid item md={6} xs={12} >
                <TextField
                    label="Filtrar Clientes"
                    variant="outlined"
                    value={queryParams}
                    onChange={(e) => { setQueryParams(e.target.value); setField('') }}
                    fullWidth
                    sx={{ marginBottom: 2, backgroundColor: 'white' }}
                />
            </Grid>
            <Grid item md={3} xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Género</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        onChange={selectGender}
                        label="Género"
                        sx={{ backgroundColor: 'white' }}
                    >
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="">Limpiar</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={3} xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusClient}
                        onChange={selectStatus}
                        label="Estado"
                        sx={{ backgroundColor: 'white' }}
                    >
                        <MenuItem value="true">Activo</MenuItem>
                        <MenuItem value="false">Inactivo</MenuItem>
                        <MenuItem value="">Limpiar</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

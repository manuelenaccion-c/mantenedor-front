

import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'

export const SearchBar = ({ queryParams, setQueryParams, setField, gender, selectGender, statusClient, selectStatus }) => {
    return (
        <Grid container>
            <Grid item md={6} xs={12}>
                <TextField
                    label="Filtrar Clientes"
                    variant="outlined"
                    value={queryParams}
                    onChange={(e) => { setQueryParams(e.target.value); setField('') }}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
            </Grid>
            <Grid item md={3}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Género</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        onChange={selectGender}
                        label="Género"
                    >
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="">Limpiar</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={3}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusClient}
                        onChange={selectStatus}
                        label="Estado"
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

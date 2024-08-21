



import React, { useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaginationGrid from './PaginationGrid';
import { Height } from '@mui/icons-material';

export const ClientsGrid = ({ buttonOrderName, field, setField, order, clients, openEditoModal, openModalDelete }) => {

    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // total pages
    const totalPages = Math.ceil(clients.length / itemsPerPage);

    //  clientes a mostrar en la página actual
    const paginatedClients = clients.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    return (
        <>
            <TableContainer sx={{ padding: 0, marginBottom: '20px', marginTop: '20px' }} component={Paper} >
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                Nombre
                                <Button onClick={() => { buttonOrderName(); setField("name") }}>
                                    {field === 'name' ? (order === 'ASC' ? '↑' : '↓') : '↑'}
                                </Button>
                            </TableCell>
                            <TableCell align="center">Apellido
                                <Button onClick={() => { buttonOrderName(); setField("last_name") }}>
                                    {field === 'last_name' ? (order === 'ASC' ? '↑' : '↓') : '↑'}
                                </Button>
                            </TableCell>
                            <TableCell align="center">RUT</TableCell>
                            <TableCell align="center">Correo</TableCell>
                            <TableCell align="center">Sexo</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Fecha de Creación
                                <Button onClick={() => { buttonOrderName(); setField("created_at") }}>
                                    {field === 'created_at' ? (order === 'ASC' ? '↑' : '↓') : '↑'}
                                </Button>
                            </TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedClients.length > 0 ? (
                            paginatedClients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell component="th" scope="row">
                                        {client.name}
                                    </TableCell>
                                    <TableCell align="left">{client.last_name}</TableCell>
                                    <TableCell align="left">{client.rut}</TableCell>
                                    <TableCell align="left">{client.email}</TableCell>
                                    <TableCell align="left">{client.gender}</TableCell>
                                    <TableCell align="right">
                                        <Brightness1Icon sx={{ color: client.status ? 'green' : 'red' }} />
                                    </TableCell>
                                    <TableCell align="left">{client.created_at}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => openEditoModal(client)}>
                                            <EditIcon />
                                        </Button>
                                        <Button>
                                            <DeleteIcon onClick={() => openModalDelete(client)} sx={{ color: 'red' }} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No hay clientes registrados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationGrid count={totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
        </>
    )
}

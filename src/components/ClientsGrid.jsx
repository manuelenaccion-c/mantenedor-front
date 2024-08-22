



import React, { useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaginationGrid from './PaginationGrid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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


    const newDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <>
            <TableContainer sx={{ padding: 0, marginBottom: '20px', marginTop: '20px' }} component={Paper} >
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="rigth" style={{ minWidth: 120 }}>
                                Nombre
                                <Button Button onClick={() => { buttonOrderName(); setField("name") }}>
                                    {field === 'name' ? (order === 'ASC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />) : <ArrowDropUpIcon />}
                                </Button>
                            </TableCell>
                            <TableCell align="center" style={{ minWidth: 120 }}>
                                Apellido
                                <Button onClick={() => { buttonOrderName(); setField("last_name") }}>
                                    {field === 'last_name' ? (order === 'ASC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />) : <ArrowDropUpIcon />}
                                </Button>
                            </TableCell>
                            <TableCell align="center">RUT</TableCell>
                            <TableCell align="center">Correo</TableCell>
                            <TableCell align="center">Sexo</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center" style={{ minWidth: 120 }}>Creado
                                <Button onClick={() => { buttonOrderName(); setField("created_at") }}>
                                    {field === 'created_at' ? (order === 'ASC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />) : <ArrowDropUpIcon />}
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
                                    <TableCell align="left">{newDate(client.created_at)}</TableCell>
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
            </TableContainer >
            <PaginationGrid count={totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
        </>
    )
}

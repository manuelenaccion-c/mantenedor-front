import * as React from 'react';
import axios from 'axios'
import { Button, Container } from '@mui/material';
import { EditCustomer } from './modals/EditCustomer';
import { DeleteCustomer } from './modals/DeleteCustomer';
import { CreateCustomer } from './modals/CreateCustomer';
import { SearchBar } from './SearchBar';
import { ClientsGrid } from './ClientsGrid';

export default function TableClients() {
    const [clients, setClients] = React.useState([])
    const [loading, setLoading] = React.useState(true);
    const [customerInfo, setCustomerInfo] = React.useState(null)
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [queryParams, setQueryParams] = React.useState('')
    const [order, setOrder] = React.useState('ASC')
    const [field, setField] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [statusClient, setStatusClient] = React.useState("")

    const buttonOrderName = () => {
        setOrder((prevOrder) => prevOrder === 'ASC' ? 'DESC' : 'ASC')
    }

    const selectStatus = (e) => {
        e.prenventDefault
        setStatusClient(e.target.value)
        // setQueryParams('');
    }

    const selectGender = (e) => {
        e.prenventDefault
        setGender(e.target.value)
        // setQueryParams('');
    }

    const openEditoModal = (customer) => { setCustomerInfo(customer); setOpenEditModal(true) };
    const closeEditoModal = () => { setOpenEditModal(false); setCustomerInfo(null) };

    const openModalDelete = (customer) => { setCustomerInfo(customer); setOpenDeleteModal(true) };
    const closeDeleteModal = () => { setOpenDeleteModal(false); setCustomerInfo(null) };

    const openModalCreate = () => { setOpenCreateModal(true) };
    const closeCreateModal = () => { setOpenCreateModal(false) }

    async function getClients() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Token no encontrado en el localStorage');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/client`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClients(response.data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);

        } finally {
            setLoading(false);
        }
    }

    async function clientsFilters() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Token no encontrado en el localStorage');
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`
                http://localhost:3001/client?filter=${queryParams}&sortBy=${field}&order=${order}&gender=${gender}&status=${statusClient}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setClients(response.data);
        } catch (error) {
            if (error.response.status === 404)
                setClients([])
            console.error('Error al obtener los clientes:', error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (!openCreateModal && !openEditModal && !openDeleteModal) {
            getClients()
        }
    }, [openCreateModal, openEditModal, openDeleteModal])

    React.useEffect(() => {
        if (queryParams !== "" || field !== '' || gender !== '' || statusClient !== "") {
            clientsFilters();
        } else {
            getClients();
        }
    }, [queryParams, field, order, gender, statusClient]);


    return (
        <Container sx={{ padding: 2 }}>
            <SearchBar queryParams={queryParams} setQueryParams={setQueryParams} setField={setField} gender={gender} selectGender={selectGender} statusClient={statusClient} selectStatus={selectStatus} />
            <Button color='primary' variant="contained" onClick={() => openModalCreate()}>crear Cliente</Button>
            <ClientsGrid buttonOrderName={buttonOrderName} field={field} order={order} setOrder={setOrder} setField={setField} clients={clients} openEditoModal={openEditoModal} openModalDelete={openModalDelete} />
            <EditCustomer openEditoModal={openEditModal} closeEditoModal={closeEditoModal} customerInfo={customerInfo} />
            <DeleteCustomer openModalDelete={openDeleteModal} closeDeleteModal={closeDeleteModal} customerInfo={customerInfo} />
            <CreateCustomer openModalCreate={openCreateModal} closeCreateModal={closeCreateModal} />
        </Container >
    );
}

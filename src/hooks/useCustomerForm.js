import { useState, useEffect } from 'react';
import { validateRut } from '@fdograph/rut-utilities';

const useCustomerForm = (initialData = {}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const clearFormData = () => {
        setFormData(initialData);
        setErrors({})
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'El nombre es requerido';
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'El Nombre solo puede contener letras';
            valid = false;
        }

        if (!formData.last_name) {
            newErrors.last_name = 'El apellido es requerido';
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.last_name)) {
            newErrors.last_name = 'El apellido solo puede contener letras';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email es requerido';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email con formato invalido';
            valid = false;
        }

        if (!formData.gender) {
            newErrors.gender = 'Género es requerido';
            valid = false;
        }

        const rutPattern = /^[0-9]{7,8}-[0-9Kk]$/;
        if (!rutPattern.test(formData.rut)) {
            newErrors.rut = 'Rut inválido. Debe tener el formato 12345678-9';
            valid = false;
        } else if (!validateRut(formData.rut)) {
            newErrors.rut = 'Rut inválido y/o dv erróneo';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return {
        formData,
        setFormData,
        errors,
        validateForm,
        handleChange,
        clearFormData
    };
};

export default useCustomerForm;
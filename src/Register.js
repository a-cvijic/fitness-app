import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        membership: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        const { name, value } = e.target;
        const newValue = name === 'membership' && value ? parseInt(value, 10) : value;
        setFormData({ ...formData, [name]: newValue });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://studentdocker.informatika.uni-mb.si:11096/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    surname: formData.surname,
                    gender: formData.gender,
                    membership: formData.membership,
                    email: formData.email,
                    password: formData.password
                })
            });
            if (!response.ok) {
                throw new Error('Network request failed');
            }
            const result = await response.json();
            toast.success(result.message || "Registration successful!");
        } catch (error) {
            toast.error("Error during registration: " + error.message);
            console.error("Error during registration", error);
        }
    }

    return (
        <>
         <ToastContainer />
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="surname">Surname</label>
            <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
            />

            <label htmlFor="gender">Gender</label>
            <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
            >
                <option value="">Choose gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Don't want to identify</option>
            </select>

            <label htmlFor="membership">Membership</label>
            <select
                type="number"
                id="membership"
                name="membership"
                value={formData.membership}
                onChange={handleChange}
                required

                >
                <option value='1'>Zdravje in noč</option>
                <option value="2">UniFit</option>
                <option value="3">Fit Gym</option>
                <option value="4">Boom Gym</option>
                <option value='5'>Slim fit</option>
                <option value="6">Gym Bro</option>
                <option value="7">Yoga Center</option>
                <option value="8">Žogica</option>
                <option value="9">Carpe Diem</option>
                <option value="10">Sunny Side of London</option>
            </select>

            <label htmlFor="email">E-mail</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit">Registration</button>
        </form>
    </>
    );
}
export default RegistrationForm;

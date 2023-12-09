import React, { useState } from 'react';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        membership: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/fitness_users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    date_of_birth: formData.dateOfBirth,
                    gender: formData.gender,
                    membership: formData.membership,
                    email: formData.email,
                    password: formData.password
                })
            });
            if (!response.ok) {
                throw new Error('Newtork is not working');
            }
            console.log("Success!");
        } catch (error) {
            console.error("Error during registration", error);
        }
    }

    return (
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


            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
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
                <option value="">Choose gym</option>
                <option value='1'>Zdravje in noč</option>
                <option value="2">UniFit</option>
                <option value="3">Fit Gym</option>
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
    );
}

export default RegistrationForm;

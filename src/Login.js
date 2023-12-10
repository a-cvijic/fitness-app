import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const response = await fetch('http://studentdocker.informatika.uni-mb.si:11096/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        console.log(response);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            toast.success('Login successful');
            console.log(data);
        } else {
            toast.error('Login failed. Invalid email or password.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer position="top-center" autoClose={5000} />
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
//import Dashboard from './components/Dashboard';

function Register() {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //const [token, setToken] = useState(localStorage.getItem('token'));

    const handleRegister = () => {
        axios
            .post('/register', { employeeName, employeeID, password })
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                setMessage(error.response.data.error);
            });
    };

    

    return (
        <div className="App" >
        <div className='container'>
            <h1>Register</h1>
            <div>
                <input
                    type="text"
                    placeholder="Employee Name"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleRegister}>Register</button>
            </div>
            <div>{message}</div>
            </div>
        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
//import Dashboard from './components/Dashboard';

function Login() {
    const [employeeID, setEmployeeID] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //const [token, setToken] = useState(localStorage.getItem('token'));

    

    const handleLogin = () => {
        axios
            .post('/login', { employeeID, password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('employeeName', response.data.userName);
                
                setMessage('Login successful, Welcome ' + response.data.userName);
                //window.location.href = '/dashboard'
                setTimeout(() => window.location.href = '/dashboard', 2000)
                
                
            })
            .catch((error) => {
                setMessage(error.response.data.error);
            });
    };

    return (
        <div className="App" >
        <div className='container'>
            <h1>Login</h1>
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
                <button onClick={handleLogin}>Login</button>
            </div>
            <div>{message}</div>
            </div>
        </div>
    );
}

export default Login;

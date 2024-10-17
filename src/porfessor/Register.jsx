import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import './professor.css';

const Register = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // handleRegister
    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/auth/register-faculty', { name, email, password });

            if (res.data.success) {
                // toast("Registered successfully!");
                navigate('/login-professor');
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Registration failed. ERROR 404.");
        }
    };

    return (
        <div className='register-form'>
            <h1>Welcome to CMS</h1>
            <p>faculty portal</p>
            <div>
                <label htmlFor='name'>Name:</label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className='input-field'
                /><br />
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    type='text'
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className='input-field'
                /><br />
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input-field'
                /><br />
                <button onClick={handleRegister} className='register-btn'>Register</button>
                <div>Already Registered. <Link to='/login-professor'>Click here to Login</Link></div>
                <p>Go back to home  <Link to='/'>home</Link></p>
            </div>
        </div>
    );
}

export default Register;

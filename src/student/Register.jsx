import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import './student.css'

const Register = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/auth/register-student', { name, email, password });

            if (res.data.success) {
                toast("Registered successfully!");
                navigate('/login-student');
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Registration failed. ERROR 404.");
        }
    };

    return (
        <div className='register-form'>
            <h1>Welcome to CMS</h1>
            <p>Student portal</p>
            <div>
                <label>Name:</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className='input-field'
                /><br />
                <label>Email:</label>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className='input-field'
                /><br />
                <label>Password:</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input-field'
                /><br />
                <button onClick={handleRegister} className='register-btn'>Register</button>
                <div>Already registered? <Link to='/login-student'>Click here to login</Link></div>
                 <p>Go back to home  <Link to='/'>home</Link></p>
            </div>
        </div>
    );
}

export default Register;

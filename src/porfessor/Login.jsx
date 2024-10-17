import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import './professor.css';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/auth/login-faculty', { email, password });

            if (res.data.success) {
                toast("Login successful!"); 
                localStorage.setItem("professor", JSON.stringify(res.data)); 
                navigate('/professor-dashboard');
            } else {
                toast("Login failed!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='login-form'>
            <h1>Welcome to CMS</h1>
            <p>faculty</p>
            <div>
                <label>Email:</label>
                <input
                    onChange={(e) => setemail(e.target.value)}
                    type='text'
                    value={email}
                    className='input-field'
                />
                <label>Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    value={password}
                    className='input-field'
                />
                <button onClick={handleRegister} className='login-btn'>Login</button>
            </div>
            <p>New faculty? <Link to='/register-professor'>Click here to register</Link></p>
            <p>Go back to   <Link to='/'>home</Link></p>
        </div>
    );
}

export default Login;

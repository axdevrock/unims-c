import style from './component.module.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const LoginComponent = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let res;

            if(role === 'admin'){
                 res = await axios.post(`/auth/login-admin`, {email, password});
            }
            if(role == 'faculty'){
            res = await axios.post(`/auth/login-faculty`, {email, password});
                }
                if(role == 'student'){
                    res = await axios.post(`/auth/login-student`, {email, password});
                        }
            console.log(res.data);
            if (res.data.success) {
                
                // toast(res.data.message); 
                // localStorage.setItem(`user`, JSON.stringify(res.data.user)); 
                localStorage.setItem('token', res.data.token); 
                console.log(res.data.role);
                navigate(`/dashboard-${role}`);
            } else {
                toast(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error.message);
        }
    };
  return (
    <div className={style.mainContainer}>
    <h3>Login panel</h3>
        <div  className={style.loginTop}>
        <h3> {role}</h3>  
        <select id="category" value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="admin">Admin</option>
              
                <option value='student'>
                student
                </option>
                <option   value='faculty'>
                Faculty
                </option>
              
            </select>
            </div>
            <form className={style.loginBody}>
                <label>Email:</label> 
                <input
                    onChange={(e) => setemail(e.target.value)}
                    type='email'
                    value={email}
                />
                <label>Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    value={password}
                />
                <button onClick={handleLogin}>Login {role}</button>
            </form>
            <div className={style.loginFooter}>
            <Link to='/register'>Register Panel</Link>   
            </div>
        </div>

  )
}

export default LoginComponent
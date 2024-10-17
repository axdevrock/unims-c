import style from './component.module.css'
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
const RegisterComponent = () => {
    const [email,
        setemail] = useState('');
    const [name,
        setname] = useState('')
    const [password,
        setPassword] = useState(''); 
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`/auth/register-admin`, {name, email, password});
             


            if (res.data.success) {
                toast(res.data.message)
                navigate('/');
            } else {
                toast(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast(error.message)

        }
    };
    return (
        <div className={style.registerContainer}>
            <h3>Register panel</h3>
            <div className={style.registerTop}>
                <h3>
                    Admin</h3>  
            </div>
            <form className={style.registerBody}>
                <label>Name:</label>
                <input onChange={(e) => setname(e.target.value)} type='text' value={name}/>
                <label>Email:</label>
                <input onChange={(e) => setemail(e.target.value)} type='email' value={email}/>
                <label>Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    value={password}/>
                <button onClick={(e)=>handleRegister(e)}>Register Admin</button>
            </form>
            <div className={style.registerFooter}>
                <Link to='/'>Login panel</Link>
            </div>
        </div>

    )
}

export default RegisterComponent
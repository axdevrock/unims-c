import style from './admin.module.css'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';

const RegisterEntity = () => {
    const [email,
        setemail] = useState('');
    const [name,
        setname] = useState('')
    const [password,
        setPassword] = useState(''); 
        const [role, setRole] = useState('student')
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            let res;
 
            if(role == 'faculty'){
            res = await axios.post(`/auth/register-faculty`, {name, email, password});
                }
                if(role == 'student'){
                    res = await axios.post(`/auth/register-student`, {name, email, password});
                        }
            console.log(res.data);

            if (res.data.success) {
                toast(res.data.message)
                navigate('/dashboard-admin');
            } else {
                toast(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast(error.message)

        }
    };
  return (
   <div className={style.registerEntity}>
     <div className={style.registerContainer}>
    <h3>Register panel for admin</h3>
    <div  className={style.registerTop}>
        <h3> {role}</h3>  
        <select id="category" value={role} onChange={(e)=>setRole(e.target.value)}>
              
              
                <option value='student'>
                student
                </option>
                <option   value='faculty'>
                Faculty
                </option>
              
            </select>
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
        <button onClick={(e)=>handleRegister(e)}>Register {role}</button>
    </form>
</div>
   </div>

  )
}

export default RegisterEntity

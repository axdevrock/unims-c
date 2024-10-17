import style from '../pages/admin/admin.module.css'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';

const RegisterStudent = () => {

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
            const res = await axios.post(`/auth/register-student`, {name, email, password});
                       

            if (res.data.success) {
                toast(res.data.message)
                navigate('/dashboard-faculty');
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
   <h3>Register panel for Faculty</h3>
   <div  className={style.registerTop}>
       <h3> Register Student</h3>  
      
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
       <button onClick={(e)=>handleRegister(e)}>Register Student</button>
   </form>
</div>
  </div>

  )
}

export default RegisterStudent
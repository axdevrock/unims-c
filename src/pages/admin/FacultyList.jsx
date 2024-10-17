import { useEffect, useState } from 'react'
import style from './admin.module.css'
import axios from 'axios' 
import {toast} from 'react-toastify'

const FacultyList = () => {
  const [entity, setentity] = useState([])
  const getStudents= async()=>{
    try {
        const res = await axios.get("/admin/get-all-faculty", {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        if (res.data.success) {
            // toast(res.data.message)
            setentity(res.data.users)
        } else {
            
            toast(res.data.message)
        }
    } catch (error) {
        toast(error.message)
    }
}

useEffect(()=>{
  if(entity.length === 0){
      getStudents();
  }
},[entity.length])
  return (
    <div className={style.EntityContainer}>
    <h1>Faculty List</h1>
    <div className={style.body}>
        <table className={style.studentTable}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {entity && entity.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item?.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default FacultyList
import {Navigate} from "react-router-dom";
import {useEffect} from 'react'
import axios from "axios";
import { useUserContext } from "../../context/userContext";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({children}) {
    const {user,setUser} = useUserContext();

    // get user
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUser = async() => {
     try{
        const res = await axios.post('/api/v1/auth/getUserData',{}, {
           headers:{
            Authorization :localStorage.getItem('token')
           }
        });
        if(res.data.success){
        }else{
            <Navigate to='/login'/>
        }
     }catch(error){
        console.log("error");
        console.log(error);

    };

    useEffect(()=>{
        if(!user)
        getUser();
    },[getUser, user])


    if (localStorage.getItem("token")) {
        return children;
    } else {
        return <Navigate to='/login'/>
    }

}

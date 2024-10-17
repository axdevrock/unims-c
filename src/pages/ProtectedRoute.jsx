/* eslint-disable react/prop-types */
// import {toast} from 'react-toastify'
import {useUserContext} from '../../context/userContext';
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import {useEffect} from 'react'

export default function ProtectedRoute({children}) {
    const {user, setUser} = useUserContext()

    const getUser = async() => {
        try {
            const res = await axios.get("/auth/get-user", {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                setUser(res.data.user)
            } else {
                return <Navigate to='/'/>

            }
        } catch (error) {
            // toast(error.message)
        }
    };

    useEffect(() => {
        if (user == null) {
            getUser()
        }

    }, [user])

    if (localStorage.getItem('token')) {
        return children
    } else {
        return <Navigate to='/'/>
    }
}
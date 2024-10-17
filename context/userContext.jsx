/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useContext, useState} from 'react'

const userContext = createContext()

const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [rolee,setRolee] = useState(null);
        return(
            <userContext.Provider value={{user, setUser,rolee,setRolee}}>
                {
                    children
                }
            </userContext.Provider>
        )

}

const useUserContext = ()=>{
    return useContext(userContext)
}

export {UserProvider, useUserContext} ;
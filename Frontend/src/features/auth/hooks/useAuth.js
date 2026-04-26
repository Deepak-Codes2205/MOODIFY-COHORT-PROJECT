import { register, login, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = ()=>{

    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    async function handleRegister({email, username, password}){
        setLoading(true)
        const data = await register({email, username, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({identifier, password}) {
        setLoading(true);
        const data = await login({identifier, password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        setLoading(true);
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout() {
        setLoading(true);
        const data = await logout()
        setUser(data.user)
        setLoading(false)
    }

    useEffect( () =>{
        handleGetMe()
    },[])
     
    return({
        user, loading, handleRegister, handleLogin, handleGetMe
    })
}
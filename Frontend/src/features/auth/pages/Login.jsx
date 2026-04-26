import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth} from "../hooks/useAuth"
import { useNavigate } from 'react-router'
import { useState } from 'react'



const Login = () => {

  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()

  const [ identifier, setIdentifier ] = useState("")
  const [ password, setPassword ] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    try{
        await handleLogin({ identifier, password })
        navigate("/")
    } catch(err){
        alert(err.response?.data?.message)
    }
  }

  return (
    <div>
      <main className="login-page">
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
                <FormGroup 
                  value = {identifier}
                  onChange = { (e)=> setIdentifier(e.target.value) } 
                  label="Email/Username" placeholder="Enter the Email Or Username"/>

                <FormGroup 
                  value = {password} 
                  onChange = { (e)=> setPassword(e.target.value) }
                  label="Password" placeholder="Enter the password"/> 

                <button type="submit" className="button">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Login

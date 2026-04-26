import React from 'react'
import FormGroup from '../components/FormGroup'
import "../style/register.scss"
import { useAuth} from "../hooks/useAuth"
import { Link } from 'react-router' 
import { useNavigate } from 'react-router'
import { useState } from 'react'

const Register = () => {

  const {loading , handleRegister} = useAuth()
  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")


  async function handleSubmit(e){
    e.preventDefault()
    await handleRegister({email, username, password})
    navigate("/login")
  }

  return (
     <div>
      <main className="register-page">
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit = { handleSubmit }>
                <FormGroup 
                  value = {email}
                  onChange={ (e)=> setEmail(e.target.value)}
                  label="Email" placeholder="Enter the Email Address"/>

                <FormGroup 
                  value = {username}
                  onChange={ (e)=> setUsername(e.target.value)}
                  label="Username" placeholder="Enter the Username Address"/>

                <FormGroup 
                  value = {password}
                  onChange={ (e)=> setPassword(e.target.value)}
                  label="Password" placeholder="Enter the password"/>

                <button type="submit" className="button">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Register


import React, {  useState } from 'react'
import "./Login.css"
import Validation from './ValidationSignup'
import {Link, useNavigate,  } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const[values, setValues]=useState({
        name:"",
        email:"",
        password:"",
    })

    const handleInput =(event) =>{
        const {name , value} = event.target;
        setValues(prev => ({...prev ,[name]: value}))
    }

    const navigate =useNavigate();
    const[errors,setErrors]= useState({})
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (!validationErrors.name &&  !validationErrors.email && !validationErrors.password) {
            try {
                const response = await  axios.post ("http://localhost:8081/signup", values);
                if (response.data && response.data.error) {
                    console.log(response)
                    if (response.data.error === 'Email already exists') {
                        alert('Cet e-mail existe déjà'); 
                    } else {
                        alert('Une erreur est produite lors de l\'inscription');
                    }
                }else{
                    navigate('/')
                    alert("Inscription réussite")
                } 
            } catch (err) {
                console.log(err);
                alert('Une erreur s\'est produite lors de l\'inscription');
            }
        }
    }   
  return (
    <div className="containerLog">
        <div className="box from-box">
        <header>Sign Up</header>
            <form onSubmit={handleSubmit}>
                <div className="field input">
                    <label htmlFor="name">Name</label>
                    <input type="text"  className="btn" placeholder='Name' onChange={handleInput} name='name'/>   
                    {errors.name && <span className='message'>{errors.name}</span>}            
                </div>              
  
                <div className="field input">
                    <label htmlFor="email">Email</label>
                    <input type="email"  className="btn" placeholder='Email' onChange={handleInput} name='email'/>   
                    {errors.email && <span className='message'>{errors.email}</span>}            
                </div>

                <div className="field input">
                    <label htmlFor="password">Password</label>
                    <input type="password"  className="btn" placeholder='password' onChange={handleInput} name='password' />
                    {errors.password && <span className='message'>{errors.password}</span>}
                </div>

                <div className="field " >
                    <button  type="submit" className='btn' value="signup" >Sign Up</button>
                </div>
                <div className="links">
                    You have account ?<Link to='/'> Login </Link>
                </div>
            </form>
        </div>
    </div>
  )

}
export default Login

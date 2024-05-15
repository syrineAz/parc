import React, { useState } from 'react'
import "./Login.css"
import Validation from './Validation' 
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
function Login() {
    const[values, setValues]=useState({
        email:'',
        password:'',
    })
    const handleInput =(event) =>{
        setValues(prev => ({...prev ,[event.target.name]: event.target.value}))
    }
    const[errors,setErrors]= useState({});
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    };
  

    useEffect(() => {
        const fetchData = async () => {
            if (errors.email === "" && errors.password === "") {
                try {
                    const response = await axios.post("http://localhost:8081/login", values);
                    if (response.data.success) {
                        const userData = response.data.userData;

                        localStorage.setItem('userData', JSON.stringify(userData));
                        const storedUserData = JSON.parse(localStorage.getItem('userData'));
                        console.log(storedUserData)
                        const user = {
                            id: storedUserData.id,
                            email: storedUserData.email,
                            role: storedUserData.role,
                            name:storedUserData.name
                        };
                        setUser(user)
                        console.log(user.name)
                        // Utiliser la variable user comme nécessaire dans votre application
                       // console.log("user :" , user )
                        //console.log(user.role);
                        if (user.role === 'admin') {
                            navigate('/AppHome');
                        } else {
                            navigate('/User'); // Rediriger vers la page utilisateur si le rôle n'est pas admin
                        }
                        console.log('Connexion réussie');
                    } else {
                        alert("Mot de passe incorrects");
                    }
                } catch (err) {
                    console.log('Erreur lors de la connexion :', err);
                    alert("Une erreur s'est produite lors de la connexion");
                }
            }
        };
    
        fetchData();
    }, [errors]);
  return (
    <div className="containerLog">
        <div className="box from-box">
        <header>Login</header>
            <form onSubmit={handleSubmit}>
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
                <div className="field ">
                    <button  type="submit" className='btn' value="Login">Login</button>
                </div>
                <div className="links">
                    Don't have account ? <Link to='/SignUp'>Sign Up</Link>
                </div>
                <div className="links">
                   <Link to='/Forgot'>forget Password </Link>
                </div>
            </form>
        </div>
    </div>
  )
}
export default Login



/*  useEffect(() => {
        const fetchData = async () => {
            if (errors.email === "" && errors.password === "") {
                try {
                    const response = await axios.post("http://localhost:8081/login", values);
                    if (response.data === 'Success') {
                        navigate('/AppHome');
                        console.log('Succès');
                        console.log(response.data);
                    } else {
                        if (response.data === 'Identifiants incorrects') {
                            alert("Le mot de passe saisi est incorrect");
                        }
                    }
                } catch (err) {
                    console.log(err);
                    console.log('Une erreur s\'est produite lors de la connexion');
                }
            }
        };

        fetchData();
    }, [errors]);*/
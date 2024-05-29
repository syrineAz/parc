import React, { useState } from 'react';
import "./Login.css";
import Validation from './Validation';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../../Auth/AuthContexte'; // Import du hook useAuth
function Login() {
    const { login } = useAuth(); // Utilisation du hook useAuth pour accéder à login et user
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

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
                        login(userData); // Appel à la fonction login du contexte d'authentification
                        console.log('Connexion réussie');
                        if (userData.role === 'admin') {
                            navigate('/AppHome');
                        } else if (userData.role === 'employer') {
                            navigate('/User');
                        } else {
                            navigate('/Unauthorized');
                        }
                    } else {
                        alert("Mot de passe incorrect");
                    }
                } catch (err) {
                    console.log('Erreur lors de la connexion :', err);
                    alert("Une erreur s'est produite lors de la connexion");
                }
            }
        };

        fetchData();
    }, [errors, login, navigate, values]);

    return (
        <div className="containerLog">
            <div className="box from-box">
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                    <div className="field input">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="btn" placeholder='Email' onChange={handleInput} name='email' />
                        {errors.email && <span className='message'>{errors.email}</span>}
                    </div>
                    <div className="field input">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="btn" placeholder='Password' onChange={handleInput} name='password' />
                        {errors.password && <span className='message'>{errors.password}</span>}
                    </div>
                    <div className="field ">
                        <button type="submit" className='btn' value="Login">Login</button>
                    </div>
                    <div className="links">
                        Don't have an account ? <Link to='/SignUp'>Sign Up</Link>
                    </div>
                    <div className="links">
                        <Link to='/Forgot'>Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;




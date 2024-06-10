import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootswatch/dist/journal/bootstrap.min.css'; // Importer le thème Journal
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importer le JavaScript de Bootstrap

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/register', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login');
                } else {
                    alert("Erreur");
                }
            })
            .catch(err => console.error('Erreur lors de l\'inscription:', err));
    };

    return (
        <div className='d-flex flex-column min-vh-100'>
            {/* Header */}
            <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-bold">Classroom Notes</Link>
                </div>
            </header>

            {/* Main Content */}
            <div className='flex-grow-1 d-flex justify-content-center align-items-center bg-light'>
                <div className="bg-white p-5 rounded-3 shadow-lg w-50">
                    <h2 className="text-center mb-4">Inscription</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Nom</strong></label>
                            <input type="text" placeholder='Entrez votre nom' name='name' 
                                   onChange={e => setValues({ ...values, name: e.target.value })}  
                                   className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input type="email" placeholder='Entrez votre email' name='email' 
                                   onChange={e => setValues({ ...values, email: e.target.value })} 
                                   className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><strong>Mot de passe</strong></label>
                            <input type="password" placeholder='Entrez votre mot de passe' name='password' 
                                   onChange={e => setValues({ ...values, password: e.target.value })} 
                                   className='form-control' />
                        </div>
                        <button type='submit' className='btn btn-success w-100'>Inscription</button>
                        <p className="mt-3 text-center text-muted">En vous inscrivant, vous acceptez nos termes et politiques</p>
                        <Link to='/login' className='btn btn-outline-secondary w-100'>
                            Connexion
                        </Link>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer mt-auto py-3 bg-light text-dark shadow-sm">
                <div className="container text-center">
                    <p>&copy; 2024 Mon Application. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootswatch/dist/journal/bootstrap.min.css'; // Importer le thème Journal
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importer le JavaScript de Bootstrap

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Mon Application</Link>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light text-dark shadow-sm">
      <div className="container text-center">
        <p>&copy; 2024 Mon Application. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

const login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.error('Erreur lors de la connexion:', err));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
        <div className="bg-white p-5 rounded-3 shadow-lg w-50">
          <h2 className="text-center mb-4">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <input
                type="email"
                placeholder="Entrez votre email"
                name="email"
                onChange={e => setValues({ ...values, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><strong>Mot de passe</strong></label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                name="password"
                onChange={e => setValues({ ...values, password: e.target.value })}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Connexion</button>
            <p className="mt-3 text-center text-muted">En vous inscrivant, vous acceptez nos termes et politiques</p>
            <Link to="/register" className="btn btn-outline-secondary w-100">S'inscrire</Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default login;
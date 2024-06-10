import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootswatch/dist/cerulean/bootstrap.min.css'; // Import Cerulean theme
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript

function Header({ isAuthenticated }) {
  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(() => {
        window.location.reload(true);
      }).catch(err => console.log(err));
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Classroom Notes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {isAuthenticated ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>Se Déconnecter</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Se Connecter</Link>
              <Link to="/register" className="btn btn-outline-success">S'Inscrire</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light text-dark shadow-sm">
      <div className="container text-center">
        <p>&copy; 2024 Classroom Notes. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(res => {
        console.log(res.data);  // Debugging: log response data
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setName('');
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.error('Erreur lors de l\'authentification:', err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(() => {
        window.location.reload(true);
      }).catch(err => console.log(err));
  };

  const classLinks = [
    { name: 'DSI21', path: '/class/DSI21' },
    { name: 'DSI22', path: '/class/DSI22' },
    { name: 'TI11', path: '/class/TI11' },
    { name: 'TI12', path: '/class/TI12' },
    { name: 'TI13', path: '/class/TI13' },
    { name: 'TI14', path: '/class/TI14' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header isAuthenticated={auth} />
      <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {auth ? (
          <div className="text-center"> 
            <h1 className="display-4 mb-4">Bienvenue, {name}!</h1>
            <p className="lead">Vous êtes connecté à Classroom Notes.</p>
            <div className="mt-4">
              <h2 className="mb-3">Vos Classes</h2>
              <div className="row">
                {classLinks.map((cls) => (
                  <div key={cls.name} className="col-md-4 mb-4">
                    <h3>{cls.name}</h3>
                    <ul className="list-unstyled">
                      <li>
                        <Link to={`${cls.path}/timetable`} className="btn btn-outline-info me-2">Emploi de Temps</Link>
                      </li>
                      <li>
                        <Link to={`${cls.path}/results`} className="btn btn-outline-info me-2">Résultats</Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>Se Déconnecter</button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="display-4 mb-4">Bienvenue à Classroom Notes</h1>
            <p className="lead">{message || "Connectez-vous pour accéder à votre compte"}</p>
            <div className="mt-4">
              <Link to="/login" className="btn btn-outline-primary me-2 btn-lg">Se Connecter</Link>
              <Link to="/register" className="btn btn-outline-success btn-lg">S'Inscrire</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
<<<<<<< HEAD
import Footer from './components/Footer';
import './App.css'
=======
>>>>>>> 82b4dcb0324aa523db652c796e0eefa44c60c327

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
<<<<<<< HEAD
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/search-result-page' element={<About />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
=======
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/search-result-page' element={<About />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
      </Routes>
>>>>>>> 82b4dcb0324aa523db652c796e0eefa44c60c327
    </Router>
  </React.StrictMode>
);
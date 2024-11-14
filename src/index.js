import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Footer from './components/Footer';
import DashboardPage from './pages/Dashboard';
import './App.css'
import CommentPage from './pages/CommentPage';
import injectContext from './context/AppContext';



const Layout = () => {
  return (
    <React.StrictMode>
      <Router>
        <div className="app-container">
          <Header />
          <div className="content">
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/search-result-page' element={<About />}></Route>
              <Route exact path='/register' element={<Register />}></Route>
              <Route exact path='/Dashboard' element={<DashboardPage />}></Route>
              <Route exact path='/comment' element={<CommentPage />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  </React.StrictMode>
  )
}

export default injectContext(Layout)


const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Layout />);
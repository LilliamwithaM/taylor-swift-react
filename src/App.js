import React, { Component } from "react";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imgLogo from './images/the_eras_tour_logo.png';
import imgWall from './images/wallpaper.jpg';
import imgEras from './images/eras.png';

import AddTaylor from "./components/add-taylor.component.js";
import TaylorList from "./components/list-taylor.component.js";
import SignIn from "./components/signin";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
          <a href="/" className="navbar-brand">
            <img src={imgLogo} alt="Logo" className="logo-left" height="200"></img>
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/taylorlist"} className="nav-link">
                Taylor Swift's song
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Taylor Swift's song
              </Link>
            </li>
          </div>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item avatar">
              <a className="nav-link p-0" href="/home">
                <img src={imgEras} alt="Eras" className="z-depth-0" height="230"></img>
              </a>
            </li>
          </ul>
          
        </nav>
        
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/taylorlist" element={<TaylorList/>} />
            <Route path="/add" element={<AddTaylor/>} />
            <Route path="/home" element={<SignIn/>}/>
          </Routes>
        </div>
        <img src={imgWall} alt="Wallpaper" className="img-wall"></img>
        <div className="container-fluid bg-expand-lg text-center p-3">
          <p className="medium">Develop by Lilliam Romero Reyes</p>
          <p className="small">zS20006765@estudiantes.uv.mx</p>
        </div>
      </div>
    );
  }
}
export default App;

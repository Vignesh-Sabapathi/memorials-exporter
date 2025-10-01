import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
export default function Footer() {
  return (
    <footer className="footer section section--dark">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Left column */}
          <div className="stack">
            <div className="brand">
              <img
                src={logo}
                alt="JK Granites Logo"
                className="logo"
                style={{ height: "40px", width: "auto" }}  // adjust height
              />
              <br></br>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: 900,
                letterSpacing: "0.5px"
              }}>
                JK Granites
              </span>
            </div>
            <p className="muted">Trusted granite memorials exporter.</p>
          </div>

          {/* Middle column */}
          <div className="stack">
            <strong>Useful Links</strong>
            <ul className="links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/products">Products</NavLink></li>
              <li><NavLink to="/colors">Colors</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><NavLink to="/about">About US</NavLink></li>
              <li><NavLink to="/get-a-sample">Get a Sample</NavLink></li>
            </ul>
          </div>

          {/* Right column */}
          <div className="stack">
            <strong>Contact</strong>
            <p className="muted">
              Email: 1982jkgranites@gmail.com<br/>
              Phone: +44 77410 16930<br/>
              Phone: +91 81100 16992<br/>
              Address: Thiruvallur, Tamil Nadu, India.
            </p>
            <NavLink to="/contact" className="btn">Book meeting</NavLink>
          </div>
        </div>

        <div className="bottom-bar">
          Copyright © {new Date().getFullYear()} JK Granites. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
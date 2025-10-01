import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.jpeg';
export default function NavBar() {
  const [open, setOpen] = useState(false);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function toggle() { setOpen(o => !o); }
  function close() { setOpen(false); }

  function onKeyDown(e){
    if(e.key === "Escape") setOpen(false);
  }

  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

  return (
    <header className="nav" onKeyDown={onKeyDown}>
      <div className="container">
        <div className="nav-inner">
          <NavLink to="/" className="brand" onClick={close}>
            <img
              src={logo}
              alt="JK Granites Logo"
              className="logo"
              style={{ height: "40px", width: "auto" }}  // adjust height
            />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 900,
              letterSpacing: "0.5px"
            }}>
              JK Granites
            </span>
          </NavLink>

          <nav className={"nav-menu " + (open ? "open" : "")} id="site-menu">
            <NavLink to="/" className={linkClass} onClick={close} end>Home</NavLink>
            <NavLink to="/products" className={linkClass} onClick={close}>Products</NavLink>
            <NavLink to="/colors" className={linkClass} onClick={close}>Colors</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={close}>Contact</NavLink>
            <NavLink to="/about" className={linkClass} onClick={close}>About Us</NavLink>
            <NavLink to="/get-a-sample" className={linkClass} onClick={close}>Get a Sample</NavLink>
          </nav>

          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-controls="site-menu"
            aria-expanded={open}
            onClick={toggle}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

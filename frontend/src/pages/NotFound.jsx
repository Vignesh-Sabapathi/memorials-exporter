import React from "react";
import { NavLink } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="stack">
      <h1>404</h1>
      <p>We couldn't find that page.</p>
      <NavLink to="/" className="btn">Go Home</NavLink>
    </section>
  );
}

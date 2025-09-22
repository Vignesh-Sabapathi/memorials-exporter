import React from "react";

// This is a placeholder for your /admin frontend.
// If your Spring Boot backend already serves /admin, you can remove this and let the backend route handle it.
export default function Admin() {
  return (
    <section className="stack">
      <h1>Admin</h1>
      <p className="muted">
        Protect this route with authentication. If you plan to use Amazon Cognito or custom JWT auth,
        check the token before rendering admin UI. For now, add/manage products and colors here.
      </p>
      <div className="card">
        <p>Example actions you might implement:</p>
        <ul>
          <li>Create / Update / Delete Product</li>
          <li>Upload product photos (to S3)</li>
          <li>Manage available granite colors</li>
        </ul>
      </div>
    </section>
  );
}

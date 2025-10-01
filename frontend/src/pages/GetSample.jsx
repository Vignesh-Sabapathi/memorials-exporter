import React, { useState } from "react";

export default function GetSample() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobile: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // hook your API here
    console.log("Sample request:", form);
    alert("Thanks! We’ve recorded your request.");
  }

  return (
    <main className="gs-wrap">
      <section className="gs-card gs-left">
        <h1 className="gs-title">Get a Sample</h1>
        <p className="gs-subtitle">
          Here’s exactly what happens after you submit the form:
        </p>

        <ol className="gs-steps">
          <li>
            You’ll receive a confirmation email with the details of your sample
            request.
          </li>
          <li>
            Our team will process your request promptly, and your sample will be
            shipped within 5–7 business days.
          </li>
          <li>
            A dedicated account manager will be available to answer any
            questions.
          </li>
        </ol>
      </section>

      <section className="gs-card gs-right">
        <h2 className="gs-form-title">Your Details</h2>

        <form className="gs-form" onSubmit={handleSubmit} noValidate>
          <div className="gs-row">
            <div className="gs-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="John"
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="gs-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="gs-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="gs-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              placeholder="House/Flat, Street, City, Postcode"
              required
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="gs-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7xxxx xxxxx"
              required
              value={form.mobile}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="gs-btn">Request Sample</button>
        </form>
      </section>
    </main>
  );
}
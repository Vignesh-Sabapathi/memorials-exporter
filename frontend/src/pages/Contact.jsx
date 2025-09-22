import React, { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE ?? "";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (API_BASE) {
        const res = await fetch(API_BASE + "/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to send message");
      }
      setStatus("Message sent. We’ll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  }

  return (
    <section className="stack">
      <h1>Contact Us</h1>
      <form className="card form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" value={form.message} onChange={onChange} required />
        </label>
        <button type="submit">Send</button>
        {status && <p className="muted">{status}</p>}
      </form>
    </section>
  );
}

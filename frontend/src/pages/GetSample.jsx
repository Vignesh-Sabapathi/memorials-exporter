import React, { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE ?? "";

export default function GetSample() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", color: "", notes: ""
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (API_BASE) {
        const res = await fetch(API_BASE + "/api/samples", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to request sample");
      }
      setStatus("Sample request submitted. We’ll confirm by email.");
      setForm({ name: "", email: "", phone: "", address: "", color: "", notes: "" });
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  }

  return (
    <section className="stack">
      <h1>Get a Sample</h1>
      <form className="card form" onSubmit={onSubmit}>
        <div className="grid two">
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={onChange} />
          </label>
          <label>
            Preferred Color
            <input name="color" value={form.color} onChange={onChange} />
          </label>
        </div>
        <label>
          Address
          <textarea name="address" rows="3" value={form.address} onChange={onChange} required />
        </label>
        <label>
          Notes
          <textarea name="notes" rows="3" value={form.notes} onChange={onChange} />
        </label>
        <button type="submit">Request Sample</button>
        {status && <p className="muted">{status}</p>}
      </form>
    </section>
  );
}

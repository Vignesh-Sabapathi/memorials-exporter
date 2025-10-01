import React, { useState } from "react";
import { sendUnifiedInquiry } from "../lib/inquiries";
// If you already use this pattern elsewhere, keep it consistent:
const API_BASE = import.meta.env?.VITE_API_BASE ?? "";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: "", // honeypot (leave empty)
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle | submitting | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    if (form.company) return "Spam detected."; // honeypot filled -> likely bot
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ state: "error", msg: err });
      return;
    }

    setStatus({ state: "submitting", msg: "" });

    try {

      await sendUnifiedInquiry({
        fullName: form.name.trim(),
        firstName: "",
        lastName: "",
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        contactOrSample: "CONTACT",
      });

      setStatus({ state: "success", msg: "Thanks! We’ll get back to you shortly." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus({ state: "error", msg: err.message || "Something went wrong. Please try again." });
    }
  };

  return (
    <section className="section section--light">
      <div className="inner" style={{ padding: "1.25rem" }}>
        <div className="contact-grid">
          {/* Left: form */}
          <div className="contact-card">
            <h2 style={{ margin: 0 }}>Contact Us</h2>
            <p className="muted" style={{ marginTop: ".25rem" }}>
              Tell us about your requirement and we’ll respond within 1 business day.
            </p>

            <form className="stack contact-form" onSubmit={onSubmit} noValidate>
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={onChange}
                className="hp"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="row contact-row">
                <div className="contact-field">
                  <label htmlFor="name">Full name *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="row contact-row">
                <div className="contact-field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+44 20 1234 5678"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="Quotation, sample, size…"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell us about the memorial, size, finish, delivery location…"
                  required
                />
              </div>

              {status.state === "error" && (
                <div className="contact-alert contact-alert--error" role="alert">
                  {status.msg}
                </div>
              )}
              {status.state === "success" && (
                <div className="contact-alert contact-alert--success" role="status">
                  {status.msg}
                </div>
              )}

              <div className="row space-between center-v">
                <small className="muted">* required fields</small>
                <button type="submit" disabled={status.state === "submitting"}>
                  {status.state === "submitting" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </div>

          {/* Right: contact details / map (optional) */}
          <aside className="contact-aside">
            <div className="contact-card">
              <h3 style={{ marginTop: 0 }}>Reach us</h3>
              <div className="stack" style={{ gap: ".5rem" }}>
                <div><strong>Email:</strong> 1982jkgranites@gmail.com</div>
                <div><strong>Phone:</strong> +44 77 4101 6930</div>
                <div><strong>Phone:</strong> +91 93 6004 8067</div>

                <div><strong>Address:</strong> 108/7 Alathur Road, Karalapakkam,</div>
                <div>Avadi Taluk - 602024, Thiruvallur Dt, Tamil Nadu, India.</div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
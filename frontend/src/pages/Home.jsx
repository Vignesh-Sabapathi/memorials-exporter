// Mobile-first, full-bleed sections and responsive grids
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const API_BASE = import.meta.env?.VITE_API_BASE ?? "";

export default function Home(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      if(!API_BASE){
        setProducts(Array.from({length:15}, (_,i)=>({id:i+1,name:`Memorial Model ${i+1}`,sku:`SKU-${String(i+1).padStart(3,"0")}`})));
        return;
      }
      try{
        const res = await fetch(API_BASE + "/api/products");
        if(res.ok){
          const data = await res.json();
          setProducts((Array.isArray(data)?data:[]).slice(0,15));
        }
      }catch{}
    })();
  }, []);

  // Reveal steps on scroll
  useEffect(() => {
    const root = document.getElementById("processFlow");
    if (!root) return;
    const steps = root.querySelectorAll(".process-step");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    steps.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stack" style={{gap:0}}>

      {/* 1) HERO: image background */}
      <section className="section section--hero vh70" role="img"
               aria-label="Peaceful granite memorial park at golden hour with multiple granite headstones.">
        <div className="inner hero-content" style={{ textAlign:'center', justifyItems:'center' }}>
          <h1>QUALITY & RELIABLE DELIVERY</h1>
          <p className="muted" style={{ margin: "0 auto", maxWidth:'70ch' }} >
            From order to doorstep in 8–10 weeks
          </p>
        </div>
      </section>

      {/* 2) ABOUT + Know more */}
      <section className="section section--muted">
        <div className="inner about-grid">
          {/* Left: Image */}
          <div className="about-image">
              <img
                src="/images/company1.jpg"
                alt="Granite yard with skilled workers inspecting memorial stones"
              />
          </div>

          {/* Right: Text */}
          <div className="about-text">
            <h2>About Our Company</h2>

            <p>
              With over three decades of expertise, our founders bring unmatched knowledge and
              craftsmanship to the granite monument industry. Based in South India, where we
              operate our own state-of-the-art factory, we specialize in crafting and exporting
              high-quality granite monuments to customers worldwide.
            </p>

            <p>
              Our wide range of granite colors and styles allows us to meet the diverse needs of
              international markets. Over the years, we’ve built an excellent reputation for:
            </p>

            <ul className="ticks">
              <li>Fast and reliable deliveries</li>
              <li>Competitive pricing without compromising on quality</li>
              <li>Dedicated customer service that ensures a seamless experience from order to shipment</li>
            </ul>

            <p>
              We take pride in being a trusted global partner, delivering monuments that stand the
              test of time with elegance and strength.
            </p>

            <NavLink to="/about" className="btn">Know more</NavLink>
          </div>
        </div>
      </section>

      {/* 3) ORDER FLOW */}
      <section className="section section--light">
        <div className="inner">
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Order Process Flow</h2>

          {/* Grid timeline */}
          <ol id="processFlow" className="process-grid" aria-label="Order process in eight steps">
            {[
              { t: "Send Enquiry", d: "Share your requirements, drawings, sizes, and target timelines." },
              { t: "Get Quote", d: "We send a detailed quotation with pricing, lead time, and terms." },
              { t: "Order Placement", d: "Confirm specifications and place your PO to lock the schedule." },
              { t: "Start Production", d: "Blocks are selected; cutting, shaping, and finishing begins." },
              { t: "Quality Checking", d: "Dimensional checks, finish inspection, and sandblast validation." },
              { t: "Packaging", d: "Shock-safe packing with corner guards, foam, and crates." },
              { t: "Shipping", d: "We coordinate export docs, booking, and dispatch." },
              { t: "Door Delivery", d: "Delivered to your yard/site with tracking and proof of delivery." },
            ].map((s, i) => (
              <li className="process-step" key={s.t}>
                <div className="process-badge" aria-hidden="true">{i + 1}</div>

                {/* Optional thumbnail from Gemini (put your image file here) */}
                {/* <img className="process-thumb" src={`/images/flow/step-${i+1}.webp`} alt="" loading="lazy" /> */}

                <h3 className="process-title">{s.t}</h3>
                <p className="process-desc">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4) PRODUCTS (3 rows × 5 cols) */}
      <section className="section section--light">
        <div className="inner stack">
          <div className="row space-between center-v" style={{flexWrap:"wrap"}}>
            <h2>Products</h2>
            <NavLink to="/products" className="btn ghost" style={{borderColor:"var(--border)"}}>View More</NavLink>
          </div>
          <div className="grid five">
            {products.map(p => (
              <div className="card-plain" key={p.id || p.sku}>
                <div className="img-ph" />
                <h3 style={{margin:"0.5rem 0 0"}}>{p.name}</h3>
                <p className="muted">{p.sku}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) COLORS (empty) */}
      <section className="section section--muted vh70">
        <div className="inner stack" style={{justifyItems:"center", textAlign:"center"}}>
          <h2>Granite Colors</h2>
          <p className="muted">We’ll showcase swatches and finishes here shortly…</p>
        </div>
      </section>

      {/* 6) TESTIMONIALS */}
      <section className="section section--light vh70">
        <div className="inner">
          <h2 style={{textAlign:"center"}}>Testimonials</h2>
          <div className="grid three" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
            <blockquote style={{margin:0,borderLeft:"4px solid var(--accent)",padding:".75rem 1rem",background:"#fff"}}>
              <p>“Consistent finish and on-time deliveries. Great partner.”</p>
              <footer>— UK Memorials Ltd.</footer>
            </blockquote>
            <blockquote style={{margin:0,borderLeft:"4px solid var(--accent)",padding:".75rem 1rem",background:"#fff"}}>
              <p>“Clear communication and safe packing. Zero breakages.”</p>
              <footer>— NorthShire Monuments</footer>
            </blockquote>
            <blockquote style={{margin:0,borderLeft:"4px solid var(--accent)",padding:".75rem 1rem",background:"#fff"}}>
              <p>“Flexible with custom sizes and sandblasting.”</p>
              <footer>— Heritage Stones</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 7) FINAL: logo + links + contact */}
      <section className="section section--dark vh70">
        <div className="inner">
          <div className="grid three" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
            <div className="stack">
              <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
                <div style={{width:"40px",height:"40px",background:"var(--accent)"}} />
                <strong>Memorials Exporter</strong>
              </div>
              <p className="muted">Trusted granite memorials exporter.</p>
            </div>
            <div className="stack">
              <strong>Useful Links</strong>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"grid",gap:".35rem"}}>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
                <li><NavLink to="/colors">Colors</NavLink></li>
                <li><NavLink to="/faq">FAQ</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
              </ul>
            </div>
            <div className="stack">
              <strong>Contact</strong>
              <p className="muted">Email: info@example.com<br/>Phone: +44 0000 000000<br/>Address: Glasgow, UK</p>
              <NavLink to="/contact" className="btn">Book meeting</NavLink>
            </div>
          </div>
          <div style={{marginTop:"1rem",borderTop:"1px solid var(--border)",paddingTop:".75rem",color:"var(--muted)"}}>
            © {new Date().getFullYear()} Memorials Exporter — All rights reserved.
          </div>
        </div>
      </section>

    </section>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

// Put your certificate images into /public/images/certs/…
const CERTS = [
  { key: "cert-capexil",  name: "CAPEXIL",  src: "/images/JK_CAPEXIL.jpg" },
  { key: "cert-UDYAM", name: "UDYAM", src: "/images/JK_UDYAM.jpg" },
  { key: "cert-IEC",    name: "IEC Code",     src: "/images/JKIECCode.jpeg" },
];

export default function About() {
  const [active, setActive] = React.useState(null); // {src, name} or null

  // Close on ESC
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="section section--light">
      <div className="inner" style={{ padding: "1.25rem" }}>
        {/* Reuse your Home "About Our Company" block */}
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
                  </div>
                </div>
              </section>

        {/* Labour Force (3 lines) */}
        <div className="about-card">
          <br></br>
          <h3 style={{ marginTop: 0 }}>Labour Force</h3>
          <p style={{ margin: 0 }}>
            At JK Granites, we take pride in the dedication and expertise of our labor force. With a team of 20 highly skilled members,
            we uphold the highest standards of craftsmanship and professionalism in every aspect of our operations. Furthermore,
            our team boasts 25+ years of experience, ensuring unparalleled mastery in the industry.
          </p>
        </div>

        {/* Mission Statement (4 lines) */}
        <div className="about-card">
          <br></br>
          <h3 style={{ marginTop: 0 }}>Mission Statement</h3>
          <p style={{ margin: 0 }}>
            To deliver memorials that honour lives with dignity and endure for generations.
            We commit to reliable lead times, transparent communication, and fair pricing.
            Sustainable sourcing and responsible manufacturing guide our decisions.
            Every order receives the same care—from a single headstone to large programs.
          </p>
        </div>

        {/* Certificates gallery */}
        <div className="about-card">
          <br></br>
          <h3 style={{ marginTop: 0 }}>Certificates</h3>
          <p className="muted" style={{ marginTop: ".25rem" }}>
            Click any certificate to view larger.
          </p>

          <div className="certs-grid">
            {CERTS.map((c) => (
              <button
                key={c.key}
                className="cert-card"
                onClick={() => setActive(c)}
                title={`View ${c.name}`}
              >
                <div className="cert-media">
                  <img src={c.src} alt={c.name} className="cert-img" loading="lazy" />
                </div>
                <div className="cert-meta">
                  <strong>{c.name}</strong>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {active && (
        <div
          className="cert-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="cert-lightbox" onClick={(e) => e.stopPropagation()}>
            <div className="cert-lightbox-head">
              <strong>{active.name}</strong>
              <button className="btn ghost" onClick={() => setActive(null)} aria-label="Close">
                Close ✕
              </button>
            </div>
            <div className="cert-lightbox-body">
              <img src={active.src} alt={active.name} className="cert-lightbox-img" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
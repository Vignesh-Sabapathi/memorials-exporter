import React, { useState, useRef } from "react";  // <— drop useEffect, use React hooks directly

const COLOR_IMAGES = [
  "/images/Indian-Black.jpg",
  "/images/Bahama-Blue.jpg",
  "/images/Indian-Sadarali-Grey.jpeg",
  "/images/Ruby-Red.jpg",
  "/images/Tropical-Green.jpg",
  "/images/Cats-Eye.jpg",
  "/images/Black-Forest.jpg",
  "/images/Blue-Pearl.jpeg",
  "/images/Indian-Aurora.jpeg",
];

export default function Colors() {
  const n = COLOR_IMAGES.length;

  // state
  const [idx, setIdx] = useState(0);
  const go = (d) => setIdx((i) => (i + d + n) % n);

  // **** add these: swipe handlers for mobile ****
  const startX = useRef(null);
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? +1 : -1);
    startX.current = null;
  };

  return (
    <section className="section section--muted vh70">
      <div className="inner stack" style={{ justifyItems: "center", textAlign: "center", height: "100%" }}>
        <h2 style={{ marginBottom: ".25rem" }}>Granite Colors</h2>

        {/* Desktop/Tablet: Grid gallery */}
        <div className="gc-container hide-on-mobile">
          <div className="gc-gallery">
            {COLOR_IMAGES.map((src, i) => (
              <div key={i} className="gc-item">
                <img className="gc-image" src={src} alt={`Granite color ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: single-image slider with left/right buttons */}
        <div className="gc-mobile-slider show-on-mobile" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button className="gc-nav gc-left" aria-label="Previous color" onClick={() => go(-1)}>‹</button>
          <div className="gc-frame">
            <img src={COLOR_IMAGES[idx]} alt={`Granite color ${idx + 1} of ${n}`} className="gc-img" />
          </div>
          <button className="gc-nav gc-right" aria-label="Next color" onClick={() => go(+1)}>›</button>
        </div>
      </div>
    </section>
  );
}
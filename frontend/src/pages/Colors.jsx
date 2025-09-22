import React, { useEffect, useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE ?? "";

export default function Colors() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        if (API_BASE) {
          const res = await fetch(API_BASE + "/api/colors");
          if (!res.ok) throw new Error("Failed to load colors");
          const data = await res.json();
          setColors(data);
        } else {
          setColors([
            { code: "#2b2b2b", name: "Black Galaxy" },
            { code: "#6f6f6f", name: "Steel Grey" },
            { code: "#9b7f5a", name: "Tan Brown" },
            { code: "#d7d7d7", name: "Kashmir White" },
          ]);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading colors…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="stack">
      <h1>Granite Colors</h1>
      <div className="grid four">
        {colors.map((c, i) => (
          <div className="card color-card" key={i}>
            <div className="swatch" style={{ background: c.code }} />
            <h3>{c.name}</h3>
            <p className="muted">{c.code}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

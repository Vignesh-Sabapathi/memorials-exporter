import React, { useEffect, useState } from "react";

// Optional: point this to your backend API
const API_BASE = import.meta?.env?.VITE_API_BASE ?? "";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        if (API_BASE) {
          const res = await fetch(API_BASE + "/api/products");
          if (!res.ok) throw new Error("Failed to load products");
          const data = await res.json();
          setItems(data);
        } else {
          // Fallback demo items
          setItems([
            { id: 1, name: "Ogee Headstone", sku: "OG-001" },
            { id: 2, name: "Peon Top", sku: "PT-204" },
            { id: 3, name: "Book Memorial", sku: "BK-112" },
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

  if (loading) return <p>Loading products…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="stack">
      <h1>Products</h1>
      <div className="grid three">
        {items.map((p) => (
          <div className="card" key={p.id || p.sku}>
            <div className="img-placeholder" />
            <h3>{p.name}</h3>
            {p.sku ? <p className="muted">SKU: {p.sku}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

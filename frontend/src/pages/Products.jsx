import React, { useEffect, useState } from "react";
const API_BASE = import.meta?.env?.VITE_API_BASE ?? "";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log("VITE_API_BASE =", API_BASE || "(empty)");
        if (!API_BASE) throw new Error("VITE_API_BASE not set");
        console.log("mode:", import.meta.env.MODE);
        console.log("VITE_API_BASE:", import.meta.env.VITE_API_BASE);
        const url = API_BASE.replace(/\/+$/, "") + "/api/products";
        console.log("Fetching:", url);
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
        const data = await res.json();
        console.log("API data:", data);
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error)   return <p className="error">Error: {error}</p>;
  if (items.length === 0) return <p>No products yet.</p>;

  return (
    <section className="stack">
      <h1>Products</h1>
      <div className="grid three">
        {items.map((p) => (
          <div className="card" key={p.id ?? p.sku ?? crypto.randomUUID()}>
            <div className="img-placeholder" />
            <h3>{p.name ?? p.title ?? "Untitled"}</h3>
            {p.sku ? <p className="muted">SKU: {p.sku}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
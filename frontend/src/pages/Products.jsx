import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { listProducts } from "../api"; // reuse the axios helper

export default function Products() {
  const [items, setItems]   = useState([]);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await listProducts();     // GET /api/products/all
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError(e?.message ?? "Failed to load products");
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error)   return <p className="error">Error: {error}</p>;
  if (!items.length) return <p>No products yet.</p>;

  return (
    <section className="section section--light">
      <div className="inner stack">
        <div className="row space-between center-v" style={{flexWrap:"wrap"}}>
          <h2>Products</h2>
          <span className="muted">{items.length} items</span>
        </div>

        {/* Match Home: 5-wide grid, image + title, link to details */}
        <div className="grid five">
          {items.map((p) => {
            const firstImg = (p.imageUrls && p.imageUrls[0]) || "/images/placeholder.jpg";
            return (
              <NavLink
                key={p.id ?? p.sku}
                to={p.id ? `/product/${p.id}` : "#"}
                className="card-plain"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="img-ph" style={{ aspectRatio: "4/3", overflow:"hidden", background:"#f4f4f5" }}>
                  <img
                    src={firstImg}
                    alt={p.name || "Memorial"}
                    loading="lazy"
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                  />
                </div>
                <h3 style={{margin:"0.5rem 0 0"}}>{p.name ?? "Untitled"}</h3>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
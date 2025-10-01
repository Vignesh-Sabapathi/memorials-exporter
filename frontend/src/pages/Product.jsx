// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";

export default function Product() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct(id);
        setP(data);
      } catch (e) {
        console.error(e);
        setError(e?.message ?? "Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="max-w-5xl mx-auto p-6">Loading…</div>;
  if (error) return <div className="max-w-5xl mx-auto p-6 text-red-500">Error: {error}</div>;
  if (!p) return <div className="max-w-5xl mx-auto p-6">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: product images */}
        <div className="space-y-3">
          {(p.imageUrls || []).map((url) => (
            <img
              key={url}
              className="w-full rounded-xl border"
              src={url}
              alt={p.name}
              loading="lazy"
            />
          ))}
        </div>

        {/* Right: product info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{p.name}</h1>
        </div>
      </div>
    </div>
  );
}
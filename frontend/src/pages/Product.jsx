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
          {p.priceCents != null && (
            <div className="text-xl font-semibold mb-4">
              £{(p.priceCents / 100).toFixed(2)}
            </div>
          )}
          <p className="text-gray-700 whitespace-pre-wrap">{p.description}</p>

          {p.sku && <div className="mt-4 text-sm text-gray-600">SKU: {p.sku}</div>}
          {p.category && (
            <div className="mt-2 text-sm text-gray-600">Category: {p.category}</div>
          )}
        </div>
      </div>
    </div>
  );
}
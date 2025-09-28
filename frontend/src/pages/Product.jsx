import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct, imageUrl } from '../api'

export default function Product() {
  const { id } = useParams()
  const [p, setP] = useState(null)

  useEffect(() => {
    getProduct(id).then(setP)
  }, [id])

  if (!p) return <div className="max-w-5xl mx-auto p-6">Loading…</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {(p.imageUrls || []).map(url => (
            <img key={url} className="w-full rounded-xl" src={url} alt={p.name} />
          ))}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{p.name}</h1>
          {p.price != null && <div className="text-xl font-semibold mb-4">£{p.price}</div>}
          <p className="text-gray-700 whitespace-pre-wrap">{p.description}</p>
          {p.category && <div className="mt-4 text-sm text-gray-600">Category: {p.category}</div>}
        </div>
      </div>
    </div>
  )
}

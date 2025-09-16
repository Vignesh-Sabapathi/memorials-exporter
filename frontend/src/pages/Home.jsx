import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listProducts, imageUrl } from '../api'

export default function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listProducts().then(setItems).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="max-w-6xl mx-auto p-6">Loading…</div>

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(p => (
        <Link to={`/product/${p.id}`} key={p.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
          {p.imageKeys?.length ? (
            <img className="w-full h-48 object-cover rounded-xl mb-3" src={imageUrl(p.imageKeys[0])} alt={p.name} />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-3"></div>
          )}
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
          {p.price != null && <div className="mt-2 font-bold">£{p.price}</div>}
        </Link>
      ))}
    </div>
  )
}

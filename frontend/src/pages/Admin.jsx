import React, { useEffect, useState } from 'react'
import { getClient, listProducts, imageUrl } from '../api'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '' })
  const [files, setFiles] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const authedClient = () => getClient(token)

  useEffect(() => {
    listProducts().then(setItems)
  }, [])

  const saveToken = () => {
    localStorage.setItem('adminToken', token)
    alert('Token saved for this browser.')
  }

  const onUpload = async (file) => {
    const client = authedClient()
    const data = new FormData()
    data.append('file', file)
    const res = await client.post('/api/admin/uploads', data, { headers: { 'Content-Type': 'multipart/form-data' }})
    return res.data.key
  }

  const onCreate = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      const imageKeys = []
      for (let i=0;i<files.length;i++) {
        const key = await onUpload(files[i])
        imageKeys.push(key)
      }
      const payload = {
        name: form.name,
        description: form.description,
        category: form.category || null,
        price: form.price ? parseFloat(form.price) : null,
        imageKeys
      }
      const res = await authedClient().post('/api/admin/products', payload)
      setItems([res.data, ...items])
      setForm({ name: '', description: '', category: '', price: '' })
      setFiles([])
      alert('Product created')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data || 'Failed to create product')
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id) => {
    if (!confirm('Delete product?')) return
    await authedClient().delete(`/api/admin/products/${id}`)
    setItems(items.filter(p => p.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input className="border rounded px-3 py-2 flex-1" placeholder="X-Admin-Token" value={token} onChange={e => setToken(e.target.value)} />
          <button onClick={saveToken} className="bg-gray-900 text-white px-4 py-2 rounded">Save Token</button>
          <span className="text-sm text-gray-600">Default backend token is <code>changeme</code> (change in application.properties)</span>
        </div>
      </div>

      <form onSubmit={onCreate} className="bg-white rounded-xl shadow p-4 mb-8">
        <h2 className="font-semibold mb-3">Add Product</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border rounded px-3 py-2" placeholder="Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
          <input className="border rounded px-3 py-2" type="number" step="0.01" placeholder="Price (optional)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          <input className="border rounded px-3 py-2" type="file" multiple onChange={e => setFiles([...e.target.files])} />
          <textarea className="border rounded px-3 py-2 md:col-span-2" rows={5} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <button disabled={saving} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">{saving ? 'Saving…' : 'Create Product'}</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            {p.imageKeys?.length ? (
              <img className="w-full h-48 object-cover rounded-xl mb-3" src={imageUrl(p.imageKeys[0])} alt={p.name} />
            ) : <div className="w-full h-48 bg-gray-200 rounded-xl mb-3"></div>}
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
            <div className="mt-3 flex justify-between">
              <a className="text-blue-600 text-sm underline" href={`/product/${p.id}`}>View</a>
              <button onClick={() => onDelete(p.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

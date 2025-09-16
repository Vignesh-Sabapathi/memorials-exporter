import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Product from './pages/Product'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">Memorials Exporter</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm hover:underline">Home</Link>
            <Link to="/admin" className="text-sm hover:underline">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600">
          © {new Date().getFullYear()} Memorials Exporter
        </div>
      </footer>
    </div>
  )
}

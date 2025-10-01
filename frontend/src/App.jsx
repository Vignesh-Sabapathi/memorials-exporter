import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Colors from "./pages/Colors";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import GetSample from "./pages/GetSample";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Product from "./pages/Product";

export default function App() {
  return (
    <div className="app-root">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-a-sample" element={<GetSample />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

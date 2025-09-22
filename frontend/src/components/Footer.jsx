import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Memorials Exporter • All rights reserved.</p>
        <p className="muted">Built with Spring Boot + React • Images on Amazon S3</p>
      </div>
    </footer>
  );
}

import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">{children}</main>

      <Footer />
    </div>
  );
}

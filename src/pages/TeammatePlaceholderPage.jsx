import React from 'react';
import { Link } from 'react-router-dom';

export default function TeammatePlaceholderPage({ pageName, description }) {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">MODULE PLACEHOLDER</span>
          <h1>{pageName} Page</h1>
          <p>{description}</p>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="card">
            <h2 style={{ fontSize: '1.5rem' }}>Integration Placeholder</h2>
            <p>
              This route is reserved for the <strong>{pageName}</strong> module. Once ready, import
              it into <code>src/App.jsx</code> and replace this placeholder.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
              <Link to="/" className="btn btn-primary btn-sm">Home</Link>
              <Link to="/about" className="btn btn-outline btn-sm">About</Link>
              <Link to="/events" className="btn btn-outline btn-sm">Events Calendar</Link>
              <Link to="/meetings" className="btn btn-outline btn-sm">Meetings (Members)</Link>
              <Link to="/gallery" className="btn btn-outline btn-sm">Gallery</Link>
              <Link to="/get-involved" className="btn btn-secondary btn-sm">Get Involved</Link>
              <Link to="/contact" className="btn btn-outline btn-sm">Contact &amp; FAQ</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CLUB_INFO } from '../data/clubData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Logo height={38} onDark />
              <strong style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700 }}>InCompute</strong>
            </div>
            <p style={{ marginBottom: '0.5rem' }}>{CLUB_INFO.institution}</p>
            <p style={{ marginBottom: '0.5rem' }}>Himachal Vihar, Phase II, Matigara, Siliguri</p>
            <p style={{ marginBottom: 0 }}>
              <a href={`mailto:${CLUB_INFO.email}`}>{CLUB_INFO.email}</a>
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h4>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <Link to="/about">About Club</Link>
              <Link to="/team">Team &amp; Advisors</Link>
              <Link to="/events">Event Calendar</Link>
              <Link to="/gallery">Photo Gallery</Link>
              <Link to="/get-involved">Bring One Idea</Link>
              <Link to="/meetings">Meetings (Members)</Link>
            </div>
          </div>

          {/* Computing streams */}
          <div>
            <h4>Computing Streams</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <Link to="/events">BCA (Core)</Link>
              <Link to="/events">BSc Data Science</Link>
              <Link to="/events">AI &amp; Machine Learning</Link>
              <Link to="/events">Cyber Security</Link>
            </div>
          </div>

          {/* Official & governance */}
          <div>
            <h4>Official &amp; Governance</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span>Club Desk: {CLUB_INFO.email}</span>
              <Link to="/contact">FAQ &amp; Certificates</Link>
              <Link to="/admin">Officer &amp; Faculty Admin</Link>
              {CLUB_INFO.socialLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} InCompute · Inspiria Knowledge Campus | Student photos &amp; data used with consent only</span>
          <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Contact &amp; Charter Rules
          </Link>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { CLUB_INFO } from '../data/clubData';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/events', label: 'Events' },
  { to: '/notices', label: 'Notices' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/meetings', label: 'Meetings' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="top-bar">
        2026–27 Session |{' '}
        <Link to="/events/evt-school-hackathon" className="top-bar-accent" style={{ textDecoration: 'none' }}>
          School Hackathon registration closes 10 Dec 2026
        </Link>
      </div>

      <header className="site-header">
        <div className="container nav-bar">
          <Link to="/" className="brand-link" aria-label="InCompute Home">
            <Logo height={34} />
            <span style={{ color: 'var(--grey-border)', fontWeight: 400 }}>|</span>
            <span>InCompute</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-drawer" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Logo height={44} onDark />
                <strong style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700 }}>InCompute</strong>
              </div>
              <p style={{ marginBottom: '0.5rem' }}>{CLUB_INFO.institution}</p>
              <p style={{ marginBottom: '0.5rem' }}>Himachal Vihar, Phase II, Matigara, Siliguri</p>
              <p style={{ marginBottom: 0 }}>
                <a href={`mailto:${CLUB_INFO.email}`}>{CLUB_INFO.email}</a>
              </p>
            </div>

            <div>
              <h4>Explore</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <Link to="/about">About Club</Link>
                <Link to="/events">Event Calendar</Link>
                <Link to="/gallery">Photo Gallery</Link>
                <Link to="/get-involved">Bring One Idea</Link>
                <Link to="/meetings">Meetings (Members)</Link>
              </div>
            </div>

            <div>
              <h4>Focus Tracks</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <Link to="/events">Web Development</Link>
                <Link to="/events">Data Analytics</Link>
                <Link to="/events">AI &amp; ML</Link>
                <Link to="/events">Cyber Security</Link>
              </div>
            </div>

            <div>
              <h4>Get in touch</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span>Club Desk: {CLUB_INFO.email}</span>
                <Link to="/contact">FAQ &amp; Certificates</Link>
                {CLUB_INFO.socialLinks.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} InCompute · Inspiria Knowledge Campus | Privacy &amp; Consent</span>
            <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Contact &amp; Charter Rules
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

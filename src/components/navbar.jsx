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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top announcement bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div>
            2026–27 Session · School of Computer Application |{' '}
            <Link
              to="/events/evt-school-hackathon"
              className="top-bar-accent"
              style={{ textDecoration: 'none' }}
            >
              School Hackathon registration closes 10 Dec 2026
            </Link>
          </div>
          <div className="top-bar-links">
            <a
              href="https://inspiria.edu.in/degree-courses/school-of-computer-application/"
              target="_blank"
              rel="noreferrer"
            >
              School of Computing
            </a>
            <Link to="/get-involved">Bring One Idea</Link>
            <Link to="/admin">Officer Admin</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="site-header">
        <div className="container nav-bar">
          <Link to="/" className="brand-link" aria-label="InCompute Home">
            <Logo height={32} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ color: 'var(--blue)', fontWeight: 700 }}>InCompute</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--ink-muted)' }}>
                {CLUB_INFO.tagline}
              </span>
            </span>
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

        {/* Mobile drawer */}
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
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Officer Admin
            </NavLink>
          </nav>
        )}
      </header>
    </>
  );
}

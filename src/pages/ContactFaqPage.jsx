import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { CLUB_INFO, FAQS } from '../data/clubData';

export default function ContactFaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">CONTACT &amp; FAQ</span>
          <h1>Reach InCompute</h1>
          <p>
            Official club contact, campus location, certificate details, and answers to common
            questions from students, faculty, and school participants.
          </p>
        </div>
      </section>

      <section className="section-band band-white">
        <div className="container">
          <div className="grid-3">
            <div className="card">
              <span className="eyebrow">OFFICIAL EMAIL</span>
              <h3 style={{ marginBottom: '0.5rem' }}>One Official Inbox</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Personal emails and phone numbers are never published on the site. Reach the club
                team at:
              </p>
              <a href={`mailto:${CLUB_INFO.email}`} className="btn btn-secondary btn-sm">
                {CLUB_INFO.email}
              </a>
            </div>

            <div className="card">
              <span className="eyebrow">CAMPUS LOCATION</span>
              <h3 style={{ marginBottom: '0.5rem' }}>Where We Meet</h3>
              <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                {CLUB_INFO.location}
                <br />
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                  School of Computer Application (Computer Labs &amp; Seminar Hall)
                </span>
              </p>
            </div>

            <div className="card-yellow">
              <span className="eyebrow" style={{ color: 'var(--ink)' }}>CERTIFICATES &amp; JOINING</span>
              <h3 style={{ marginBottom: '0.5rem' }}>How to Join</h3>
              <p style={{ fontSize: '0.92rem' }}>
                Students in BCA, Data Science, AI/ML, and Cyber Security (Years 1–4) can apply online.
                Certificates are issued after attendance verification.
              </p>
              <Link to="/get-involved" className="btn btn-secondary btn-sm">
                Submit an Idea →
              </Link>
            </div>
          </div>

          <div className="callout" style={{ marginTop: '2rem', marginBottom: 0 }}>
            <ShieldCheck size={20} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.2rem', color: 'var(--ink)' }}>
                Privacy &amp; Consent Note
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
                Student photos, emails, and phone numbers are collected only with explicit consent
                and used strictly for InCompute club work.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <span className="eyebrow">ANSWERS</span>
          <h2 style={{ marginBottom: '1.75rem' }}>Frequently Asked Questions</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {FAQS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.q} className="card" style={{ padding: '1.15rem 1.35rem' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'var(--ink)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '1.02rem',
                    }}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9375rem' }}>
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

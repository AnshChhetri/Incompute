import React from 'react';
import { Link } from 'react-router-dom';
import { CHARTER_RULES, CLUB_INFO, CLUB_STRUCTURE } from '../data/clubData';

export default function AboutPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">ABOUT THE CLUB</span>
          <h1>One trusted home for computing at Inspiria</h1>
          <p>
            Formerly known as the {CLUB_INFO.formerName}, {CLUB_INFO.name} brings together students
            from {CLUB_INFO.department} so plans, events, and ideas live in one reliable place.
          </p>
        </div>
      </section>

      <section className="section-band band-white">
        <div className="container">
          <div className="grid-2">
            <article className="card">
              <span className="eyebrow">OUR STORY</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.85rem' }}>From Computing Club to InCompute</h2>
              <p>
                Following the 30 September charter decisions and the 19 November club review, the
                Computing Club adopted the name <strong>InCompute</strong> to build a unified student
                community across all computing disciplines.
              </p>
              <p style={{ marginBottom: 0 }}>
                Instead of relying on scattered chats, spreadsheets, and PDFs, this site gives
                students, faculty, and visiting school participants one official place to see what is
                coming, register through Inspiria’s official facility, and propose new events.
              </p>
            </article>

            <article className="card-warm">
              <span className="eyebrow">WHO WE SERVE</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.85rem' }}>Built for every computing learner</h2>
              <ul className="bullet-list">
                <li>
                  <strong>Undergraduate Students (Years 1–4):</strong> BCA, BSc Data Science, AI &amp; ML, and Cyber Security students looking for workshops, hackathons, and peer leadership.
                </li>
                <li>
                  <strong>Faculty &amp; Guests:</strong> Check the official semester calendar and explore past sessions such as Software Freedom Day and industry talks.
                </li>
                <li>
                  <strong>School Students:</strong> Register for outreach events such as the 12–13 December School Hackathon for Classes 11 &amp; 12.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">STRUCTURE</span>
              <h2>How the club is organised</h2>
              <p style={{ marginBottom: 0 }}>
                Clear roles confirmed by the club charter keep operations transparent and accountable.
              </p>
            </div>
          </div>

          <div className="grid-2">
            {CLUB_STRUCTURE.map((item) => (
              <div key={item.group} className="card">
                <h3 style={{ color: 'var(--blue)', marginBottom: '0.5rem' }}>{item.group}</h3>
                <p style={{ marginBottom: 0, fontSize: '0.9375rem' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band band-white">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">CHARTER GOVERNANCE</span>
              <h2>Rules the site follows</h2>
              <p style={{ marginBottom: 0 }}>
                Our charter sets clear guardrails for approvals, privacy, and official registration.
              </p>
            </div>
            <Link to="/get-involved" className="btn btn-primary">
              Bring one idea
            </Link>
          </div>

          <div className="card table-wrap" style={{ padding: 0, overflow: 'hidden' }}>
            <table>
              <thead>
                <tr>
                  <th>Charter Rule</th>
                  <th>How It Works on This Site</th>
                </tr>
              </thead>
              <tbody>
                {CHARTER_RULES.map((item) => (
                  <tr key={item.rule}>
                    <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{item.rule}</td>
                    <td style={{ color: 'var(--ink-muted)' }}>{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

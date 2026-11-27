import React, { useState } from 'react';
import { Lock, LogOut, Calendar, MapPin, Clock, FileText, Download, AlertCircle } from 'lucide-react';
import { MEETINGS_DATA, NEXT_MEETING } from '../data/clubData';
import { getAuthSession, signInWithRole, signOutSession } from '../lib/clubStore';

function downloadMinutesSummary(meeting) {
  const content = [
    `INCOMPUTE — OFFICIAL MEETING MINUTES SUMMARY (MEMBERS ONLY)`,
    `Title: ${meeting.title}`,
    `Date: ${meeting.displayDate} | Time: ${meeting.time} | Venue: ${meeting.venue}`,
    `Type: ${meeting.type}`,
    `Purpose: ${meeting.purpose}`,
    ``,
    `KEY DECISIONS:`,
    ...meeting.decisions.map((d, i) => `${i + 1}. ${d}`),
    ``,
    `ACTION ITEMS:`,
    ...meeting.actionItems.map((a) => `- ${a.task} (${a.owner}, Due: ${a.due}) [${a.status}]`),
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', meeting.minutesPdfLabel.replace('.pdf', '.txt'));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function MeetingsPage() {
  const [session, setSession] = useState(() => getAuthSession());
  const [memberEmail, setMemberEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedMinutes, setSelectedMinutes] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const res = signInWithRole(memberEmail, passcode);
    if (!res.ok) {
      setAuthError('Please enter your club email and valid member passcode.');
      return;
    }
    setSession(res.session);
    setAuthError('');
  };

  const handleLogout = () => {
    signOutSession();
    setSession(null);
  };

  const filteredMeetings =
    typeFilter === 'All'
      ? MEETINGS_DATA
      : MEETINGS_DATA.filter((m) => m.type === typeFilter);

  if (!session) {
    return (
      <div>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow eyebrow-yellow">MEMBERS-ONLY AREA</span>
            <h1>Club Meetings &amp; Minutes</h1>
            <p>
              Per the 20 November club decision, meeting minutes, attendee lists, and action-item
              owners are kept behind a member login and never appear on the public site.
            </p>
          </div>
        </section>

        <section className="section-band band-warm">
          <div className="container" style={{ maxWidth: '520px' }}>
            <div className="card">
              <span className="eyebrow">SIGN IN</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Member Sign In</h2>
              <p style={{ fontSize: '0.92rem' }}>
                Sign in with your Inspiria / InCompute member credentials to view decisions, action
                items, and approved minutes PDFs.
              </p>

              <div className="callout" style={{ marginBottom: '1.25rem' }}>
                <AlertCircle size={18} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Frontend Preview Passcode:</strong> Use any club email and passcode{' '}
                  <code>incompute2026</code> to test the members-only view.
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="member-email">
                    Member Email
                  </label>
                  <input
                    id="member-email"
                    type="email"
                    className="form-control"
                    placeholder="name@inspiria.edu.in"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="member-passcode">
                    Member Passcode
                  </label>
                  <input
                    id="member-passcode"
                    type="password"
                    className="form-control"
                    placeholder="Enter member passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                  />
                </div>

                {authError && (
                  <p style={{ color: 'var(--danger)', fontSize: '0.88rem', fontWeight: 600 }}>
                    {authError}
                  </p>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Lock size={16} /> Unlock Meetings
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span className="eyebrow eyebrow-yellow">MEMBERS-ONLY PORTAL</span>
            <h1>Meetings, Decisions &amp; Action Items</h1>
            <p>
              Minutes are issued by the Secretary after a Faculty Advisor has reviewed them.
            </p>
          </div>
          <button type="button" className="btn btn-outline-light" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="callout" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--grey-border)', borderLeft: '4px solid var(--blue)' }}>
            <Calendar size={20} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.2rem', color: 'var(--ink)' }}>
                Next Meeting: {NEXT_MEETING.displayDate}
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
                {NEXT_MEETING.note}
              </span>
            </div>
          </div>

          <div className="tabs" role="tablist" aria-label="Filter meetings by type">
            {['All', 'Executive Committee', 'Faculty & Executive Committee', 'General Body'].map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={typeFilter === type}
                className={`tab-btn ${typeFilter === type ? 'active' : ''}`}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredMeetings.map((meeting) => (
              <article key={meeting.id} className="card">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className="tag tag-blue">{meeting.type}</span>
                    {meeting.reviewedByAdvisor && (
                      <span className="tag tag-success">Advisor Reviewed</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedMinutes(meeting)}
                  >
                    <FileText size={15} /> View Minutes PDF
                  </button>
                </div>

                <h2 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>{meeting.title}</h2>
                <p style={{ marginBottom: '0.9rem' }}>{meeting.purpose}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.875rem', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={15} /> {meeting.displayDate}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={15} /> {meeting.time}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={15} /> {meeting.venue}
                  </span>
                </div>

                <div className="grid-2">
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.65rem' }}>Key Decisions</h3>
                    <ul className="bullet-list" style={{ fontSize: '0.92rem' }}>
                      {meeting.decisions.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.65rem' }}>Action Items</h3>
                    <div className="table-wrap" style={{ border: '1px solid var(--grey-border)', borderRadius: '8px' }}>
                      <table>
                        <thead>
                          <tr>
                            <th>Task</th>
                            <th>Owner</th>
                            <th>Due</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meeting.actionItems.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.task}</td>
                              <td>{item.owner}</td>
                              <td style={{ whiteSpace: 'nowrap' }}>{item.due}</td>
                              <td>
                                <span
                                  className={`tag ${
                                    item.status === 'Completed'
                                      ? 'tag-success'
                                      : item.status === 'In progress'
                                      ? 'tag-blue'
                                      : 'tag-yellow'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedMinutes && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="minutes-modal-title">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 id="minutes-modal-title" style={{ margin: 0 }}>
                {selectedMinutes.minutesPdfLabel}
              </h3>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setSelectedMinutes(null)}
              >
                Close
              </button>
            </div>
            <p style={{ fontSize: '0.9rem' }}>
              <strong>Meeting:</strong> {selectedMinutes.title} ({selectedMinutes.displayDate})
            </p>
            <div className="card-warm" style={{ marginBottom: '1rem', border: '1px solid var(--grey-border)' }}>
              <p style={{ marginBottom: '0.5rem', fontWeight: 600, color: 'var(--ink)' }}>
                Official Minutes Summary (Members Only)
              </p>
              <p style={{ fontSize: '0.9rem' }}>
                Venue: {selectedMinutes.venue} · Time: {selectedMinutes.time}
              </p>
              <ul className="bullet-list" style={{ fontSize: '0.9rem' }}>
                {selectedMinutes.decisions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '0.82rem', marginBottom: 0 }}>
                Signed in as {session.role} ({session.email}).
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => downloadMinutesSummary(selectedMinutes)}
              >
                <Download size={14} /> Download Minutes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

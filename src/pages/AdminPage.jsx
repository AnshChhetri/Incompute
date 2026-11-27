import React, { useState } from 'react';
import { Lock, LogOut, Download, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { EVENTS_DATA } from '../data/clubData';
import {
  getAuthSession,
  signInWithRole,
  signOutSession,
  getNotices,
  addNoticeDraft,
  updateNoticeStatus,
  getIdeas,
  updateIdeaStatus,
  getGalleryAlbums,
  toggleAlbumConsent,
  getRegistrations,
  exportRegistrationsCsv,
  getAuditLog,
} from '../lib/clubStore';

const ALLOWED_ROLES = ['Admin', 'Faculty Reviewer', 'Editor'];

export default function AdminPage() {
  const [session, setSession] = useState(() => getAuthSession());
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [notices, setNotices] = useState(() => getNotices());
  const [ideas, setIdeas] = useState(() => getIdeas());
  const [albums, setAlbums] = useState(() => getGalleryAlbums());
  const [registrations] = useState(() => getRegistrations());
  const [auditLog, setAuditLog] = useState(() => getAuditLog());

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Event',
    body: '',
    expiryDate: '2027-03-01',
    pinned: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const res = signInWithRole(email, passcode);
    if (!res.ok) {
      setAuthError(res.error);
      return;
    }
    if (!ALLOWED_ROLES.includes(res.session.role)) {
      setAuthError('Access denied: Admin, Faculty Reviewer, or Editor role required.');
      return;
    }
    setSession(res.session);
    setAuthError('');
  };

  const handleLogout = () => {
    signOutSession();
    setSession(null);
  };

  const canApprove = session && (session.role === 'Admin' || session.role === 'Faculty Reviewer');

  const refreshAudit = () => setAuditLog(getAuditLog());

  const handleNoticeCreate = (e) => {
    e.preventDefault();
    addNoticeDraft(newNotice, session.label);
    setNotices(getNotices());
    refreshAudit();
    setNewNotice({ title: '', category: 'Event', body: '', expiryDate: '2027-03-01', pinned: false });
  };

  const handleNoticeModeration = (id, status) => {
    setNotices(updateNoticeStatus(id, status, session.label));
    refreshAudit();
  };

  const handleIdeaStatus = (id, status) => {
    setIdeas(updateIdeaStatus(id, status, session.label));
    refreshAudit();
  };

  const handleConsentToggle = (id, nextState) => {
    setAlbums(toggleAlbumConsent(id, nextState, session.label));
    refreshAudit();
  };

  const heldCount = EVENTS_DATA.filter((e) => e.status === 'Held').length;
  const plannedCount = EVENTS_DATA.filter((e) => e.status !== 'Held').length;

  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    return (
      <div>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow eyebrow-yellow">RESTRICTED AREA</span>
            <h1>Officer &amp; Faculty Admin</h1>
            <p>
              Role-protected content management for Chair, Secretary, Program/Publicity Editors,
              and Faculty Advisors.
            </p>
          </div>
        </section>

        <section className="section-band band-warm">
          <div className="container" style={{ maxWidth: '520px' }}>
            <div className="card">
              <span className="eyebrow">AUTHENTICATION</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Sign In</h2>
              <p style={{ fontSize: '0.9rem' }}>
                Demo accounts (passcode <code>incompute2026</code>):
                <br />
                <code>admin@inspiria.edu.in</code> (Chair/Secretary)
                <br />
                <code>faculty@inspiria.edu.in</code> (Faculty Reviewer)
                <br />
                <code>editor@inspiria.edu.in</code> (Committee Editor)
              </p>

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-email">Role Email</label>
                  <input
                    id="admin-email"
                    type="email"
                    className="form-control"
                    placeholder="admin@inspiria.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-pass">Passcode</label>
                  <input
                    id="admin-pass"
                    type="password"
                    className="form-control"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                  />
                </div>
                {authError && (
                  <p style={{ color: 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>
                    {authError}
                  </p>
                )}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Lock size={16} /> Sign In to Dashboard
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
            <span className="eyebrow eyebrow-yellow">{session.role.toUpperCase()} · {session.label.toUpperCase()}</span>
            <h1>InCompute Admin Dashboard</h1>
            <p>
              Manage notice drafts, idea moderation, gallery consent, CSV registration exports, and
              the audit log.
            </p>
          </div>
          <button type="button" className="btn btn-outline-light" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </section>

      {/* Charter Event Counter & Summary */}
      <section className="section-band band-white">
        <div className="container">
          <div className="grid-4">
            <div className="stat-card">
              <div className="stat-value">{heldCount}</div>
              <div className="stat-label">Events Held</div>
              <p className="stat-sub">Charter min: 3 / semester</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">{plannedCount}</div>
              <div className="stat-label">Planned / Proposed</div>
              <p className="stat-sub">Charter min: 6 / year</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">{registrations.length}</div>
              <div className="stat-label">Backup Sign-ups</div>
              <p className="stat-sub">Stored for CSV export</p>
            </div>
            <div className="stat-card">
              <div className="stat-value">{notices.filter((n) => n.status === 'Pending').length}</div>
              <div className="stat-label">Pending Notices</div>
              <p className="stat-sub">Awaiting advisor approval</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notices Queue & Draft Composer */}
      <section className="section-band band-warm">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="card">
              <span className="eyebrow">DRAFT NOTICE</span>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Create Notice Draft</h2>
              <form onSubmit={handleNoticeCreate}>
                <div className="form-group">
                  <label className="form-label" htmlFor="not-title">Title</label>
                  <input
                    id="not-title"
                    type="text"
                    className="form-control"
                    required
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="not-cat">Category</label>
                    <select
                      id="not-cat"
                      className="form-control"
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                    >
                      <option>Event</option>
                      <option>Deadline</option>
                      <option>Result</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="not-exp">Expiry Date</label>
                    <input
                      id="not-exp"
                      type="date"
                      className="form-control"
                      value={newNotice.expiryDate}
                      onChange={(e) => setNewNotice({ ...newNotice, expiryDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="not-body">Body</label>
                  <textarea
                    id="not-body"
                    rows="3"
                    className="form-control"
                    required
                    value={newNotice.body}
                    onChange={(e) => setNewNotice({ ...newNotice, body: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  <Plus size={16} /> Submit Draft for Review
                </button>
              </form>
            </div>

            <div className="card">
              <span className="eyebrow">APPROVAL QUEUE</span>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Notices Review</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {notices.map((n) => (
                  <div key={n.id} className="card-warm" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>{n.title}</strong>
                      <span className={`tag ${n.status === 'Approved' ? 'tag-success' : n.status === 'Pending' ? 'tag-yellow' : ''}`}>
                        {n.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', marginBottom: '0.6rem' }}>
                      {n.category} · Expires {n.expiryDate}
                    </p>
                    {canApprove && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleNoticeModeration(n.id, 'Approved')}
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => handleNoticeModeration(n.id, 'Rejected')}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideas Moderation & Gallery Consent */}
      <section className="section-band band-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="card">
              <span className="eyebrow">IDEAS WALL MODERATION</span>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Event Ideas</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {ideas.map((idea) => (
                  <div key={idea.id} className="card-warm" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>{idea.title}</strong>
                      <span className="tag tag-blue">{idea.votes} votes</span>
                    </div>
                    <select
                      aria-label={`Status for ${idea.title}`}
                      className="form-control"
                      value={idea.status}
                      onChange={(e) => handleIdeaStatus(idea.id, e.target.value)}
                    >
                      <option>New</option>
                      <option>Under review</option>
                      <option>Planned</option>
                      <option>Not now</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <span className="eyebrow">MEDIA CONSENT</span>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Gallery Albums</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {albums.map((alb) => (
                  <div key={alb.id} className="card-warm" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '0.95rem' }}>{alb.eventTitle}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{alb.date}</span>
                    </div>
                    <button
                      type="button"
                      className={`btn btn-sm ${alb.consentRecorded ? 'btn-secondary' : 'btn-outline'}`}
                      onClick={() => handleConsentToggle(alb.id, !alb.consentRecorded)}
                    >
                      {alb.consentRecorded ? 'Consent Verified' : 'Quarantined'}
                    </button>
                  </div>
                ))}
              </div>

              <span className="eyebrow">BACKUP REGISTRATIONS</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
                  {registrations.length} local backup records
                </span>
                <button type="button" className="btn btn-primary btn-sm" onClick={exportRegistrationsCsv}>
                  <Download size={15} /> Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Log */}
      <section className="section-band band-warm">
        <div className="container">
          <span className="eyebrow">COMPLIANCE</span>
          <h2 style={{ marginBottom: '1.25rem' }}>Audit Log</h2>
          <div className="card table-wrap" style={{ padding: 0, overflow: 'hidden' }}>
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{entry.timestamp}</td>
                    <td style={{ fontWeight: 600 }}>{entry.actor}</td>
                    <td><span className="tag tag-blue">{entry.action}</span></td>
                    <td>{entry.entity}</td>
                    <td>{entry.summary}</td>
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

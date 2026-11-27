import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CLUB_INFO, EVENTS_DATA } from '../data/clubData';
import { addRegistration, getRegistrationsForEvent } from '../lib/clubStore';

export default function EventDetailPage() {
  const { id } = useParams();
  const event = EVENTS_DATA.find((e) => e.id === id);

  const [registeredCount, setRegisteredCount] = useState(() =>
    event ? getRegistrationsForEvent(event.id).length : 0
  );
  const seatsLeft = event ? Math.max(0, event.seatsLeft - registeredCount) : 0;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseYear: 'BCA - Year 1',
    teamMembers: '',
  });
  const [feedback, setFeedback] = useState(null);

  if (!event) {
    return (
      <section className="section-band band-white">
        <div className="container">
          <div className="card">
            <h2>Event not found</h2>
            <p>The event you are looking for is not on the current calendar.</p>
            <Link to="/events" className="btn btn-primary">
              Back to Events
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const handleBackupSubmit = (e) => {
    e.preventDefault();
    const res = addRegistration({
      eventId: event.id,
      eventTitle: event.title,
      name: formData.name,
      email: formData.email,
      courseYear: formData.courseYear,
      teamMembers: formData.teamMembers,
      seatsTotal: event.seatsLeft,
    });

    if (!res.ok) {
      setFeedback({ type: 'error', message: res.error });
      return;
    }

    setRegisteredCount((c) => c + 1);
    setFeedback({
      type: 'success',
      message:
        res.record.state === 'Registered'
          ? 'Backup registration saved! Please also complete registration on the official form if required.'
          : 'Seats are full — you have been added to the waitlist.',
    });
    setFormData({ name: '', email: '', courseYear: 'BCA - Year 1', teamMembers: '' });
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <Link
            to="/events"
            style={{ color: 'var(--yellow)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Back to Event Calendar
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="tag" style={{ background: 'rgba(255,255,255,0.14)', color: '#FFF', borderColor: 'transparent' }}>
              {event.category}
            </span>
            <span className="tag" style={{ background: 'var(--yellow)', color: 'var(--ink)', borderColor: 'transparent' }}>
              {event.status}
            </span>
          </div>
          <h1>{event.title}</h1>
          <p>{event.summary}</p>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <span className="eyebrow">OVERVIEW</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Event Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                  <Calendar size={18} style={{ color: 'var(--blue)' }} />
                  <span><strong>Date:</strong> {event.displayDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                  <MapPin size={18} style={{ color: 'var(--blue)' }} />
                  <span><strong>Venue:</strong> {event.venue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                  <Users size={18} style={{ color: 'var(--blue)' }} />
                  <span><strong>Audience:</strong> {event.audience}</span>
                </div>
              </div>

              {event.status !== 'Held' && (
                <div className="callout" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--ink)' }}>
                      {seatsLeft > 0 ? `${seatsLeft} of ${event.seatsTotal} seats left` : 'Waitlist open (0 seats left)'}
                    </strong>
                    <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
                      Registration deadline: {event.deadline}
                    </span>
                  </div>
                </div>
              )}

              <a
                href={CLUB_INFO.googleFormUrl}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Register via Google Form <ExternalLink size={16} />
              </a>
              <p className="form-hint">
                Per the club charter, official event registration goes through the Inspiria portal.
              </p>
            </div>

            <div className="card">
              <span className="eyebrow">ON-SITE BACKUP</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Backup Registration</h2>
              <p style={{ fontSize: '0.9rem' }}>
                Use this form as a backup if the official facility link is unavailable. Duplicate
                sign-ups are automatically prevented.
              </p>

              {event.status === 'Held' ? (
                <div className="callout">
                  <span>This event has already been held. Check the Gallery for photos.</span>
                </div>
              ) : (
                <form onSubmit={handleBackupSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-name">Full Name</label>
                    <input
                      id="reg-name"
                      type="text"
                      className="form-control"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-email">Email Address</label>
                    <input
                      id="reg-email"
                      type="email"
                      className="form-control"
                      placeholder="student@inspiria.edu.in"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-course">Course &amp; Year</label>
                    <select
                      id="reg-course"
                      className="form-control"
                      value={formData.courseYear}
                      onChange={(e) => setFormData({ ...formData, courseYear: e.target.value })}
                    >
                      <option>BCA - Year 1</option>
                      <option>BCA - Year 2</option>
                      <option>BCA - Year 3</option>
                      <option>BCA - Year 4</option>
                      <option>BSc Data Science - Year 1</option>
                      <option>BSc Data Science - Year 2</option>
                      <option>BSc Data Science - Year 3</option>
                      <option>BSc Data Science - Year 4</option>
                      <option>AI &amp; ML</option>
                      <option>Cyber Security</option>
                      <option>School Student (Class 11 / 12)</option>
                    </select>
                  </div>

                  {event.needsTeam && (
                    <div className="form-group">
                      <label className="form-label" htmlFor="reg-team">Team Members (if applicable)</label>
                      <input
                        id="reg-team"
                        type="text"
                        className="form-control"
                        placeholder="Names of teammates (optional)"
                        value={formData.teamMembers}
                        onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                      />
                    </div>
                  )}

                  {feedback && (
                    <div
                      className="callout"
                      style={{
                        borderLeftColor: feedback.type === 'error' ? 'var(--danger)' : 'var(--success)',
                        marginBottom: '1rem',
                      }}
                    >
                      {feedback.type === 'error' ? (
                        <AlertTriangle size={18} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                      ) : (
                        <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      )}
                      <span style={{ fontSize: '0.88rem' }}>{feedback.message}</span>
                    </div>
                  )}

                  <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
                    {seatsLeft > 0 ? 'Submit Backup Registration' : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

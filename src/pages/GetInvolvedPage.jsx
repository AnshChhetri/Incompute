import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, Sparkles, UserPlus, Calendar, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { CLUB_INFO, EVENTS_DATA } from '../data/clubData';
import {
  getPublicIdeas,
  addIdeaSubmission,
  voteIdea,
  addClubApplication,
} from '../lib/clubStore';

const INTEREST_OPTIONS = ['Technical', 'Management', 'Design', 'Content', 'Publicity'];

export default function GetInvolvedPage() {
  const [ideas, setIdeas] = useState(() => getPublicIdeas());
  const [votedIds, setVotedIds] = useState([]);

  const [ideaForm, setIdeaForm] = useState({
    name: '',
    role: 'Student',
    courseYear: 'BCA - Year 1',
    title: '',
    type: 'Technical',
    description: '',
    audience: 'All Computing Students',
    preferredMonth: 'February 2027',
    wantsToHelp: true,
  });
  const [ideaFeedback, setIdeaFeedback] = useState(null);

  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    courseYear: 'BCA - Year 1',
    interests: ['Technical'],
    hoursPerWeek: '2–3 hours / week',
    note: '',
    consentRecorded: false,
  });
  const [joinFeedback, setJoinFeedback] = useState(null);

  const upcomingEvents = EVENTS_DATA.filter((e) => e.status !== 'Held').slice(0, 3);

  const handleVote = (id) => {
    if (votedIds.includes(id)) return;
    setVotedIds((prev) => [...prev, id]);
    voteIdea(id);
    setIdeas(getPublicIdeas());
  };

  const handleIdeaSubmit = (e) => {
    e.preventDefault();
    const created = addIdeaSubmission(ideaForm);
    setIdeaFeedback({
      type: 'success',
      message: `Thanks! "${created.title}" has been logged with status "New" for Program Committee & Faculty Advisor review.`,
    });
    setIdeaForm({
      name: '',
      role: 'Student',
      courseYear: 'BCA - Year 1',
      title: '',
      type: 'Technical',
      description: '',
      audience: 'All Computing Students',
      preferredMonth: 'February 2027',
      wantsToHelp: true,
    });
  };

  const toggleInterest = (interest) => {
    setJoinForm((prev) => {
      const exists = prev.interests.includes(interest);
      const next = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: next };
    });
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (joinForm.interests.length === 0) {
      setJoinFeedback({ type: 'error', message: 'Please pick at least one interest area.' });
      return;
    }
    if (!joinForm.consentRecorded) {
      setJoinFeedback({ type: 'error', message: 'Please confirm consent for club communication.' });
      return;
    }
    const res = addClubApplication(joinForm);
    if (!res.ok) {
      setJoinFeedback({ type: 'error', message: res.error });
      return;
    }
    setJoinFeedback({
      type: 'success',
      message: `Welcome! Your application for ${res.record.courseYear} has been recorded for the InCompute team.`,
    });
    setJoinForm({
      name: '',
      email: '',
      courseYear: 'BCA - Year 1',
      interests: ['Technical'],
      hoursPerWeek: '2–3 hours / week',
      note: '',
      consentRecorded: false,
    });
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">GET INVOLVED</span>
          <h1>Bring one idea, join the club, or register</h1>
          <p>
            No student ideas have arrived yet—so your suggestion is a priority. Propose a workshop,
            join a committee, or pick an upcoming event.
          </p>
        </div>
      </section>

      {/* Suggest an Event + Join the Club */}
      <section className="section-band band-warm">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* Suggest an Event ("Bring one idea") */}
            <section className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="eyebrow" style={{ marginBottom: 0 }}>BRING ONE IDEA</span>
                <Sparkles size={18} style={{ color: 'var(--blue)' }} />
              </div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Suggest an event</h2>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Approved ideas appear on the Public Ideas Wall for everyone to vote on.
              </p>

              <form onSubmit={handleIdeaSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="idea-name">Your Name</label>
                    <input
                      id="idea-name"
                      type="text"
                      className="form-control"
                      required
                      value={ideaForm.name}
                      onChange={(e) => setIdeaForm({ ...ideaForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="idea-role">Role</label>
                    <select
                      id="idea-role"
                      className="form-control"
                      value={ideaForm.role}
                      onChange={(e) => setIdeaForm({ ...ideaForm, role: e.target.value })}
                    >
                      <option>Student</option>
                      <option>Faculty</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="idea-course">Year &amp; Course</label>
                    <select
                      id="idea-course"
                      className="form-control"
                      value={ideaForm.courseYear}
                      onChange={(e) => setIdeaForm({ ...ideaForm, courseYear: e.target.value })}
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
                      <option>Faculty / Mentor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="idea-type">Event Type</label>
                    <select
                      id="idea-type"
                      className="form-control"
                      value={ideaForm.type}
                      onChange={(e) => setIdeaForm({ ...ideaForm, type: e.target.value })}
                    >
                      <option>Technical</option>
                      <option>Web Development</option>
                      <option>Data Analytics</option>
                      <option>AI &amp; ML</option>
                      <option>Gaming/Testing</option>
                      <option>Alumni Talk</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="idea-title">Event Title</label>
                  <input
                    id="idea-title"
                    type="text"
                    className="form-control"
                    placeholder="e.g., Intro to Docker & Linux Labs"
                    required
                    value={ideaForm.title}
                    onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="idea-desc">Short Description</label>
                  <textarea
                    id="idea-desc"
                    rows="3"
                    className="form-control"
                    placeholder="What will students learn or build?"
                    required
                    value={ideaForm.description}
                    onChange={(e) => setIdeaForm({ ...ideaForm, description: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="idea-aud">Expected Audience</label>
                    <input
                      id="idea-aud"
                      type="text"
                      className="form-control"
                      value={ideaForm.audience}
                      onChange={(e) => setIdeaForm({ ...ideaForm, audience: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="idea-month">Preferred Month</label>
                    <input
                      id="idea-month"
                      type="text"
                      className="form-control"
                      value={ideaForm.preferredMonth}
                      onChange={(e) => setIdeaForm({ ...ideaForm, preferredMonth: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={ideaForm.wantsToHelp}
                      onChange={(e) => setIdeaForm({ ...ideaForm, wantsToHelp: e.target.checked })}
                    />
                    <span>I want to help run or volunteer for this event</span>
                  </label>
                </div>

                {ideaFeedback && (
                  <div className="callout" style={{ borderLeftColor: 'var(--success)', marginBottom: '1rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem' }}>{ideaFeedback.message}</span>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                  <button type="submit" className="btn btn-primary">
                    Submit Idea
                  </button>
                  <a
                    href={CLUB_INFO.googleFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Official Google Form <ExternalLink size={14} />
                  </a>
                </div>
              </form>
            </section>

            {/* Join the Club */}
            <section className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="eyebrow" style={{ marginBottom: 0 }}>MEMBERSHIP</span>
                <UserPlus size={18} style={{ color: 'var(--blue)' }} />
              </div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Join InCompute</h2>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Open to students across BCA, BSc Data Science, AI &amp; ML, and Cyber Security
                (Years 1–4).
              </p>

              <form onSubmit={handleJoinSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="join-name">Full Name</label>
                  <input
                    id="join-name"
                    type="text"
                    className="form-control"
                    required
                    value={joinForm.name}
                    onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="join-email">Inspiria Email</label>
                    <input
                      id="join-email"
                      type="email"
                      className="form-control"
                      placeholder="name@inspiria.edu.in"
                      required
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="join-course">Course &amp; Year</label>
                    <select
                      id="join-course"
                      className="form-control"
                      value={joinForm.courseYear}
                      onChange={(e) => setJoinForm({ ...joinForm, courseYear: e.target.value })}
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
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <span className="form-label">Interests</span>
                  <div className="checkbox-grid">
                    {INTEREST_OPTIONS.map((opt) => (
                      <label key={opt} className="checkbox-pill">
                        <input
                          type="checkbox"
                          checked={joinForm.interests.includes(opt)}
                          onChange={() => toggleInterest(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-hours">Hours available each week</label>
                  <select
                    id="join-hours"
                    className="form-control"
                    value={joinForm.hoursPerWeek}
                    onChange={(e) => setJoinForm({ ...joinForm, hoursPerWeek: e.target.value })}
                  >
                    <option>1–2 hours / week</option>
                    <option>2–3 hours / week</option>
                    <option>4–5 hours / week</option>
                    <option>5+ hours / week (Event weeks)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={joinForm.consentRecorded}
                      onChange={(e) => setJoinForm({ ...joinForm, consentRecorded: e.target.checked })}
                    />
                    <span>I consent to InCompute using my contact details strictly for club work.</span>
                  </label>
                </div>

                {joinFeedback && (
                  <div
                    className="callout"
                    style={{
                      borderLeftColor: joinFeedback.type === 'error' ? 'var(--danger)' : 'var(--success)',
                      marginBottom: '1rem',
                    }}
                  >
                    {joinFeedback.type === 'error' ? (
                      <AlertTriangle size={18} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                    ) : (
                      <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: '0.88rem' }}>{joinFeedback.message}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
                  Apply to Join Club
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>

      {/* Public Ideas Wall & Quick Event Registration */}
      <section className="section-band band-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <section>
              <span className="eyebrow">COMMUNITY VOTING</span>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>Public Ideas Wall</h2>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                Approved and under-review ideas appear here. Vote for the sessions you want next.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {ideas.map((idea) => {
                  const hasVoted = votedIds.includes(idea.id);
                  return (
                    <article key={idea.id} className="card-warm">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          <span className="tag tag-blue">{idea.type}</span>
                          <span
                            className={`tag ${
                              idea.status === 'Planned'
                                ? 'tag-success'
                                : idea.status === 'Under review'
                                ? 'tag-yellow'
                                : ''
                            }`}
                          >
                            {idea.status}
                          </span>
                        </div>

                        <button
                          type="button"
                          className={`btn btn-sm ${hasVoted ? 'btn-secondary' : 'btn-outline'}`}
                          onClick={() => handleVote(idea.id)}
                          disabled={hasVoted}
                          aria-label={`Vote for ${idea.title}`}
                        >
                          <ThumbsUp size={14} /> {idea.votes}
                        </button>
                      </div>

                      <h3 style={{ marginBottom: '0.35rem' }}>{idea.title}</h3>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.6rem' }}>{idea.description}</p>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                        <span>Preferred: {idea.preferredMonth}</span> · <span>Audience: {idea.audience}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="eyebrow" style={{ marginBottom: 0 }}>QUICK REGISTRATION</span>
                <Calendar size={18} style={{ color: 'var(--blue)' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Register for an event</h2>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Pick an upcoming event to open its details, seat count, official Inspiria link, and
                backup sign-up form.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="card-warm"
                    style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
                  >
                    <div>
                      <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '0.95rem' }}>
                        {evt.title}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                        {evt.displayDate} · {evt.seatsLeft} seats left
                      </span>
                    </div>
                    <Link to={`/events/${evt.id}`} className="btn btn-secondary btn-sm">
                      Register
                    </Link>
                  </div>
                ))}
              </div>

              <Link to="/events" className="btn btn-outline" style={{ width: '100%' }}>
                Browse Full Event Calendar
              </Link>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

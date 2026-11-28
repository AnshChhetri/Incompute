import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { CLUB_INFO, EVENTS_DATA } from '../data/clubData';
import { getPublicIdeas, voteIdea } from '../lib/clubStore';

export default function GetInvolvedPage() {
  const [ideas, setIdeas] = useState(() => getPublicIdeas());
  const [votedIds, setVotedIds] = useState([]);

  const upcomingEvents = EVENTS_DATA.filter((e) => e.status !== 'Held').slice(0, 3);

  const handleVote = (id) => {
    if (votedIds.includes(id)) return;
    setVotedIds((prev) => [...prev, id]);
    voteIdea(id);
    setIdeas(getPublicIdeas());
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">GET INVOLVED</span>
          <h1>Bring one idea or register</h1>
          <p>
            No student ideas have arrived yet—so your suggestion is a priority. Propose a workshop
            via our Google Form or pick an upcoming event.
          </p>
        </div>
      </section>

      {/* Suggest an Event */}
      <section className="section-band band-warm">
        <div className="container">
          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="eyebrow" style={{ marginBottom: 0 }}>BRING ONE IDEA</span>
              <Sparkles size={18} style={{ color: 'var(--blue)' }} />
            </div>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Suggest an event</h2>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Have a workshop, talk, or coding challenge in mind? Submit your idea using our
              official Google Form. Approved ideas appear on the Public Ideas Wall for everyone to
              vote on.
            </p>

            <a
              href={CLUB_INFO.googleFormUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Submit via Google Form <ExternalLink size={14} />
            </a>
          </section>
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

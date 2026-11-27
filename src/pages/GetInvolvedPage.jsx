import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';
import { getIdeas, voteIdea } from '../lib/clubStore';

export default function GetInvolvedPage() {
  const [ideas, setIdeas] = useState(() => getIdeas());
  const [votedIds, setVotedIds] = useState([]);

  const handleVote = (id) => {
    if (votedIds.includes(id)) return;
    setVotedIds((prev) => [...prev, id]);
    setIdeas(voteIdea(id));
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">GET INVOLVED</span>
          <h1>Bring one idea</h1>
          <p>
            Your suggestion can become the next workshop, hackathon, or coding challenge on the
            InCompute semester calendar.
          </p>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <section className="card">
              <span className="eyebrow">PROPOSE A SESSION</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Submit your idea</h2>
              <p style={{ fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                Tell us what you want to learn or build. Approved ideas move onto the Public Ideas
                Wall for everyone to vote on.
              </p>
              <a href={CLUB_INFO.googleFormUrl} className="btn btn-primary">
                Submit Idea via Google Form
              </a>
            </section>

            <section>
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="eyebrow">COMMUNITY VOTING</span>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Public Ideas Wall</h2>
                <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                  Vote for the sessions you want to see next. Statuses: New, Under review, Planned, Not now.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {ideas.map((idea) => {
                  const hasVoted = votedIds.includes(idea.id);
                  return (
                    <article key={idea.id} className="card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          <span className="tag tag-blue">{idea.type}</span>
                          <span
                            className={`tag ${
                              idea.status === 'Planned'
                                ? 'tag-success'
                                : idea.status === 'New'
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
          </div>
        </div>
      </section>
    </div>
  );
}

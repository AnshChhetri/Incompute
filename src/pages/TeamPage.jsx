import React from 'react';
import { TEAM_DATA } from '../data/clubData';

const GROUPS = ['Faculty', 'Executive Committee', 'Committees', 'Year Advisors'];

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function MemberAvatar({ member }) {
  const [imgFailed, setImgFailed] = React.useState(false);

  if (member.photoUrl && !imgFailed) {
    return (
      <img
        src={member.photoUrl}
        alt={member.name}
        onError={() => setImgFailed(true)}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '10px',
          objectFit: 'cover',
          objectPosition: 'top center',
          flexShrink: 0,
          border: '2px solid var(--grey-border)',
        }}
      />
    );
  }

  return (
    <div
      aria-label={`${member.name} avatar`}
      style={{
        width: '64px',
        height: '64px',
        borderRadius: '10px',
        backgroundColor: '#02127A',
        color: '#FFD306',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '1.1rem',
        flexShrink: 0,
      }}
    >
      {getInitials(member.name)}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">CLUB ROSTER</span>
          <h1>Team &amp; Advisors</h1>
          <p>
            Faculty mentors, Executive Committee office-bearers, committee leads, and Year Advisors
            guiding InCompute across Inspiria Knowledge Campus.
          </p>
        </div>
      </section>

      <section className="section-band band-white">
        <div className="container">
          <div className="callout" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: '0.92rem', color: 'var(--ink-muted)' }}>
              <strong style={{ color: 'var(--ink)' }}>Charter Privacy Note:</strong> Individual
              email addresses and phone numbers are never published on public profiles. The Principal
              serves as an honoured guest, not a club team member.
            </div>
          </div>
        </div>
      </section>

      {GROUPS.map((group, idx) => {
        const members = TEAM_DATA.filter((m) => m.group === group);
        const bandClass = idx % 2 === 0 ? 'band-warm' : 'band-white';

        return (
          <section key={group} className={`section-band ${bandClass}`}>
            <div className="container">
              <span className="eyebrow">{group.toUpperCase()}</span>
              <h2 style={{ marginBottom: '2rem' }}>{group}</h2>

              <div className="grid-3">
                {members.map((member) => (
                  <article
                    key={member.id}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <MemberAvatar member={member} />
                        <div>
                          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.15rem' }}>{member.name}</h3>
                          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--blue)' }}>
                            {member.role}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', marginBottom: '0.65rem' }}>
                        {member.course}
                      </div>

                      <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{member.bio}</p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: member.github || member.linkedin ? '0.85rem' : 0 }}>
                        {member.skills.map((skill) => (
                          <span key={skill} className="tag">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {(member.github || member.linkedin) && (
                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600 }}>
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noreferrer">
                              GitHub →
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noreferrer">
                              LinkedIn →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

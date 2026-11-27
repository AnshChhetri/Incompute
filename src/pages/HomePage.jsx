import React from 'react';
import { Link } from 'react-router-dom';
import { CLUB_INFO, EVENTS_DATA } from '../data/clubData';
import {
  getNextUpcomingEvent,
  getEventCountdownLabel,
  getPublicNotices,
  isNoticeNew,
  getGalleryAlbums,
} from '../lib/clubStore';

const HIGHLIGHTS = [
  { value: '6+', label: 'Events per year', sub: 'Charter minimum across both semesters' },
  { value: '4', label: 'Computing streams', sub: 'BCA, Data Science, AI & ML, Cyber Security' },
  { value: '100%', label: 'Student-led', sub: 'Guided by Faculty Advisors & HOD' },
  { value: '4', label: 'Observance days', sub: 'Marked every year on the club calendar' },
];

const DISCIPLINE_PILLS = [
  'BCA',
  'BSc Data Science',
  'AI & ML',
  'Cyber Security',
  'School Outreach',
];

const WHY_JOIN = [
  {
    title: 'Hands-on technical workshops',
    text: 'Practical sessions in Git, web development, data analytics, and security labs.',
  },
  {
    title: 'Peer-led hackathons & challenges',
    text: 'In-house coding sprints and inter-school events hosted in campus computer labs.',
  },
  {
    title: 'Official Inspiria certification',
    text: 'Verified participation and volunteer certificates issued after attendance checks.',
  },
  {
    title: 'Cross-year mentorship',
    text: 'Third- and fourth-year advisors supporting first- and second-year learners.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Charter transparency',
    text: 'Every notice, event, and gallery album follows clear Faculty Advisor approval rules.',
    highlight: false,
  },
  {
    title: 'Bring one idea',
    text: 'Any student can propose a workshop or challenge and help shape the semester calendar.',
    highlight: false,
  },
  {
    title: 'Official registration',
    text: 'Events link directly to Inspiria’s official registration facility with on-site backup.',
    highlight: false,
  },
  {
    title: 'Consent-first gallery',
    text: 'Photos are published only in event albums where student consent has been recorded.',
    highlight: false,
  },
  {
    title: 'School outreach',
    text: 'Annual workshops and hackathons welcoming Classes 11 & 12 students from Siliguri.',
    highlight: true,
  },
];

const TRACKS = [
  'Web Development',
  'Data Analytics',
  'AI & ML',
  'Cyber Security',
  'UI/UX & Design',
  'Testing & QA',
];

const STUDENT_VOICES = [
  {
    quote:
      '“Software Freedom Day gave our first-year batch a practical introduction to Git and open-source workflows.”',
    author: 'BCA · Year 2 Member',
  },
  {
    quote:
      '“Having one official calendar and registration link makes it easy to plan around university exams.”',
    author: 'BSc Data Science · Year 3',
  },
  {
    quote:
      '“Bringing an idea to the Program Committee actually turns into a real lab session for everyone.”',
    author: 'AI & ML · Program Volunteer',
  },
];

export default function HomePage() {
  const nextEvent = getNextUpcomingEvent();
  const countdown = nextEvent ? getEventCountdownLabel(nextEvent.date) : null;
  const featuredEvents = EVENTS_DATA.filter((e) => e.status !== 'Held').slice(0, 3);
  const semesterTimeline = EVENTS_DATA.filter((e) => e.status !== 'Held').slice(0, 5);
  const latestNotices = getPublicNotices().slice(0, 3);
  const galleryStrip = getGalleryAlbums()
    .filter((a) => a.consentRecorded)
    .flatMap((a) => a.photos.map((p) => ({ ...p, eventTitle: a.eventTitle })))
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-band band-navy">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '40px' }}>
            <div>
              <span className="eyebrow eyebrow-yellow">INSPIRIA KNOWLEDGE CAMPUS · INCOMPUTE</span>
              <h1 style={{ marginBottom: '1.25rem' }}>
                Take your computing skills to a professional level
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.86)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                The official student computing club for BCA, Data Science, AI &amp; ML, and Cyber
                Security — built around workshops, hackathons, and peer mentorship.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                <Link to="/events" className="btn btn-primary">
                  Explore Events
                </Link>
                <Link to="/get-involved" className="btn btn-outline-light">
                  Get Involved
                </Link>
              </div>
            </div>

            {nextEvent ? (
              <div
                style={{
                  backgroundColor: '#0230C8',
                  borderRadius: '8px',
                  padding: '2.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span className="eyebrow eyebrow-yellow" style={{ marginBottom: 0 }}>
                    NEXT UPCOMING EVENT
                  </span>
                  <span className="tag tag-yellow" style={{ borderColor: 'transparent' }}>
                    {countdown}
                  </span>
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', marginBottom: '0.65rem' }}>
                  {nextEvent.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  {nextEvent.summary}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    paddingTop: '1rem',
                    fontSize: '0.875rem',
                    color: '#FFFFFF',
                  }}
                >
                  <span>{nextEvent.displayDate} · {nextEvent.venue}</span>
                  <Link
                    to={`/events/${nextEvent.id}`}
                    style={{ color: '#FFD306', fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#0230C8',
                  borderRadius: '8px',
                  padding: '2.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                }}
              >
                <span className="eyebrow eyebrow-yellow">EVENT CALENDAR</span>
                <h3 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  No upcoming events published yet
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '1.5rem' }}>
                  Have a workshop or coding challenge in mind? Propose it for the semester calendar.
                </p>
                <Link to="/get-involved" className="btn btn-primary btn-sm">
                  Bring one idea
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 1: Club Highlights (White) */}
      <section className="section-band band-white">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Club highlights</h2>

          <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="stat-card">
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
                <p className="stat-sub">{item.sub}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
            }}
          >
            {DISCIPLINE_PILLS.map((label) => (
              <div
                key={label}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--grey-border)',
                  borderRadius: '8px',
                  padding: '0.9rem 1rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--ink-muted)',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Upcoming Events & Semester Timeline (Warm) */}
      <section className="section-band band-warm">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">OUR EVENTS</span>
              <h2>Upcoming workshops &amp; sessions</h2>
            </div>
            <Link to="/events" className="btn btn-outline btn-sm">
              Full Calendar
            </Link>
          </div>

          <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
            {featuredEvents.map((evt) => (
              <article
                key={evt.id}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
              >
                <div
                  style={{
                    height: '132px',
                    backgroundColor: '#02127A',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <span className="eyebrow eyebrow-yellow" style={{ marginBottom: 0 }}>
                    {evt.category}
                  </span>
                  <span style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 500 }}>
                    {evt.venue}
                  </span>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: '0.6rem' }}>{evt.title}</h3>
                    <p style={{ fontSize: '0.9375rem', marginBottom: '1.5rem' }}>{evt.summary}</p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--grey-border)',
                    }}
                  >
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-muted)' }}>
                      {evt.displayDate}
                    </span>
                    <Link to={`/events/${evt.id}`} className="btn btn-secondary btn-sm">
                      View Event
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Semester Timeline */}
          <div className="card">
            <span className="eyebrow">SEMESTER TIMELINE</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {semesterTimeline.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid var(--grey-border)',
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--ink)' }}>{evt.title}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginLeft: '0.65rem' }}>
                      {evt.displayDate}
                    </span>
                  </div>
                  <Link to={`/events/${evt.id}`} style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Latest Notices & About Us (White) */}
      <section className="section-band band-white">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">NOTICE BOARD</span>
              <h2>Latest approved notices</h2>
            </div>
            <Link to="/notices" className="btn btn-outline btn-sm">
              All Notices
            </Link>
          </div>

          <div className="grid-3" style={{ marginBottom: '4rem' }}>
            {latestNotices.map((notice) => (
              <article
                key={notice.id}
                className="card"
                style={notice.pinned ? { border: '2px solid var(--blue)' } : undefined}
              >
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  {notice.pinned && <span className="tag tag-yellow">Pinned</span>}
                  <span className="tag tag-blue">{notice.category}</span>
                  {isNoticeNew(notice) && <span className="tag tag-success">New</span>}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.45rem' }}>{notice.title}</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>{notice.body}</p>
                <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                  Posted {notice.date}
                </span>
              </article>
            ))}
          </div>

          <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-warm)',
                border: '1px solid var(--grey-border)',
                borderRadius: '8px',
                padding: '2.5rem',
              }}
            >
              <span className="eyebrow">CHARTER GOVERNANCE</span>
              <h3 style={{ marginBottom: '1.25rem' }}>How InCompute operates</h3>
              <ul className="bullet-list">
                <li>Faculty Advisors review plans, minutes, and public announcements</li>
                <li>Executive Committee meets monthly to coordinate events and records</li>
                <li>Official registration runs through Inspiria’s campus portal</li>
                <li>Student privacy and photo consent are respected across all albums</li>
              </ul>
            </div>

            <div>
              <span className="eyebrow">ABOUT US</span>
              <h2 style={{ marginBottom: '1rem' }}>Student-led, industry-relevant by design</h2>
              <p>
                Formerly the Computing Club, InCompute brings together undergraduate students across
                Inspiria’s School of Computer Application into one structured community.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                From practical lab sessions to guest lectures and school outreach, our calendar is
                built around real skills, clear ownership, and open participation.
              </p>
              <Link to="/about" className="btn btn-outline">
                Read Club Charter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Join (Full-bleed Royal Blue) */}
      <section className="section-band band-blue">
        <div className="container">
          <h2 style={{ marginBottom: '2.5rem' }}>Why join InCompute?</h2>

          <div className="grid-2" style={{ gap: '32px' }}>
            {WHY_JOIN.map((item) => (
              <div
                key={item.title}
                style={{
                  borderTop: '2px solid var(--yellow)',
                  paddingTop: '1rem',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.86)', margin: 0, fontSize: '0.95rem' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: What Makes Us Different (Warm) */}
      <section className="section-band band-warm">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>What makes us different</h2>

          <div className="grid-3">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                className={item.highlight ? 'card-yellow' : 'card'}
              >
                <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.9375rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Recent Consent-Cleared Gallery Strip & Committees (White) */}
      <section className="section-band band-white">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">EVENT GALLERY</span>
              <h2>Recent club moments</h2>
            </div>
            <Link to="/gallery" className="btn btn-outline btn-sm">
              Open Gallery
            </Link>
          </div>

          <div className="grid-3" style={{ marginBottom: '4rem' }}>
            {galleryStrip.map((photo) => (
              <Link
                key={photo.id}
                to="/gallery"
                style={{
                  border: '1px solid var(--grey-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    height: '140px',
                    backgroundColor: '#02127A',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <span className="eyebrow eyebrow-yellow" style={{ marginBottom: 0 }}>
                    {photo.tag}
                  </span>
                  <span style={{ color: '#FFFFFF', fontSize: '0.8125rem' }}>
                    {photo.eventTitle}
                  </span>
                </div>
                <div style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                  {photo.caption}
                </div>
              </Link>
            ))}
          </div>

          <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            <div>
              <span className="eyebrow">COMMITTEES &amp; MENTORSHIP</span>
              <h2 style={{ marginBottom: '1rem' }}>A cut above the rest</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Four dedicated teams — Program, Publicity, Nominating, and Year Advisors — ensure
                every workshop, hackathon, and alumni session runs smoothly from idea to review.
              </p>
              <Link to="/team" className="btn btn-secondary">
                Meet the Team
              </Link>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-warm)',
                border: '1px solid var(--grey-border)',
                borderRadius: '8px',
                padding: '2.25rem',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <h4 style={{ color: 'var(--blue)', marginBottom: '0.25rem' }}>Program</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Workshops &amp; coding sprints</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--blue)', marginBottom: '0.25rem' }}>Publicity</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Notices &amp; consent gallery</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--blue)', marginBottom: '0.25rem' }}>Year Advisors</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Senior-to-junior mentoring</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--blue)', marginBottom: '0.25rem' }}>Executive</h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Monthly planning &amp; charter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Tracks (Warm) */}
      <section className="section-band band-warm">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Tracks &amp; focus areas</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
            }}
          >
            {TRACKS.map((track) => (
              <div
                key={track}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '1.15rem 1rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                }}
              >
                {track}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Student Voices (White) */}
      <section className="section-band band-white">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Student voices</h2>
          <div className="grid-3">
            {STUDENT_VOICES.map((voice) => (
              <div key={voice.author} className="card">
                <p style={{ fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>
                  {voice.quote}
                </p>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                  {voice.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

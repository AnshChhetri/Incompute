import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CLUB_INFO,
  EVENTS_DATA,
  COMPUTING_STREAMS,
  CAMPUS_ECOSYSTEM,
} from '../data/clubData';
import {
  getNextUpcomingEvent,
  getEventCountdownLabel,
  getEventCountdownParts,
  getPublicNotices,
  isNoticeNew,
  getGalleryAlbums,
} from '../lib/clubStore';

const HIGHLIGHTS = [
  { value: '6+', label: 'Events per year', sub: 'Charter minimum across both semesters' },
  { value: '4', label: 'Computing streams', sub: 'BCA, Data Science, AI & ML, Cyber Security' },
  { value: '100%', label: 'Student-led', sub: 'Guided by Faculty Advisors & Observer' },
  { value: '4', label: 'Observance days', sub: 'Marked every year on the club calendar' },
];

const WHY_JOIN = [
  {
    title: 'Technical skills',
    text: 'Practical workshops in Git, styled CSS, web development, data analytics, AI/ML, and security labs.',
  },
  {
    title: 'Leadership & management',
    text: 'Plan hackathons, lead committees, manage event schedules, and coordinate with faculty mentors.',
  },
  {
    title: 'Making friends across years',
    text: 'Collaborate with peers and Year Advisors across Years 1–4 in BCA, Data Science, AI/ML, and Cyber Security.',
  },
  {
    title: 'Certificates',
    text: 'Earn official Inspiria participation and volunteer certificates verified after event attendance.',
  },
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
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const nextEvent = getNextUpcomingEvent(now);
  const countdownLabel = nextEvent ? getEventCountdownLabel(nextEvent.date, now) : null;
  const countdownParts = nextEvent ? getEventCountdownParts(nextEvent.date, now) : null;
  const featuredEvents = EVENTS_DATA.filter((e) => e.status !== 'Held').slice(0, 3);
  const semesterTimeline = EVENTS_DATA.filter((e) => e.status !== 'Held').slice(0, 5);
  const latestNotices = getPublicNotices().slice(0, 3);
  const galleryStrip = getGalleryAlbums()
    .filter((a) => a.consentRecorded)
    .flatMap((a) => a.photos.map((p) => ({ ...p, eventTitle: a.eventTitle })))
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section — Inspiria School of Computer Application + InCompute */}
      <section className="section-band band-navy" style={{ borderBottom: '4px solid #FFD306' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '40px' }}>
            <div>
              <span className="eyebrow eyebrow-yellow">
                INSPIRIA KNOWLEDGE CAMPUS · SCHOOL OF COMPUTER APPLICATION
              </span>
              <h1 style={{ marginBottom: '1rem' }}>
                InCompute — {CLUB_INFO.tagline}
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.88)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                One trusted home for computing students across BCA, BSc Data Science, AI &amp; ML,
                and Cyber Security — bridging classroom theory with workshops, hackathons, and
                peer mentorship.
              </p>

              <div className="hero-meta-strip">
                <span className="hero-meta-pill">Years 1 to 4</span>
                <span className="hero-meta-pill">4 Computing Streams</span>
                <span className="hero-meta-pill">On-Campus Labs</span>
                <span className="hero-meta-pill">Official Certification</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                <Link to="/events" className="btn btn-primary">
                  See upcoming events
                </Link>
                <Link to="/get-involved" className="btn btn-outline-light">
                  Suggest an event
                </Link>
              </div>
            </div>

            {nextEvent ? (
              <div
                style={{
                  backgroundColor: 'rgba(2, 48, 200, 0.92)',
                  borderRadius: '10px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 211, 6, 0.45)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="eyebrow eyebrow-yellow" style={{ marginBottom: 0 }}>
                    NEXT UPCOMING EVENT
                  </span>
                  <span className="tag" style={{ background: '#FFD306', color: '#0B1020', borderColor: 'transparent' }}>
                    {countdownLabel}
                  </span>
                </div>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  {nextEvent.title}
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.86)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                  {nextEvent.displayDate} · {nextEvent.venue}
                </p>

                {countdownParts && (
                  <div className="countdown-strip" aria-label="Live countdown to next event">
                    <div className="countdown-box">
                      <span className="countdown-num">{countdownParts.days}</span>
                      <span className="countdown-unit">Days</span>
                    </div>
                    <div className="countdown-box">
                      <span className="countdown-num">{countdownParts.hours}</span>
                      <span className="countdown-unit">Hours</span>
                    </div>
                    <div className="countdown-box">
                      <span className="countdown-num">{countdownParts.minutes}</span>
                      <span className="countdown-unit">Mins</span>
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    paddingTop: '1rem',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    {nextEvent.seatsLeft} seats left · {nextEvent.category}
                  </span>
                  <Link to={`/events/${nextEvent.id}`} className="btn btn-primary btn-sm">
                    Register →
                  </Link>
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#0230C8',
                  borderRadius: '10px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
              >
                <span className="eyebrow eyebrow-yellow">EVENT CALENDAR</span>
                <h3 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  No upcoming events published yet
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.86)', marginBottom: '1.5rem' }}>
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

      {/* Section 1: Club Highlights & Computing Streams (White) */}
      <section className="section-band band-white">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">SCHOOL OF COMPUTER APPLICATION</span>
              <h2>Specialisations &amp; club highlights</h2>
            </div>
            <Link to="/about" className="btn btn-outline btn-sm">
              Club Charter
            </Link>
          </div>

          <div className="grid-4" style={{ marginBottom: '2rem' }}>
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="stat-card">
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
                <p className="stat-sub">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid-4">
            {COMPUTING_STREAMS.map((stream) => (
              <article key={stream.code} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="tag tag-blue" style={{ marginBottom: '0.75rem' }}>
                    {stream.code}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.45rem' }}>{stream.title}</h3>
                  <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{stream.focus}</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {stream.tracks.map((t) => (
                    <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why Join InCompute (4 Cards on Inspiria Blue) */}
      <section className="section-band band-blue">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">FOR STUDENTS (YEARS 1 TO 4)</span>
          <h2 style={{ marginBottom: '2rem' }}>Why join InCompute?</h2>

          <div className="grid-4">
            {WHY_JOIN.map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'rgba(2, 18, 122, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderTop: '3px solid #FFD306',
                  borderRadius: '10px',
                  padding: '1.4rem',
                }}
              >
                <h3 style={{ fontSize: '1.08rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.88)', margin: 0, fontSize: '0.9rem' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Upcoming Events & This Semester at a Glance (Warm Cream) */}
      <section className="section-band band-warm">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">OUR EVENTS</span>
              <h2>Upcoming workshops &amp; hackathons</h2>
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
                    height: '124px',
                    background: 'linear-gradient(135deg, #02127A 0%, #0230C8 100%)',
                    padding: '1.15rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderBottom: '3px solid #FFD306',
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
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: '0.55rem' }}>{evt.title}</h3>
                    <p style={{ fontSize: '0.92rem', marginBottom: '1.25rem' }}>{evt.summary}</p>
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
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink-muted)' }}>
                      {evt.displayDate}
                    </span>
                    <Link to={`/events/${evt.id}`} className="btn btn-secondary btn-sm">
                      Register
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* This Semester at a Glance */}
          <div className="card">
            <span className="eyebrow">THIS SEMESTER AT A GLANCE</span>
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>{evt.title}</strong>
                    <span className="tag tag-blue">{evt.category}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
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

      {/* Section 4: Latest Notices & Campus Learning Ecosystem (White) */}
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
                  {isNoticeNew(notice, now) && <span className="tag tag-success">New</span>}
                </div>
                <h3 style={{ fontSize: '1.08rem', marginBottom: '0.45rem' }}>{notice.title}</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>{notice.body}</p>
                <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                  Posted {notice.date}
                </span>
              </article>
            ))}
          </div>

          <div className="grid-2" style={{ alignItems: 'stretch', gap: '28px' }}>
            <div className="card-warm">
              <span className="eyebrow">CAMPUS LEARNING ECOSYSTEM</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Built around Inspiria’s tech infrastructure
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {CAMPUS_ECOSYSTEM.map((item) => (
                  <div key={item.title} style={{ borderLeft: '3px solid #FFD306', paddingLeft: '0.9rem' }}>
                    <h4 style={{ marginBottom: '0.15rem', color: 'var(--ink)' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.88rem', marginBottom: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="eyebrow">CHARTER &amp; GOVERNANCE</span>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.85rem' }}>
                  One trusted hub, zero scattered chats
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  Formerly the Computing Club, InCompute operates under a clear student-led charter
                  reviewed by Faculty Advisors and the Head of School.
                </p>
                <ul className="bullet-list" style={{ marginBottom: '1.5rem' }}>
                  <li>Every notice and gallery album is approved before going live</li>
                  <li>Official registration connects through Inspiria’s facility</li>
                  <li>Member names appear only on the Team page — never on posters</li>
                  <li>No student ideas in yet? Bring one idea and help shape the calendar</li>
                </ul>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link to="/get-involved" className="btn btn-primary">
                  Bring one idea
                </Link>
                <Link to="/team" className="btn btn-outline">
                  Meet the Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Consent-Cleared Photo Strip (Warm Cream) */}
      <section className="section-band band-warm">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow">RECENT PHOTO STRIP</span>
              <h2>Consent-verified club moments</h2>
            </div>
            <Link to="/gallery" className="btn btn-outline btn-sm">
              Open Gallery
            </Link>
          </div>

          <div className="grid-3">
            {galleryStrip.map((photo) => (
              <Link
                key={photo.id}
                to="/gallery"
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <div
                  role="img"
                  aria-label={photo.alt}
                  style={{
                    height: '140px',
                    background: 'linear-gradient(135deg, #02127A 0%, #0230C8 100%)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderBottom: '3px solid #FFD306',
                  }}
                >
                  <span className="eyebrow eyebrow-yellow" style={{ marginBottom: 0 }}>
                    {photo.tag}
                  </span>
                  <span style={{ color: '#FFFFFF', fontSize: '0.8125rem' }}>
                    {photo.eventTitle}
                  </span>
                </div>
                <div style={{ padding: '0.9rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                  {photo.caption}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Student Voices (White) */}
      <section className="section-band band-white">
        <div className="container">
          <span className="eyebrow">COMMUNITY</span>
          <h2 style={{ marginBottom: '2rem' }}>Student voices</h2>
          <div className="grid-3">
            {STUDENT_VOICES.map((voice) => (
              <div key={voice.author} className="card-warm">
                <p style={{ fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>
                  {voice.quote}
                </p>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--blue)' }}>
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

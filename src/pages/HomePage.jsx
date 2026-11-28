import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUB_INFO, EVENTS_DATA, CHARTER_RULES } from '../data/clubData';
import { getNextUpcomingEvent, getEventCountdownParts, getPublicNotices, isNoticeNew, getGalleryAlbums } from '../lib/clubStore';

function SectionTitle({ children, to, link = 'View all →' }) {
  return <div className="demo-section-title"><h2>{children}</h2>{to && <Link to={to}>{link}</Link>}</div>;
}

export default function HomePage() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  const nextEvent = getNextUpcomingEvent(now);
  const countdown = nextEvent ? getEventCountdownParts(nextEvent.date, now) : null;
  const upcoming = EVENTS_DATA.filter((event) => event.status !== 'Held').slice(0, 5);
  const notices = getPublicNotices().slice(0, 3);
  const moments = getGalleryAlbums().filter((album) => album.consentRecorded)
    .flatMap((album) => album.photos.map((photo) => ({ ...photo, eventTitle: album.eventTitle }))).slice(0, 3);

  return (
    <div className="demo-home container">
      <p className="demo-eyebrow">// INCOMPUTE ● CAMPUS / 2026–27</p>
      <span className="demo-pill">Inspiria Knowledge Campus · Siliguri</span>
      <section className="demo-home-hero">
        <div>
          <h1>Code. Lead. Grow.</h1>
          <p className="demo-lead">InCompute (formerly the Computing Club) is one trusted campus hub for BCA, Data Science, AI/ML, and Cyber Security students to track events, read notices, and shape what we build next.</p>
          <div className="demo-actions"><Link className="demo-button yellow" to="/events">See upcoming events</Link><Link className="demo-button lavender" to="/get-involved">Suggest an event</Link></div>
        </div>
        <div className="demo-terminal">
          <div className="demo-terminal-bar"><b>● ● ●</b> community.config</div>
          <pre><span className="demo-muted">// Built by students. For students.</span>{'\n'}const community = {'{'}{'\n'}  learn: [<i>'BCA'</i>, <i>'AI/ML'</i>],{'\n'}  build: [<i>'Web'</i>, <i>'Data'</i>, <i>'Cyber'</i>],{'\n'}  connect: <i>'Siliguri'</i>{'\n'}{'}'};{'\n'}&gt; Code. Lead. Grow. <b>_</b></pre>
          <div className="demo-terminal-foot"><span>INCOMPUTE / SILIGURI</span><span>● ALL SYSTEMS READY</span></div>
        </div>
      </section>
      {nextEvent && <section className="demo-home-section"><div className="demo-card demo-next-event"><div><span className="demo-tag yellow">Next event</span><span className="demo-tag lavender">{nextEvent.status} · {nextEvent.category}</span><p className="demo-date">{nextEvent.displayDate}</p><h2>{nextEvent.title}</h2><p className="demo-muted">{nextEvent.venue} · {nextEvent.audience}</p><p className="demo-small demo-muted">Synced from club calendar</p></div><div>{countdown && <div className="demo-countdown">{[[countdown.days, 'Days'], [countdown.hours, 'Hours'], [countdown.minutes, 'Mins']].map(([value, unit]) => <div key={unit}><b>{value}</b><span>{unit}</span></div>)}</div>}<Link className="demo-button yellow" to={`/events/${nextEvent.id}`}>Event details →</Link><p className="demo-small demo-muted">Official event registration via Inspiria</p></div></div></section>}
      <section className="demo-home-section"><SectionTitle to="/notices">Latest notices</SectionTitle><div className="demo-grid three">{notices.length ? notices.map((notice) => <article className={`demo-card demo-notice ${notice.pinned ? 'pinned' : ''}`} key={notice.id}><div>{notice.pinned && <span className="demo-tag yellow">Pinned</span>}<span className="demo-tag lavender">{notice.category}</span>{isNoticeNew(notice, now) && <span className="demo-tag green">New</span>}</div><p className="demo-date">{notice.date}</p><h3>{notice.title}</h3><p>{notice.body}</p></article>) : <article className="demo-card"><p>No current approved notices.</p><Link to="/notices">Notice board →</Link></article>}</div></section>
      <section className="demo-home-section"><SectionTitle to="/events" link="Full calendar →">This semester</SectionTitle><div className="demo-card demo-list">{upcoming.map((event) => <div className="demo-row" key={event.id}><div><span className="demo-date">{event.displayDate}</span><h3>{event.title}</h3><span className="demo-muted">{event.category} · {event.venue}</span></div><span className={`demo-tag ${event.status === 'Held' ? 'green' : event.status === 'Proposed' ? 'lavender' : 'yellow'}`}>{event.status}</span></div>)}</div></section>
      <section className="demo-home-section"><SectionTitle to="/gallery">Recent moments</SectionTitle>{moments.length ? <div className="demo-grid three">{moments.map((photo) => <Link className="demo-moment" to="/gallery" key={photo.id}><span>{photo.tag}</span><b>{photo.caption}</b><small>{photo.eventTitle}</small></Link>)}</div> : <div className="demo-grid three"><div className="demo-moment">Consent-recorded club moments</div><div className="demo-moment">Workshops · Hackathons · Peer sessions</div><div className="demo-moment">Explore the InCompute gallery</div></div>}</section>
      <section className="demo-home-section"><SectionTitle to="/about" link="Read our charter →">Our charter, at a glance</SectionTitle><div className="demo-grid three">{CHARTER_RULES.slice(0, 3).map((rule) => <article className="demo-card" key={rule.rule}><h3>{rule.rule}</h3><p>{rule.meaning}</p></article>)}</div><p className="demo-small demo-muted" style={{ marginTop: 14 }}>{CLUB_INFO.tagline} · {CLUB_INFO.department}</p></section>
    </div>
  );
}
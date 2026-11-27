import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, List, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';
import { EVENTS_DATA, OBSERVANCE_DAYS } from '../data/clubData';

const CATEGORY_FILTERS = [
  'All',
  'Data Analytics',
  'Web Development',
  'AI & ML',
  'Gaming/Testing',
  'Alumni Talk',
  'Technical',
];

const STATUS_FILTERS = ['All', 'Proposed', 'In progress', 'Held'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getThirdSaturdayOfSeptember(year) {
  const firstDay = new Date(year, 8, 1).getDay();
  const firstSat = 1 + ((6 - firstDay + 7) % 7);
  return firstSat + 14;
}

export default function EventsPage() {
  const [viewMode, setViewMode] = useState('list');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentMonth, setCurrentMonth] = useState({ year: 2026, month: 11 });

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((evt) => {
      const matchesCategory = categoryFilter === 'All' || evt.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || evt.status === statusFilter;
      return matchesCategory && matchesStatus;
    });
  }, [categoryFilter, statusFilter]);

  const changeMonth = (delta) => {
    setCurrentMonth((prev) => {
      let nextMonth = prev.month + delta;
      let nextYear = prev.year;
      if (nextMonth < 0) {
        nextMonth = 11;
        nextYear -= 1;
      } else if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
      }
      return { year: nextYear, month: nextMonth };
    });
  };

  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  const startWeekday = new Date(currentMonth.year, currentMonth.month, 1).getDay();

  const observancesInMonth = OBSERVANCE_DAYS.map((obs) => {
    if (obs.rule === 'third-saturday-sep' && currentMonth.month === 8) {
      return { ...obs, day: getThirdSaturdayOfSeptember(currentMonth.year) };
    }
    if (obs.month === currentMonth.month && obs.day) {
      return obs;
    }
    return null;
  }).filter(Boolean);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">EVENT CALENDAR</span>
          <h1>Events, Workshops &amp; Hackathons</h1>
          <p>
            Synced from the club’s official calendar (September 2026 onwards). Every event links
            to Inspiria’s official registration facility.
          </p>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="callout" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--grey-border)', borderLeft: '4px solid var(--blue)' }}>
            <ShieldAlert size={18} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: '3px' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
              <strong style={{ color: 'var(--ink)' }}>Charter Notice:</strong> Individual member and faculty names are hidden on the
              public calendar. Outside speaker names appear only after Faculty Advisor clearance.
            </div>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)' }}>Filters:</span>

                <select
                  aria-label="Filter by event type"
                  className="form-control"
                  style={{ width: 'auto', minWidth: '175px' }}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {CATEGORY_FILTERS.map((c) => (
                    <option key={c} value={c}>
                      Type: {c}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter by event status"
                  className="form-control"
                  style={{ width: 'auto', minWidth: '155px' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {STATUS_FILTERS.map((s) => (
                    <option key={s} value={s}>
                      Status: {s}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-secondary' : 'btn-outline'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={15} /> List View
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${viewMode === 'month' ? 'btn-secondary' : 'btn-outline'}`}
                  onClick={() => setViewMode('month')}
                >
                  <CalendarIcon size={15} /> Month View
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="grid-2">
              {filteredEvents.length === 0 ? (
                <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <p style={{ marginBottom: 0 }}>No events match the selected filters.</p>
                </div>
              ) : (
                filteredEvents.map((evt) => (
                  <article key={evt.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.85rem' }}>
                        <span className="tag tag-blue">{evt.category}</span>
                        <span
                          className={`tag ${
                            evt.status === 'Held'
                              ? 'tag-success'
                              : evt.status === 'In progress'
                              ? 'tag-yellow'
                              : ''
                          }`}
                        >
                          {evt.status}
                        </span>
                      </div>
                      <h3 style={{ marginBottom: '0.4rem' }}>{evt.title}</h3>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--blue)', marginBottom: '0.5rem' }}>
                        {evt.displayDate} · {evt.venue}
                      </p>
                      <p style={{ fontSize: '0.9375rem' }}>{evt.summary}</p>
                      {evt.dateNote && (
                        <p style={{ fontSize: '0.8125rem', color: 'var(--warning)', marginBottom: '0.75rem' }}>
                          Note: {evt.dateNote}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.9rem', borderTop: '1px solid var(--grey-border)' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                        {evt.status === 'Held' ? evt.documentLabel || 'Completed' : `${evt.seatsLeft} seats left`}
                      </span>
                      <Link to={`/events/${evt.id}`} className="btn btn-secondary btn-sm">
                        {evt.status === 'Held' ? 'View Details' : 'Details & Register'}
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          ) : (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => changeMonth(-1)} aria-label="Previous month">
                  <ChevronLeft size={16} /> Prev
                </button>
                <h3 style={{ margin: 0 }}>
                  {MONTH_NAMES[currentMonth.month]} {currentMonth.year}
                </h3>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => changeMonth(1)} aria-label="Next month">
                  Next <ChevronRight size={16} />
                </button>
              </div>

              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="calendar-weekday">
                    {d}
                  </div>
                ))}

                {Array.from({ length: startWeekday }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-cell empty" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isoPrefix = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayEvents = filteredEvents.filter((e) => e.date === isoPrefix);
                  const dayObs = observancesInMonth.filter((o) => o.day === dayNum);

                  return (
                    <div key={dayNum} className="calendar-cell">
                      <span className="calendar-day-num">{dayNum}</span>
                      {dayObs.map((o) => (
                        <span key={o.id} className="calendar-pill observance" title={o.description}>
                          {o.label}
                        </span>
                      ))}
                      {dayEvents.map((e) => (
                        <Link key={e.id} to={`/events/${e.id}`} className="calendar-pill" title={e.title}>
                          {e.title}
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                <span>
                  <span className="calendar-pill" style={{ display: 'inline-block', marginRight: '0.35rem' }}>Event</span>
                  Club Event
                </span>
                <span>
                  <span className="calendar-pill observance" style={{ display: 'inline-block', marginRight: '0.35rem' }}>Observance</span>
                  Charter Observance Day (15 Feb, 15 Aug, 3rd Sat Sep, 30 Nov)
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

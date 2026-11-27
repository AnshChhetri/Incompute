import React, { useState } from 'react';
import { FileText, Pin } from 'lucide-react';
import { getPublicNotices, isNoticeNew } from '../lib/clubStore';

const CATEGORIES = ['All', 'Event', 'Deadline', 'Result', 'General'];

export default function NoticesPage() {
  const [category, setCategory] = useState('All');
  const notices = getPublicNotices();

  const filtered =
    category === 'All' ? notices : notices.filter((n) => n.category === category);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">OFFICIAL ANNOUNCEMENTS</span>
          <h1>Notice Board</h1>
          <p>
            Approved club announcements, deadlines, and results. Expired and draft notices are
            automatically hidden from public view.
          </p>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filter notices by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                className={`tab-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="card">
              <p style={{ marginBottom: 0 }}>No active notices in this category.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filtered.map((notice) => {
                const recent = isNoticeNew(notice);
                return (
                  <article
                    key={notice.id}
                    className="card"
                    style={
                      notice.pinned
                        ? { border: '2px solid var(--blue)' }
                        : undefined
                    }
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                        {notice.pinned && (
                          <span className="tag tag-yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Pin size={13} /> Pinned
                          </span>
                        )}
                        <span className="tag tag-blue">{notice.category}</span>
                        {recent && <span className="tag tag-success">New</span>}
                      </div>

                      <span style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                        Posted {notice.date} · Expires {notice.expiryDate}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{notice.title}</h2>
                    <p style={{ marginBottom: notice.attachmentLabel ? '1rem' : 0 }}>{notice.body}</p>

                    {notice.attachmentLabel && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--blue)' }}>
                        <FileText size={16} />
                        <span>Attachment: {notice.attachmentLabel}</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

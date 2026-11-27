import React, { useState } from 'react';
import { Image as ImageIcon, ShieldCheck, Video, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getGalleryAlbums } from '../lib/clubStore';

export default function GalleryPage() {
  const [yearFilter, setYearFilter] = useState('All');
  const [viewer, setViewer] = useState(null);

  const visibleAlbums = getGalleryAlbums().filter(
    (alb) => alb.consentRecorded && (yearFilter === 'All' || alb.year === yearFilter)
  );

  const openPhoto = (album, index) => setViewer({ album, index });

  const stepPhoto = (delta) => {
    if (!viewer) return;
    const total = viewer.album.photos.length;
    const nextIdx = (viewer.index + delta + total) % total;
    setViewer({ ...viewer, index: nextIdx });
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow eyebrow-yellow">EVENT GALLERY</span>
          <h1>Photos &amp; Moments</h1>
          <p>
            Albums grouped by event and year. Only albums with recorded student photo consent are
            published here.
          </p>
        </div>
      </section>

      <section className="section-band band-warm">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filter gallery by year">
            {['All', '2026'].map((yr) => (
              <button
                key={yr}
                type="button"
                role="tab"
                aria-selected={yearFilter === yr}
                className={`tab-btn ${yearFilter === yr ? 'active' : ''}`}
                onClick={() => setYearFilter(yr)}
              >
                {yr === 'All' ? 'All Years' : yr}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {visibleAlbums.map((album) => (
              <section key={album.id} className="card">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span className="eyebrow" style={{ marginBottom: '0.35rem' }}>
                      {album.date} · {album.year}
                    </span>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{album.eventTitle}</h2>
                    <p style={{ marginBottom: 0 }}>{album.description}</p>
                  </div>
                  <span className="tag tag-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} /> Photo Consent Recorded
                  </span>
                </div>

                <div className="grid-3">
                  {album.photos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => openPhoto(album, idx)}
                      aria-label={`Open photo: ${photo.caption}`}
                      style={{
                        textAlign: 'left',
                        padding: 0,
                        border: '1px solid var(--grey-border)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        role="img"
                        aria-label={photo.alt}
                        style={{
                          height: '165px',
                          backgroundColor: '#02127A',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          color: '#FFFFFF',
                        }}
                      >
                        <span className="eyebrow eyebrow-yellow" style={{ marginBottom: 0 }}>
                          {photo.tag}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)' }}>
                          Click to view photo →
                        </span>
                      </div>
                      <div style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                        {photo.caption}
                      </div>
                    </button>
                  ))}
                </div>

                {album.videoEmbedNote && (
                  <div className="callout" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
                    <Video size={18} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem' }}>
                      <strong>Video Embed:</strong> {album.videoEmbedNote}
                    </span>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      {viewer && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{viewer.album.eventTitle}</h3>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setViewer(null)}
                aria-label="Close photo viewer"
              >
                <X size={16} /> Close
              </button>
            </div>

            <div
              role="img"
              aria-label={viewer.album.photos[viewer.index].alt}
              style={{
                height: '300px',
                borderRadius: '8px',
                backgroundColor: '#02127A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                padding: '1.5rem',
                textAlign: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <ImageIcon size={36} style={{ marginBottom: '0.75rem', color: 'var(--yellow)' }} />
                <p style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '0.35rem' }}>
                  {viewer.album.photos[viewer.index].caption}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginBottom: 0 }}>
                  {viewer.album.photos[viewer.index].alt}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => stepPhoto(-1)}>
                <ChevronLeft size={16} /> Previous
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                Photo {viewer.index + 1} of {viewer.album.photos.length}
              </span>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => stepPhoto(1)}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

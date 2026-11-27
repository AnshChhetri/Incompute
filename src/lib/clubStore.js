import {
  EVENTS_DATA,
  GALLERY_ALBUMS,
  INITIAL_IDEAS,
  INITIAL_NOTICES,
} from '../data/clubData';

const STORAGE_KEYS = {
  NOTICES: 'incompute_notices_v1',
  IDEAS: 'incompute_ideas_v1',
  APPLICATIONS: 'incompute_applications_v1',
  REGISTRATIONS: 'incompute_registrations_v1',
  GALLERY: 'incompute_gallery_v1',
  AUDIT: 'incompute_audit_v1',
  AUTH: 'incompute_auth_v1',
};

const ROLE_ACCOUNTS = {
  'admin@inspiria.edu.in': { role: 'Admin', label: 'Chair / Secretary' },
  'faculty@inspiria.edu.in': { role: 'Faculty Reviewer', label: 'Faculty Advisor' },
  'editor@inspiria.edu.in': { role: 'Editor', label: 'Program / Publicity Committee' },
  'member@inspiria.edu.in': { role: 'Member', label: 'Club Member' },
};

const DEMO_PASSCODE = 'incompute2026';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

// --- Audit Log ---
export function getAuditLog() {
  return readJson(STORAGE_KEYS.AUDIT, [
    {
      id: 'aud-init-1',
      timestamp: '2026-11-24 10:15',
      actor: 'Faculty Advisor',
      action: 'Approved',
      entity: 'Notice',
      entityId: 'not-school-hackathon',
      summary: 'Approved School Hackathon registration notice for public display.',
    },
    {
      id: 'aud-init-2',
      timestamp: '2026-11-22 14:40',
      actor: 'Club Chair',
      action: 'Approved',
      entity: 'Notice',
      entityId: 'not-incode-save-date',
      summary: 'Approved InCode 2027 dates notice.',
    },
  ]);
}

export function logAuditAction({ actor, action, entity, entityId, summary }) {
  const log = getAuditLog();
  const now = new Date();
  const timestamp = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;
  const entry = {
    id: `aud-${Date.now()}`,
    timestamp,
    actor,
    action,
    entity,
    entityId,
    summary,
  };
  writeJson(STORAGE_KEYS.AUDIT, [entry, ...log]);
}

// --- Notices ---
export function getNotices() {
  return readJson(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
}

export function isNoticePublic(notice, referenceDate = new Date()) {
  if (notice.status !== 'Approved') return false;
  if (!notice.expiryDate) return true;
  const todayIso = referenceDate.toISOString().slice(0, 10);
  return notice.expiryDate >= todayIso;
}

export function isNoticeNew(notice, referenceDate = new Date()) {
  const pub = new Date(notice.date);
  const diffDays = (referenceDate.getTime() - pub.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

export function getPublicNotices() {
  return getNotices()
    .filter((n) => isNoticePublic(n))
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}

export function addNoticeDraft(noticeInput, actor) {
  const notices = getNotices();
  const newNotice = {
    id: `not-${Date.now()}`,
    title: noticeInput.title.trim(),
    date: new Date().toISOString().slice(0, 10),
    category: noticeInput.category || 'General',
    body: noticeInput.body.trim(),
    attachmentLabel: noticeInput.attachmentLabel || null,
    pinned: Boolean(noticeInput.pinned),
    expiryDate: noticeInput.expiryDate || '2027-06-30',
    status: 'Pending',
    author: actor,
    approver: null,
  };
  writeJson(STORAGE_KEYS.NOTICES, [newNotice, ...notices]);
  logAuditAction({
    actor,
    action: 'Created Draft',
    entity: 'Notice',
    entityId: newNotice.id,
    summary: `Submitted notice "${newNotice.title}" for approval.`,
  });
  return newNotice;
}

export function updateNoticeStatus(id, status, actor) {
  const notices = getNotices().map((n) =>
    n.id === id ? { ...n, status, approver: status === 'Approved' ? actor : n.approver } : n
  );
  writeJson(STORAGE_KEYS.NOTICES, notices);
  logAuditAction({
    actor,
    action: status,
    entity: 'Notice',
    entityId: id,
    summary: `Marked notice ${id} as ${status}.`,
  });
  return notices;
}

// --- Ideas ---
export function getIdeas() {
  return readJson(STORAGE_KEYS.IDEAS, INITIAL_IDEAS);
}

export function getPublicIdeas() {
  return getIdeas().filter((item) => item.status === 'Planned' || item.status === 'Under review');
}

export function addIdeaSubmission(ideaInput) {
  const ideas = getIdeas();
  const newIdea = {
    id: `idea-${Date.now()}`,
    title: ideaInput.title.trim(),
    type: ideaInput.type || 'Technical',
    preferredMonth: ideaInput.preferredMonth.trim() || 'Upcoming Semester',
    audience: ideaInput.audience.trim() || 'All Computing Students',
    description: ideaInput.description.trim(),
    submittedBy: ideaInput.name.trim(),
    submitterRole: ideaInput.role || 'Student',
    courseYear: ideaInput.courseYear || 'BCA',
    wantsToHelp: Boolean(ideaInput.wantsToHelp),
    status: 'New',
    votes: 1,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  writeJson(STORAGE_KEYS.IDEAS, [newIdea, ...ideas]);
  logAuditAction({
    actor: `${newIdea.submittedBy} (${newIdea.submitterRole})`,
    action: 'Suggested Idea',
    entity: 'EventIdea',
    entityId: newIdea.id,
    summary: `Submitted "${newIdea.title}" (${newIdea.type}) for Program Committee review.`,
  });
  return newIdea;
}

export function voteIdea(id) {
  const ideas = getIdeas().map((item) =>
    item.id === id ? { ...item, votes: item.votes + 1 } : item
  );
  writeJson(STORAGE_KEYS.IDEAS, ideas);
  return ideas;
}

export function updateIdeaStatus(id, status, actor) {
  const ideas = getIdeas().map((item) =>
    item.id === id ? { ...item, status } : item
  );
  writeJson(STORAGE_KEYS.IDEAS, ideas);
  logAuditAction({
    actor,
    action: 'Moderated Idea',
    entity: 'EventIdea',
    entityId: id,
    summary: `Updated idea ${id} status to ${status}.`,
  });
  return ideas;
}

// --- Join the Club Applications ---
export function getClubApplications() {
  return readJson(STORAGE_KEYS.APPLICATIONS, []);
}

export function addClubApplication(appInput) {
  const apps = getClubApplications();
  const normalizedEmail = appInput.email.trim().toLowerCase();
  if (apps.some((a) => a.email.toLowerCase() === normalizedEmail)) {
    return { ok: false, error: 'An application with this email has already been submitted.' };
  }
  const record = {
    id: `join-${Date.now()}`,
    name: appInput.name.trim(),
    email: normalizedEmail,
    courseYear: appInput.courseYear,
    interests: appInput.interests,
    hoursPerWeek: appInput.hoursPerWeek,
    note: (appInput.note || '').trim(),
    consentRecorded: Boolean(appInput.consentRecorded),
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
  };
  writeJson(STORAGE_KEYS.APPLICATIONS, [record, ...apps]);
  logAuditAction({
    actor: record.name,
    action: 'Club Application',
    entity: 'Membership',
    entityId: record.id,
    summary: `Applied to join InCompute (${record.courseYear}, ${record.interests.join(', ')}).`,
  });
  return { ok: true, record };
}

// --- Gallery ---
export function getGalleryAlbums() {
  return readJson(STORAGE_KEYS.GALLERY, GALLERY_ALBUMS);
}

export function toggleAlbumConsent(id, consentRecorded, actor) {
  const albums = getGalleryAlbums().map((alb) =>
    alb.id === id ? { ...alb, consentRecorded } : alb
  );
  writeJson(STORAGE_KEYS.GALLERY, albums);
  logAuditAction({
    actor,
    action: consentRecorded ? 'Consent Verified' : 'Quarantined',
    entity: 'GalleryAlbum',
    entityId: id,
    summary: `Set photo consentRecorded=${consentRecorded} for album ${id}.`,
  });
  return albums;
}

// --- Backup Event Registrations & CSV Export ---
export function getRegistrations() {
  return readJson(STORAGE_KEYS.REGISTRATIONS, []);
}

export function getRegistrationsForEvent(eventId) {
  return getRegistrations().filter((r) => r.eventId === eventId);
}

export function addRegistration({ eventId, eventTitle, name, email, courseYear, teamMembers, seatsTotal }) {
  const regs = getRegistrations();
  const normalizedEmail = email.trim().toLowerCase();
  const duplicate = regs.some(
    (r) => r.eventId === eventId && r.email.toLowerCase() === normalizedEmail
  );

  if (duplicate) {
    return { ok: false, error: 'Duplicate sign-up blocked: this email is already registered for this event.' };
  }

  const eventRegsCount = regs.filter((r) => r.eventId === eventId).length;
  const state = eventRegsCount < seatsTotal ? 'Registered' : 'Waitlisted';

  const record = {
    id: `reg-${Date.now()}`,
    eventId,
    eventTitle,
    name: name.trim(),
    email: normalizedEmail,
    courseYear,
    teamMembers: teamMembers.trim(),
    state,
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
  };

  writeJson(STORAGE_KEYS.REGISTRATIONS, [record, ...regs]);
  return { ok: true, record };
}

export function exportRegistrationsCsv() {
  const regs = getRegistrations();
  const headers = ['ID', 'Event', 'Name', 'Email', 'Course & Year', 'Team Members', 'State', 'Timestamp'];
  const rows = regs.map((r) => [
    r.id,
    r.eventTitle,
    r.name,
    r.email,
    r.courseYear,
    r.teamMembers || '',
    r.state,
    r.createdAt,
  ]);

  const escapeCsv = (val) => `"${String(val).replace(/"/g, '""')}"`;
  const csvContent = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `incompute-registrations-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// --- Events Helper (Next Event + Countdown) ---
export function getNextUpcomingEvent(referenceDate = new Date()) {
  const todayIso = referenceDate.toISOString().slice(0, 10);
  const upcoming = EVENTS_DATA
    .filter((e) => e.status !== 'Held' && e.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date));
  return upcoming[0] || null;
}

export function getEventCountdownLabel(eventDateIso, referenceDate = new Date()) {
  const start = new Date(referenceDate.toISOString().slice(0, 10));
  const target = new Date(eventDateIso);
  const diffDays = Math.round((target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Happening today';
  if (diffDays === 1) return '1 day left';
  return `${diffDays} days left`;
}

export function getEventCountdownParts(eventDateIso, now = new Date()) {
  const target = new Date(`${eventDateIso}T09:30:00`);
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

// --- Role-Based Auth (Admin, Faculty Reviewer, Editor, Member) ---
export function getAuthSession() {
  return readJson(STORAGE_KEYS.AUTH, null);
}

export function signInWithRole(email, passcode) {
  const normalized = email.trim().toLowerCase();
  if (!normalized || passcode.trim() !== DEMO_PASSCODE) {
    return { ok: false, error: 'Invalid email or passcode.' };
  }
  const account = ROLE_ACCOUNTS[normalized] || { role: 'Member', label: 'Club Member' };
  const session = {
    email: normalized,
    role: account.role,
    label: account.label,
    signedInAt: new Date().toISOString(),
  };
  writeJson(STORAGE_KEYS.AUTH, session);
  return { ok: true, session };
}

export function signOutSession() {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  } catch {
    // ignore
  }
}

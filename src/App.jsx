import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import MeetingsPage from './pages/MeetingsPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import NoticesPage from './pages/NoticesPage';
import GalleryPage from './pages/GalleryPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import ContactFaqPage from './pages/ContactFaqPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/contact" element={<ContactFaqPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

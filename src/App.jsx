import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LandingPage from './pages/LandingPage';
import Generator from './pages/Generator';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EduPass - Ruxsatnoma Generatori",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "EduPass — Maktab o'quvchilari uchun sertifikat va qo'shimcha tayyorgarlik darslariga ruxsatnomalar yaratish vositasi.",
    "author": {
      "@type": "Person",
      "name": "Rahmatjon Matkarimov"
    },
    "url": "https://edupass.rahmatjonmatkarimov.uz/"
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        </Helmet>

        <Routes>
          <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/generator" element={<Generator theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


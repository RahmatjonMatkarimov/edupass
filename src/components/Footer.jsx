import { Link } from 'react-router-dom';
import { IconPhone, IconMail, IconBrandTelegram, IconBrandInstagram, IconWorld, IconBriefcase } from '@tabler/icons-react';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-col">
          <h4>EduPass</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
            EduPass — O'qituvchilar va sinf rahbarlari uchun sertifikat va qo'shimcha tayyorgarlik darslariga ruxsatnomalar yaratish xizmati.
          </p>
        </div>
        <div className="footer-col">
          <h4>Havolalar</h4>
          <ul>
            <li><Link to="/#about">Haqida</Link></li>
            <li><Link to="/#faq">FAQ</Link></li>
            <li><Link to="/generator">Generator</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Bog'lanish</h4>
          <ul>
            <li><a href="tel:+998919999883"><IconPhone size={16} /> +998 91 999 98 83</a></li>
            <li><a href="mailto:rahmatjon974@gmail.com"><IconMail size={16} /> rahmatjon974@gmail.com</a></li>
            <li><a href="https://www.rahmatjonmatkarimov.uz/" target="_blank" rel="noopener noreferrer"><IconWorld size={16} /> rahmatjonmatkarimov.uz</a></li>
            <li><a href="https://webusta.rahmatjonmatkarimov.uz/" target="_blank" rel="noopener noreferrer"><IconBriefcase size={16} /> webusta</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Ijtimoiy tarmoqlar</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="https://t.me/rahmatjon_web" style={{ color: 'white' }} aria-label="Telegram"><IconBrandTelegram /></a>
            <a href="https://instagram.com/rahmatjon.web/" style={{ color: 'white' }} aria-label="Instagram"><IconBrandInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Rahmatjon Matkarimov. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
}

export default Footer;

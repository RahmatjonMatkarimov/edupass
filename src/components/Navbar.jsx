import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconFileDescription, IconMenu2, IconX, IconSun, IconMoon } from '@tabler/icons-react';

function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="landing-nav">
      <div className="nav-container">
        <Link to="/" className="logo">
          <IconFileDescription size={32} />
          Edu<span>Pass</span>
        </Link>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/#about" onClick={() => setIsOpen(false)}>Haqida</Link>
          <Link to="/#faq" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link 
            to="/generator" 
            className="btn-primary nav-cta" 
            style={{ textDecoration: 'none' }}
            onClick={() => setIsOpen(false)}
          >
            Generator
          </Link>
          
          <button 
            className="theme-toggle desktop-toggle" 
            onClick={toggleTheme}
            aria-label="Mavzuni o'zgartirish"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background 0.2s',
              marginLeft: '1rem'
            }}
          >
            {theme === 'dark' ? <IconSun size={24} /> : <IconMoon size={24} />}
          </button>
        </div>

        <div className="mobile-actions" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Mavzuni o'zgartirish"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'var(--text-main)',
              padding: '8px'
            }}
          >
            {theme === 'dark' ? <IconSun size={24} /> : <IconMoon size={24} />}
          </button>

          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

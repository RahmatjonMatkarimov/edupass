import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconFileDescription, IconMenu2, IconX } from '@tabler/icons-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="landing-nav">
      <div className="nav-container">
        <Link to="/" className="logo">
          <IconFileDescription size={32} />
          Edu<span>Pass</span>
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>

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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

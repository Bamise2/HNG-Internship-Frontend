import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🎫 TicketApp</h3>
            <p>Your ultimate ticket management solution</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/tickets">Tickets</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#twitter" aria-label="Twitter"><Twitter /></a>
              <a href="#github" aria-label="GitHub"><Github /></a>
              <a href="#linkedin" aria-label="LinkedIn"><Linkedin /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TicketApp. Built for HNG Internship Stage 2.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { HiHome, HiUserGroup, HiFolderOpen, HiMail } from 'react-icons/hi'
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">Kahon Studio</h3>
            <p className="footer-tagline">Creating digital experiences that matter</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#about"><HiUserGroup className="footer-link-icon" /> About</a></li>
                <li><a href="#team"><HiUserGroup className="footer-link-icon" /> Team</a></li>
                <li><a href="#projects"><HiFolderOpen className="footer-link-icon" /> Projects</a></li>
                <li><a href="#contact"><HiMail className="footer-link-icon" /> Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Connect</h4>
              <ul className="footer-list">
                <li><a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin className="footer-link-icon" /> LinkedIn</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer"><FaGithub className="footer-link-icon" /> GitHub</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter className="footer-link-icon" /> Twitter</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-link-icon" /> Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Kahon Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


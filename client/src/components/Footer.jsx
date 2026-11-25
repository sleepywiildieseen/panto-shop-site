import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h4 style={{ fontSize: 22 }}>Panto</h4>
        <p style={{ marginTop: 12 }}>The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.</p>
      </div>
      <div>
        <h4>Services</h4>
        <Link to="/catalog">Furniture</Link>
        <Link to="/catalog?category=beds">Beds</Link>
        <Link to="/catalog?category=chair">Chairs</Link>
      </div>
      <div>
        <h4>Follow Us</h4>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </div>
      <div>
        <h4>Contact</h4>
        <a href="mailto:hello@panto.com">hello@panto.com</a>
        <a href="tel:+78000000000">+7 (800) 000-00-00</a>
      </div>
    </footer>
  );
}
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [best, setBest] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.best().then(setBest).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search ? `/catalog?q=${encodeURIComponent(search)}` : '/catalog');
  };

  return (
    <>
      <section className="hero">
        <h1>Make Your Interior More Minimalistic & Modern</h1>
        <p>Turn your room with Panto into a lot more minimalist and modern with ease and speed</p>
        <form className="hero-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search furniture"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn" type="submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
      </section>

      <section className="section">
        <h2 className="section-title-center">Best Selling Product</h2>
        <div className="filters" style={{ justifyContent: 'center' }}>
          <Link to="/catalog?category=chair" className="chip">Chair</Link>
          <Link to="/catalog?category=beds" className="chip">Beds</Link>
          <Link to="/catalog?category=sofa" className="chip">Sofa</Link>
          <Link to="/catalog?category=lamp" className="chip">Lamp</Link>
        </div>
        <div className="grid">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/catalog" className="btn">View All →</Link>
        </div>
      </section>

      <section className="section-gray">
        <h2>Why Choosing Us</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          <div>
            <h3 style={{ marginBottom: 12 }}>Luxury facilities</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.</p>
            <Link to="/about" style={{ color: 'var(--accent)' }}>More info →</Link>
          </div>
          <div>
            <h3 style={{ marginBottom: 12 }}>Affordable Price</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Get a workspace of the highest quality at an affordable price and enjoy all-around facilities.</p>
            <Link to="/about" style={{ color: 'var(--accent)' }}>More info →</Link>
          </div>
          <div>
            <h3 style={{ marginBottom: 12 }}>Many Choices</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>We provide many unique work space choices so that you can choose the workspace to your liking.</p>
            <Link to="/about" style={{ color: 'var(--accent)' }}>More info →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
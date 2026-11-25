import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');

  const category = params.get('category') || '';
  const q = params.get('q') || '';

  useEffect(() => {
    setLoading(true);
    api.products({ category, sort, q })
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, sort, q]);

  const setCat = (slug) => {
    const p = new URLSearchParams(params);
    slug ? p.set('category', slug) : p.delete('category');
    setParams(p);
  };

  return (
    <section className="section">
      <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 12 }}>Our Furniture</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Choose from a wide range of minimalist furniture.</p>

      <div className="filters">
        <button className={`chip ${!category ? 'active' : ''}`} onClick={() => setCat('')}>All</button>
        <button className={`chip ${category === 'chair' ? 'active' : ''}`} onClick={() => setCat('chair')}>Chair</button>
        <button className={`chip ${category === 'beds' ? 'active' : ''}`} onClick={() => setCat('beds')}>Beds</button>
        <button className={`chip ${category === 'sofa' ? 'active' : ''}`} onClick={() => setCat('sofa')}>Sofa</button>
        <button className={`chip ${category === 'lamp' ? 'active' : ''}`} onClick={() => setCat('lamp')}>Lamp</button>
      </div>

      <div className="toolbar">
        <span style={{ color: 'var(--muted)' }}>{loading ? 'Загрузка...' : `${products.length} продуктов`}</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by: Popular</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {loading ? <div className="loading">Загрузка...</div> : (
        <div className="grid">
          {products.length ? products.map((p) => <ProductCard key={p.id} product={p} />) : <div className="empty">Ничего не найдено</div>}
        </div>
      )}
    </section>
  );
}
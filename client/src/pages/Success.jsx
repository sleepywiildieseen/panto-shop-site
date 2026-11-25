import { useLocation, Link } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId || '—';

  return (
    <section className="section">
      <div className="empty">
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2>Thank you for your order!</h2>
        <p style={{ margin: '12px 0 32px' }}>Order ID: <strong>#{orderId}</strong></p>
        <Link to="/catalog" className="btn">Continue shopping</Link>
      </div>
    </section>
  );
}
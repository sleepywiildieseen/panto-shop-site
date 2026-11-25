import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../CartContext';

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!cart.length) { navigate('/cart'); return; }
    const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
    setTotal(subtotal + 20);
  }, [cart, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const order = await api.createOrder({ address: `${name}, ${address}`, phone });
      navigate('/success', { state: { orderId: order.id } });
    } catch (e) { setError(e.message); }
  };

  return (
    <section className="section">
      <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 32 }}>Checkout</h1>
      <form className="form" onSubmit={submit}>
        <label>Full name</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ivan Ivanov" />
        <label>Phone</label>
        <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (900) 000-00-00" />
        <label>Delivery address</label>
        <textarea rows="3" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Moscow, Tverskaya st., 1" />
        <div style={{ color: 'var(--muted)', fontSize: 14 }}>Total: ${total.toFixed(2)}</div>
        <button type="submit" className="btn">Place Order</button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </section>
  );
}
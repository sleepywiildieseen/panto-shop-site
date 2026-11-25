import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../CartContext';

export default function Cart() {
  const { cart, refreshCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const update = async (id, qty) => {
    setLoading(true);
    try {
      if (qty < 1) await api.removeCart(id);
      else await api.updateCart(id, qty);
      await refreshCart();
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  if (!cart.length) {
    return (
      <section className="section">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: 24 }}>Add some furniture to continue</p>
          <Link to="/catalog" className="btn">Go shopping</Link>
        </div>
      </section>
    );
  }

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const total = subtotal + 20;

  return (
    <section className="section">
      <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 32 }}>Your Cart</h1>
      <div className="cart-layout">
        <div>
          {cart.map((i) => (
            <div className="cart-item" key={i.id}>
              <img src={i.product.imageUrl} alt={i.product.title} />
              <div>
                <div className="cart-item-title">{i.product.title}</div>
                <div className="cart-item-price">${i.product.price}</div>
              </div>
              <div className="qty">
                <button disabled={loading} onClick={() => update(i.id, i.quantity - 1)}>−</button>
                <span>{i.quantity}</span>
                <button disabled={loading} onClick={() => update(i.id, i.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" disabled={loading} onClick={() => update(i.id, 0)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Delivery</span><span>$20.00</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn" style={{ width: '100%', marginTop: 20, display: 'block' }}>Proceed to Checkout</Link>
        </div>
      </div>
    </section>
  );
}
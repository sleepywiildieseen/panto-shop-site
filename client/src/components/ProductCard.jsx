import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import Toast from './Toast';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.addToCart(product.id, 1);
      await refreshCart();
      setToast(true);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.title} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x220?text=Furniture'; }} />
      <div className="card-cat">{product.category?.name || 'Chair'}</div>
      <div className="card-title">{product.title}</div>
      <div className="card-rating">{'★'.repeat(Math.round(product.rating || 0))} {product.rating}</div>
      <div className="card-footer">
        <div className="card-price">${product.price}</div>
        <button className="card-add" onClick={addToCart}>+</button>
      </div>
      {toast && <Toast message="Добавлено в корзину!" onClose={() => setToast(false)} />}
    </div>
  );
}
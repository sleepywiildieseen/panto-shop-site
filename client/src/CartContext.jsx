import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }
    try {
      const items = await api.getCart();
      setCart(items);
    } catch {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
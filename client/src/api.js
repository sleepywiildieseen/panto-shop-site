const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API + path, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  products: (params = {}) => request('/products?' + new URLSearchParams(params)),
  best: () => request('/products/best'),
  product: (id) => request('/products/' + id),
  getCart: () => request('/cart'),
  addToCart: (productId, quantity = 1) => request('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCart: (id, quantity) => request('/cart/' + id, { method: 'PATCH', body: JSON.stringify({ quantity }) }),
  removeCart: (id) => request('/cart/' + id, { method: 'DELETE' }),
  createOrder: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
};
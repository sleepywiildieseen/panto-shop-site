import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.login({ email, password });
      login(data);
      navigate('/');
    } catch (e) { setError(e.message); }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h1>Welcome back</h1>
      <label>Email</label>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="btn">Login</button>
      {error && <p className="form-error">{error}</p>}
      <p className="form-link">Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
}
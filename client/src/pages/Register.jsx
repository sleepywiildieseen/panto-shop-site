import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.register({ firstName, email, password });
      login(data);
      navigate('/');
    } catch (e) { setError(e.message); }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h1>Create account</h1>
      <label>First name</label>
      <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <label>Email</label>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="btn">Register</button>
      {error && <p className="form-error">{error}</p>}
      <p className="form-link">Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
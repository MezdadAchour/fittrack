import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const userData = localStorage.getItem(email);
    if (!userData) {
      setError('Utilisateur non trouvé');
      return;
    }

    const { password: storedPassword } = JSON.parse(userData);
    if (password !== storedPassword) {
      setError('Mot de passe incorrect');
      return;
    }

    alert('Connexion réussie');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleLogin} className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
          <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Mot de passe oublié?
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        Pas encore de compte? <Link href="/register" className="text-blue-500 hover:text-blue-800">S'inscrire</Link>
      </p>
    </div>
  );
};

export default Login;
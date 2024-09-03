import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Composant de la page de connexion
const Login: React.FC = () => {
  // États pour gérer les champs du formulaire et les erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Vérification de l'existence de l'utilisateur
    const userData = localStorage.getItem(email);
    if (!userData) {
      setError('Utilisateur non trouvé');
      return;
    }

    // Vérification du mot de passe
    const { password: storedPassword } = JSON.parse(userData);
    if (password !== storedPassword) {
      setError('Mot de passe incorrect');
      return;
    }

    // Connexion réussie : stockage de l'utilisateur et redirection
    localStorage.setItem('currentUser', email);
    router.push('/workouts');
  };

  // Structure du formulaire
  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleLogin} className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {/* Champ email */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Champ mot de passe */}
        <div className="mb-6">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Affichage des erreurs */}
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {/* Bouton de connexion et lien mot de passe oublié */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
          >
            Se connecter
          </button>
          <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300">
            Mot de passe oublié?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
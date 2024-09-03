'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Interface pour les propriétés des liens de navigation
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

// Composant pour les liens de navigation
const NavLink = ({ href, children, mobile = false }: NavLinkProps) => (
  <Link href={href} passHref legacyBehavior>
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`block ${mobile ? 'py-2' : 'px-4'} text-gray-300 hover:text-white transition duration-200`}
    >
      {children}
    </motion.a>
  </Link>
);

// Composant Header principal
const Header = () => {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 bg-opacity-70 backdrop-blur-lg shadow-xl text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            FitTrack
          </motion.a>
        </Link>
        {/* Navigation pour desktop */}
        <nav className="hidden md:flex space-x-4">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/workouts">Entraînements</NavLink>
          <NavLink href="/stats">Statistiques</NavLink>
          <NavLink href="/profile">Profil</NavLink>
        </nav>
        {/* Bouton pour le menu mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-gray-300" />
        </button>
      </div>
      {/* Menu mobile */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gray-700 bg-opacity-50 rounded-b-3xl shadow-inner"
      >
        <nav className="px-4 py-2">
          <NavLink href="/" mobile>Accueil</NavLink>
          <NavLink href="/workouts" mobile>Entraînements</NavLink>
          <NavLink href="/stats" mobile>Statistiques</NavLink>
          <NavLink href="/profile" mobile>Profil</NavLink>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
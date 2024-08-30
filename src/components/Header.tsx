'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavLink = ({ href, children, mobile = false }: NavLinkProps) => (
  <Link href={href}>
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`block ${mobile ? 'py-2' : 'px-4'} text-gray-300 hover:text-white transition duration-200`}
    >
      {children}
    </motion.a>
  </Link>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold"
            >
              FitTrack
            </motion.a>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/workouts">Entraînements</NavLink>
            <NavLink href="/stats">Statistiques</NavLink>
            <NavLink href="/profile">Profil</NavLink>
          </nav>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden"
      >
        <nav className="px-4 py-2 bg-gray-800">
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

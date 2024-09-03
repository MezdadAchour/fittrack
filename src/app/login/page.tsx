"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Login from '@/components/Login';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Composant principal de la page de connexion
const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        {/* Conteneur principal avec animation */}
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Carte de connexion */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg">
            {/* Titre animé */}
            <motion.h1 
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Connexion
            </motion.h1>
            {/* Composant de formulaire de connexion */}
            <Login />
            {/* Lien vers la page d'inscription */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">Pas encore de compte ?</p>
              <Link 
                href="/register" 
                className="text-blue-400 hover:text-blue-300 transition duration-300"
              >
                Inscrivez-vous ici
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
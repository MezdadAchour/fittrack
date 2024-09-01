"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Register from '@/components/Register';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg">
            <motion.h1 
              className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Inscription
            </motion.h1>
            <Register />
            <div className="mt-6 text-center">
              <p className="text-gray-400">Vous avez déjà un compte ?</p>
              <a href="/login" className="text-blue-400 hover:text-blue-300 transition duration-300">Connectez-vous ici</a>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
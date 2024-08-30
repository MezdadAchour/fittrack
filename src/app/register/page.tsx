"use client";

import React from 'react';
import Register from '@/components/Register';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>
          <Register />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;

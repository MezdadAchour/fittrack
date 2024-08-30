"use client";

import React from 'react';
import Login from '@/components/Login';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
          <Login />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;

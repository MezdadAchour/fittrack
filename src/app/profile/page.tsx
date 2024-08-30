"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faTachometerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilePage: React.FC = () => {
  // State pour gérer les informations de l'utilisateur et le mode d'édition
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 28,
    weight: 70, // en kg
    height: 175 // en cm
  });

  // Fonction pour gérer la modification des informations de l'utilisateur
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profil
        </motion.h1>

        {/* Section Profil Utilisateur */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            <FontAwesomeIcon icon={faUser} className="mr-3" />
            Informations du Profil
          </h2>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-gray-400">Âge</label>
                <input
                  type="number"
                  name="age"
                  value={userInfo.age}
                  onChange={handleInputChange}
                  className="bg-gray-700 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-gray-400">Poids (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={userInfo.weight}
                  onChange={handleInputChange}
                  className="bg-gray-700 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-gray-400">Taille (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={userInfo.height}
                  onChange={handleInputChange}
                  className="bg-gray-700 p-2 rounded-lg w-full"
                />
              </div>
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 p-2 rounded-lg w-full text-white"
              >
                Sauvegarder
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xl font-semibold">{userInfo.name}</p>
              <p className="text-gray-400">Email: {userInfo.email}</p>
              <p className="text-gray-400">Âge: {userInfo.age} ans</p>
              <p className="text-gray-400">Poids: {userInfo.weight} kg</p>
              <p className="text-gray-400">Taille: {userInfo.height} cm</p>
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 p-2 rounded-lg w-full text-white"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Modifier
              </button>
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;

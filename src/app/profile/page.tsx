"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faTachometerAlt, faCalendarAlt, faWeight, faRulerVertical, faBirthdayCake, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Définir les types pour les props de InputField
interface InputFieldProps {
  icon: IconDefinition;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Définir les types pour les props de InfoField
interface InfoFieldProps {
  icon: IconDefinition;
  label: string;
  value: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 28,
    weight: 70,
    height: 175
  });

  const weightData = [
    { date: '1 Jan', weight: 72 },
    { date: '1 Feb', weight: 71 },
    { date: '1 Mar', weight: 70 },
    { date: '1 Apr', weight: 70 },
    { date: '1 May', weight: 69 },
  ];

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profil de {userInfo.name}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section Informations du Profil */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-3 text-blue-400" />
              Informations du Profil
            </h2>
            {isEditing ? (
              <div className="space-y-4">
                <InputField icon={faUser} name="name" value={userInfo.name} onChange={handleInputChange} />
                <InputField icon={faEnvelope} name="email" value={userInfo.email} onChange={handleInputChange} />
                <InputField icon={faBirthdayCake} name="age" value={userInfo.age} onChange={handleInputChange} />
                <InputField icon={faWeight} name="weight" value={userInfo.weight} onChange={handleInputChange} />
                <InputField icon={faRulerVertical} name="height" value={userInfo.height} onChange={handleInputChange} />
                <motion.button
                  onClick={handleEditToggle}
                  className="bg-blue-500 p-2 rounded-lg w-full text-white hover:bg-blue-600 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sauvegarder
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                <InfoField icon={faUser} label="Nom" value={userInfo.name} />
                <InfoField icon={faEnvelope} label="Email" value={userInfo.email} />
                <InfoField icon={faBirthdayCake} label="Âge" value={`${userInfo.age} ans`} />
                <InfoField icon={faWeight} label="Poids" value={`${userInfo.weight} kg`} />
                <InfoField icon={faRulerVertical} label="Taille" value={`${userInfo.height} cm`} />
                <motion.button
                  onClick={handleEditToggle}
                  className="bg-blue-500 p-2 rounded-lg w-full text-white hover:bg-blue-600 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Modifier
                </motion.button>
              </div>
            )}
          </motion.section>

          {/* Section Graphique de Poids */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3 text-green-400" />
              Évolution du Poids
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Line type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};


const InputField: React.FC<InputFieldProps> = ({ icon, name, value, onChange }) => (
  <div className="relative">
    <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-700 p-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);


const InfoField: React.FC<InfoFieldProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <FontAwesomeIcon icon={icon} className="text-gray-400" />
    <span className="text-gray-400">{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default ProfilePage;

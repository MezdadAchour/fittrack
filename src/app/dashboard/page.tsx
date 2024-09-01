"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDumbbell, faClock, faCalendarCheck, faChartLine, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Données factices pour la démonstration
const workoutData = [
  { date: '2023-08-01', duration: 45, calories: 300 },
  { date: '2023-08-03', duration: 60, calories: 400 },
  { date: '2023-08-05', duration: 30, calories: 200 },
  { date: '2023-08-07', duration: 75, calories: 500 },
  { date: '2023-08-09', duration: 45, calories: 350 },
  { date: '2023-08-11', duration: 90, calories: 600 },
  { date: '2023-08-13', duration: 60, calories: 450 },
];

const DashboardPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'duration' | 'calories'>('duration');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Tableau de Bord
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg"
          >
            <FontAwesomeIcon icon={faFire} className="text-3xl mb-4 text-orange-400" />
            <h2 className="text-xl font-semibold mb-2">Calories Brûlées</h2>
            <p className="text-4xl font-bold">2800</p>
            <p className="text-sm text-gray-400">Cette semaine</p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg"
          >
            <FontAwesomeIcon icon={faDumbbell} className="text-3xl mb-4 text-blue-400" />
            <h2 className="text-xl font-semibold mb-2">Entraînements</h2>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-gray-400">Ce mois</p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg"
          >
            <FontAwesomeIcon icon={faClock} className="text-3xl mb-4 text-green-400" />
            <h2 className="text-xl font-semibold mb-2">Temps Total</h2>
            <p className="text-4xl font-bold">8h 30m</p>
            <p className="text-sm text-gray-400">Ce mois</p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg"
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="text-3xl mb-4 text-purple-400" />
            <h2 className="text-xl font-semibold mb-2">Régularité</h2>
            <p className="text-4xl font-bold">85%</p>
            <p className="text-sm text-gray-400">Objectif atteint</p>
          </motion.div>
        </div>

        <motion.div 
          className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="mr-4 text-blue-400" />
              Progression
            </h2>
            <div className="space-x-2">
              <button 
                onClick={() => setSelectedMetric('duration')}
                className={`px-4 py-2 rounded-full ${selectedMetric === 'duration' ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                Durée
              </button>
              <button 
                onClick={() => setSelectedMetric('calories')}
                className={`px-4 py-2 rounded-full ${selectedMetric === 'calories' ? 'bg-blue-500' : 'bg-gray-700'}`}
              >
                Calories
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#E5E7EB' }}
              />
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="mr-4 text-yellow-400" />
            Objectifs Atteints
          </h2>
          <ul className="space-y-4">
            {['Courir 5km en moins de 25 minutes', 'Soulever 100kg au développé couché', 'Faire 50 pompes d\'affilée'].map((goal, index) => (
              <motion.li 
                key={index}
                className="bg-gray-700 bg-opacity-50 p-5 rounded-2xl shadow-inner flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FontAwesomeIcon icon={faCalendarCheck} className="text-green-400 mr-4" />
                {goal}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
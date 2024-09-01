'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faRunning, faClock, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getWorkoutStats } from '@/utils/storage';

const StatisticsPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    uniqueWorkoutTypes: 0,
    totalDuration: 0,
    averageDuration: 0,
    workoutsByType: {} as Record<string, number>
  });

  useEffect(() => {
    const workoutStats = getWorkoutStats();
    setStats(workoutStats);
  }, []);

  const chartData = Object.entries(stats.workoutsByType).map(([type, count]) => ({
    name: type,
    value: count
  }));

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
          Statistiques d'Entraînement
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            icon={faChartBar}
            title="Total des entraînements"
            value={stats.totalWorkouts}
            color="blue"
          />
          <StatCard
            icon={faRunning}
            title="Types d'entraînements"
            value={stats.uniqueWorkoutTypes}
            color="green"
          />
          <StatCard
            icon={faClock}
            title="Durée totale (min)"
            value={stats.totalDuration}
            color="yellow"
          />
          <StatCard
            icon={faFireAlt}
            title="Durée moyenne (min)"
            value={stats.averageDuration.toFixed(1)}
            color="red"
          />
        </div>

        <motion.section 
          className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Répartition des entraînements</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

const StatCard: React.FC<{ icon: any; title: string; value: number | string; color: string }> = ({ icon, title, value, color }) => (
  <motion.div 
    className={`bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg backdrop-blur-sm`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`text-${color}-400 mb-4`}>
      <FontAwesomeIcon icon={icon} size="2x" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </motion.div>
);

export default StatisticsPage;
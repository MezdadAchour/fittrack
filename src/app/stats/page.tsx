'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faRunning, faClock, faFireAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Workout, WorkoutStats } from '@/utils/types';

// Composant principal pour la page des statistiques
const StatisticsPage: React.FC = () => {
  // États pour stocker les statistiques et les entraînements
  const [stats, setStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    uniqueWorkoutTypes: 0,
    totalDuration: 0,
    averageDuration: 0,
    workoutsByType: {},
  });
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Chargement des données au montage du composant
  useEffect(() => {
    const loadedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]') as Workout[];
    setWorkouts(loadedWorkouts);
    updateStats(loadedWorkouts);
  }, []);

  // Mise à jour des statistiques
  const updateStats = (workouts: Workout[]) => {
    const newStats: WorkoutStats = {
      totalWorkouts: workouts.length,
      uniqueWorkoutTypes: new Set(workouts.map(w => w.exercise)).size,
      totalDuration: workouts.reduce((total, w) => total + w.duration, 0),
      averageDuration: workouts.length > 0 ? workouts.reduce((total, w) => total + w.duration, 0) / workouts.length : 0,
      workoutsByType: workouts.reduce((acc, w) => {
        acc[w.exercise] = (acc[w.exercise] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
    setStats(newStats);
  };

  // Préparation des données pour les graphiques
  const chartData = Object.entries(stats.workoutsByType).map(([type, count]) => ({
    name: type,
    value: count
  }));

  const workoutTrend = workouts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(workout => ({
      date: new Date(workout.date).toLocaleDateString(),
      duration: workout.duration
    }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Titre animé */}
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Statistiques d&apos;Entraînement
        </motion.h1>

        {/* Cartes de statistiques */}
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

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique en barres : Répartition des entraînements */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Répartition des entraînements</h2>
            <ResponsiveContainer width="100%" height={300}>
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

          {/* Graphique en ligne : Évolution de la durée des entraînements */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Évolution de la durée des entraînements</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workoutTrend}>
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="duration" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </motion.section>
        </div>

        {/* Liste des entraînements récents */}
        <motion.section 
          className="mt-12 bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-4 text-purple-400" />
            Calendrier des entraînements récents
          </h2>
          <div className="space-y-4">
            {workouts.slice(0, 5).map((workout, index) => (
              <div key={workout.id} className="flex justify-between items-center bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span>{new Date(workout.date).toLocaleDateString()}</span>
                <span>{workout.exercise}</span>
                <span>{workout.duration} min</span>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

// Composant pour afficher une carte de statistique
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
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faBell, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDataFromLocalStorage } from '@/utils/storage';

import { Workout } from '@/utils/types';

const DashboardPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // en minutes
  const [totalDistance, setTotalDistance] = useState(0); // en kilomètres

  useEffect(() => {
    const data = getDataFromLocalStorage();
    setWorkouts(data.workouts);

    // Calculer les statistiques
    setTotalWorkouts(data.workouts.length);
    setTotalTime(data.workouts.reduce((acc, workout) => acc + workout.duration, 0));
    setTotalDistance(data.workouts.reduce((acc, workout) => acc + workout.distance, 0)); // Assure-toi d'avoir ces champs dans Workout
  }, []);

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
          Tableau de Bord
        </motion.h1>

        {/* Section Statistiques */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            <FontAwesomeIcon icon={faChartLine} className="mr-3" />
            Statistiques Générales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold">{totalWorkouts}</p>
              <p className="text-gray-400">Entraînements Total</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold">{totalTime} min</p>
              <p className="text-gray-400">Heures d'Entraînement</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold">{totalDistance} km</p>
              <p className="text-gray-400">Distance Totale Courue</p>
            </div>
          </div>
        </section>

        {/* Section Objectifs en cours */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            <FontAwesomeIcon icon={faTrophy} className="mr-3" />
            Objectifs en cours
          </h2>
          <ul className="space-y-3">
            <li className="bg-gray-700 p-4 rounded-xl">Courir 5km en moins de 25 minutes</li>
            <li className="bg-gray-700 p-4 rounded-xl">Soulever 100kg au développé couché</li>
            <li className="bg-gray-700 p-4 rounded-xl">Faire 50 pompes d'affilée</li>
          </ul>
        </section>

        {/* Section Notifications */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">
            <FontAwesomeIcon icon={faBell} className="mr-3" />
            Notifications
          </h2>
          <ul className="space-y-3">
            <li className="bg-gray-700 p-4 rounded-xl">Rappel: Entraînement de course prévu demain</li>
            <li className="bg-gray-700 p-4 rounded-xl">Nouveau défi disponible: 30 jours de yoga</li>
            <li className="bg-gray-700 p-4 rounded-xl">Félicitations! Vous avez atteint votre objectif de pas cette semaine</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;

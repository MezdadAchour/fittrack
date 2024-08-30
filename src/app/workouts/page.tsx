"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDumbbell, faTrophy, faBell } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from "@nextui-org/calendar";
import { parseDate } from '@internationalized/date';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Workout as WorkoutType } from '@/utils/types';  // Assurez-vous que Workout est correctement exporté depuis ce fichier

const WorkoutsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsFormVisible(true);
  };

  const handleAddWorkout = (workout: Omit<WorkoutType, 'id' | 'date'>) => {
    const newWorkout: WorkoutType = {
      ...workout,
      id: Date.now().toString(),
      date: selectedDate.toISOString().split('T')[0],
    };
    setWorkouts(prevWorkouts => [newWorkout, ...prevWorkouts]);
    setIsFormVisible(false);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
  };

  const handleEditWorkout = (id: string, updatedWorkout: Omit<WorkoutType, 'id'>) => {
    setWorkouts(prevWorkouts => prevWorkouts.map(workout =>
      workout.id === id ? { ...updatedWorkout, id } : workout
    ));
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
          Gestion des Entraînements
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section className="bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
              Calendrier d'entraînement
            </h2>
            <Calendar 
              aria-label="Date de l'entraînement"
              defaultValue={parseDate(selectedDate.toISOString().split('T')[0])}
              onChange={(date) => handleDateChange(new Date(date.toDate('UTC')))}
              className="bg-gray-700 rounded-xl p-4"
            />
          </section>
          
          <AnimatePresence>
            {isFormVisible && (
              <motion.section
                className="bg-gray-800 p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  <FontAwesomeIcon icon={faDumbbell} className="mr-3" />
                  Ajouter un entraînement
                </h2>
                <WorkoutForm onAddWorkout={handleAddWorkout} selectedDate={selectedDate} />
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <section className="mt-10 bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">
            <FontAwesomeIcon icon={faDumbbell} className="mr-3" />
            Derniers entraînements
          </h2>
          {workouts.length === 0 ? (
            <motion.p
              className="text-center text-gray-400 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Aucun entraînement enregistré. Sélectionnez une date pour commencer !
            </motion.p>
          ) : (
            <WorkoutList 
              workouts={workouts} 
              onEdit={handleEditWorkout} 
              onDelete={handleDeleteWorkout} 
            />
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <section className="bg-gray-800 p-8 rounded-2xl shadow-xl">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkoutsPage;

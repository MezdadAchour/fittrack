"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDumbbell, faTrophy, faBell, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from '@nextui-org/calendar';
import { parseDate } from '@internationalized/date';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Workout as WorkoutType } from '@/utils/types';

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

  const calendarStyles = {
    wrapper: "bg-gray-800 bg-opacity-70 rounded-3xl p-4 shadow-xl",
    headerWrapper: "bg-transparent",
    headerTitle: "text-white font-bold",
    headerSubtitle: "text-gray-300",
    weekdayText: "text-blue-400 font-semibold",
    dayWrapper: "hover:bg-blue-600 rounded-full transition-colors duration-200",
    daySelected: "bg-blue-500 text-white",
    dayToday: "border-2 border-purple-500",
    dayInRange: "bg-blue-400 text-white",
    dayDisabled: "text-gray-500 hover:bg-transparent",
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
          Gestion des Entraînements
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-4 text-blue-400" />
              Calendrier d'entraînement
            </h2>
            <Calendar 
              aria-label="Date de l'entraînement"
              defaultValue={parseDate(selectedDate.toISOString().split('T')[0])}
              onChange={(date) => handleDateChange(new Date(date.toDate('UTC')))}
              className="bg-gray-700 bg-opacity-50 rounded-3xl p-4 shadow-inner w-72 h-81"
/>
          </motion.section>
          
          <AnimatePresence>
            {isFormVisible ? (
              <motion.section
                className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-semibold mb-6 flex items-center">
                  <FontAwesomeIcon icon={faDumbbell} className="mr-4 text-purple-400" />
                  Ajouter un entraînement
                </h2>
                <WorkoutForm onAddWorkout={handleAddWorkout} selectedDate={selectedDate} />
              </motion.section>
            ) : (
              <motion.div
                className="flex items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  onClick={() => setIsFormVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center space-x-3 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Nouvel entraînement</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.section 
          className="mt-12 bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <FontAwesomeIcon icon={faDumbbell} className="mr-4 text-green-400" />
            Derniers entraînements
          </h2>
          {workouts.length === 0 ? (
            <motion.p
              className="text-center text-gray-400 mt-8 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Aucun entraînement enregistré. Commencez par en ajouter un !
            </motion.p>
          ) : (
            <WorkoutList 
              workouts={workouts} 
              onEdit={handleEditWorkout} 
              onDelete={handleDeleteWorkout} 
            />
          )}
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faTrophy} className="mr-4 text-yellow-400" />
              Objectifs en cours
            </h2>
            <ul className="space-y-4">
              {['Courir 5km en moins de 25 minutes', 'Soulever 100kg au développé couché', 'Faire 50 pompes d\'affilée'].map((goal, index) => (
                <motion.li 
                  key={index}
                  className="bg-gray-700 bg-opacity-50 p-5 rounded-2xl shadow-inner"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {goal}
                </motion.li>
              ))}
            </ul>
          </motion.section>
          
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faBell} className="mr-4 text-red-400" />
              Notifications
            </h2>
            <ul className="space-y-4">
              {['Rappel: Entraînement de course prévu demain', 'Nouveau défi disponible: 30 jours de yoga', 'Félicitations! Vous avez atteint votre objectif de pas cette semaine'].map((notification, index) => (
                <motion.li 
                  key={index}
                  className="bg-gray-700 bg-opacity-50 p-5 rounded-2xl shadow-inner"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {notification}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkoutsPage;
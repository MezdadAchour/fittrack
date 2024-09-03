"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDumbbell, faTrophy, faBell, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from '@nextui-org/calendar';
import { parseDate } from '@internationalized/date';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Workout, WorkoutStats } from '@/utils/types';

// Composant principal de la page des entraînements
const WorkoutsPage: React.FC = () => {
  // États pour gérer les données et l'interface utilisateur
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    // Initialisation des entraînements depuis le localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('workouts');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    uniqueWorkoutTypes: 0,
    totalDuration: 0,
    averageDuration: 0,
    workoutsByType: {},
  });

  // Fonction pour mettre à jour les statistiques des entraînements
  const updateWorkoutStats = useCallback(() => {
    const stats: WorkoutStats = {
      totalWorkouts: workouts.length,
      uniqueWorkoutTypes: new Set(workouts.map(w => w.exercise)).size,
      totalDuration: workouts.reduce((total, w) => total + w.duration, 0),
      averageDuration: workouts.length > 0 ? workouts.reduce((total, w) => total + w.duration, 0) / workouts.length : 0,
      workoutsByType: workouts.reduce((acc, w) => {
        acc[w.exercise] = (acc[w.exercise] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
    setWorkoutStats(stats);
  }, [workouts]);

  // Effet pour sauvegarder les entraînements dans le localStorage et mettre à jour les stats
  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    updateWorkoutStats();
  }, [workouts, updateWorkoutStats]);

  // Gestion du changement de date dans le calendrier
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsFormVisible(true);
    setEditingWorkout(null);
  };

  // Ajout d'un nouvel entraînement
  const handleAddWorkout = (workout: Omit<Workout, 'id' | 'date'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
      date: selectedDate.toISOString().split('T')[0],
    };
    setWorkouts(prevWorkouts => [newWorkout, ...prevWorkouts]);
    setIsFormVisible(false);
  };

  // Suppression d'un entraînement
  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
  };

  // Début de l'édition d'un entraînement
  const handleStartEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    setSelectedDate(new Date(workout.date));
    setIsFormVisible(true);
  };

  // Mise à jour d'un entraînement existant
  const handleEditWorkout = (updatedWorkout: Omit<Workout, 'id'>) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(workout =>
        workout.id === editingWorkout?.id ? { ...updatedWorkout, id: workout.id } : workout
      )
    );
    setEditingWorkout(null);
    setIsFormVisible(false);
  };

  // Annulation de l'édition
  const handleCancelEdit = () => {
    setEditingWorkout(null);
    setIsFormVisible(false);
  };

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
          Gestion des Entraînements
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Section du calendrier */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-4 text-blue-400" />
              Calendrier d&apos;entraînement
            </h2>
            <div className="grid place-items-center">
              <Calendar 
                 aria-label="Date de l'entraînement"
                 defaultValue={parseDate(selectedDate.toISOString().split('T')[0])}
                 onChange={(date) => handleDateChange(new Date(date.toDate('UTC')))}
                 className="bg-gray-700 bg-opacity-50 rounded-3xl p-4 shadow-inner w-72 h-81"
               />
            </div>
          </motion.section>
          
          {/* Section du formulaire d'entraînement (visible/caché dynamiquement) */}
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
                  {editingWorkout ? "Modifier l'entraînement" : "Ajouter un entraînement"}
                </h2>
                <WorkoutForm
                  onAddWorkout={handleAddWorkout}
                  onEditWorkout={handleEditWorkout}
                  selectedDate={selectedDate}
                  editingWorkout={editingWorkout}
                  onCancel={handleCancelEdit}
                />
              </motion.section>
            ) : (
              // Bouton pour afficher le formulaire quand il est caché
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

        {/* Liste des entraînements */}
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
              onEdit={handleStartEditWorkout} 
              onDelete={handleDeleteWorkout} 
            />
          )}
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Section des statistiques */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faTrophy} className="mr-4 text-yellow-400" />
              Statistiques
            </h2>
            <div className="text-lg">
              <p>Total des entraînements : {workoutStats.totalWorkouts}</p>
              <p>Types d&apos;entraînements uniques : {workoutStats.uniqueWorkoutTypes}</p>
              <p>Durée totale : {workoutStats.totalDuration} min</p>
              <p>Durée moyenne : {workoutStats.averageDuration.toFixed(2)} min</p>
              <p>Entraînements par type : </p>
              <ul>
                {Object.entries(workoutStats.workoutsByType).map(([type, count]) => (
                  <li key={type}>{type} : {count}</li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Section des notifications (à implémenter) */}
          <motion.section 
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faBell} className="mr-4 text-red-400" />
              Notifications
            </h2>
            <p>Vous pouvez ajouter des notifications ici pour vous rappeler vos prochains entraînements ou objectifs.</p>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkoutsPage;
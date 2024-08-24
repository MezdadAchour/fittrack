"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Workout {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
}

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
    };
    setWorkouts(prevWorkouts => [newWorkout, ...prevWorkouts]);
    setIsFormVisible(false);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
  };

  const handleEditWorkout = (id: string, updatedWorkout: Omit<Workout, 'id'>) => {
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
        
        <motion.button
          className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => setIsFormVisible(prev => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFormVisible ? 'Masquer le formulaire' : 'Ajouter un entraînement'}
        </motion.button>

        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WorkoutForm onAddWorkout={handleAddWorkout} />
            </motion.div>
          )}
        </AnimatePresence>

        {workouts.length === 0 ? (
          <motion.p
            className="text-center text-gray-400 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
      </main>
      <Footer />
    </div>
  );
};

export default WorkoutsPage;

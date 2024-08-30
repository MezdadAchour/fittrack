import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Workout } from '@/utils/types';

interface WorkoutFormProps {
  onAddWorkout: (workout: Workout) => void;
  selectedDate: Date;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onAddWorkout, selectedDate }) => {
  const [workout, setWorkout] = useState<Workout>({
    id: '',
    exercise: '',
    sets: 0,
    reps: 0,
    weight: 0,
    duration: 0,
    date: selectedDate.toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkout(prev => ({
      ...prev,
      [name]: name === 'exercise' ? value : Number(value),
      date: selectedDate.toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWorkout({ ...workout, id: Date.now().toString() });
    setWorkout({
      id: '',
      exercise: '',
      sets: 0,
      reps: 0,
      weight: 0,
      duration: 0,
      date: selectedDate.toISOString().split('T')[0]
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="exercise"
        placeholder="Exercice"
        value={workout.exercise}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          name="sets"
          placeholder="Séries"
          value={workout.sets || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="number"
          name="reps"
          placeholder="Répétitions"
          value={workout.reps || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="number"
          name="weight"
          placeholder="Poids (kg)"
          value={workout.weight || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="number"
          name="duration"
          placeholder="Durée (minutes)"
          value={workout.duration || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <p className="text-gray-400">Date sélectionnée : {selectedDate.toLocaleDateString()}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Ajouter Entraînement
      </motion.button>
    </motion.form>
  );
};

export default WorkoutForm;

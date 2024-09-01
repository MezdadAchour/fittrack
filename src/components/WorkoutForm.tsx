import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faLayerGroup, faRepeat, faWeight, faClock } from '@fortawesome/free-solid-svg-icons';
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

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
    blur: { scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div
        variants={inputVariants}
        whileFocus="focus"
        className="relative"
      >
        <FontAwesomeIcon icon={faDumbbell} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="exercise"
          placeholder="Exercice"
          value={workout.exercise}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </motion.div>
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative"
        >
          <FontAwesomeIcon icon={faLayerGroup} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="sets"
            placeholder="Séries"
            value={workout.sets || ''}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </motion.div>
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative"
        >
          <FontAwesomeIcon icon={faRepeat} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="reps"
            placeholder="Répétitions"
            value={workout.reps || ''}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative"
        >
          <FontAwesomeIcon icon={faWeight} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="weight"
            placeholder="Poids (kg)"
            value={workout.weight || ''}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </motion.div>
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative"
        >
          <FontAwesomeIcon icon={faClock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="duration"
            placeholder="Durée (minutes)"
            value={workout.duration || ''}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </motion.div>
      </div>
      <p className="text-gray-400 text-center">Date sélectionnée : {new Date(selectedDate).toLocaleDateString()}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 font-semibold text-lg shadow-lg"
      >
        Ajouter Entraînement
      </motion.button>
    </motion.form>
  );
};

export default WorkoutForm;
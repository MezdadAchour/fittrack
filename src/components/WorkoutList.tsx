import { useState } from 'react';
import { motion } from 'framer-motion';

interface Workout {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
}

const WorkoutForm = ({ onAddWorkout }: { onAddWorkout: (workout: Workout) => void }) => {
  const [workout, setWorkout] = useState<Workout>({
    exercise: '',
    sets: 0,
    reps: 0,
    weight: 0,
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWorkout(workout);
    setWorkout({ exercise: '', sets: 0, reps: 0, weight: 0, date: '' });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <div className="space-y-4">
        <input
          type="text"
          name="exercise"
          placeholder="Exercice"
          value={workout.exercise}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="sets"
            placeholder="Séries"
            value={workout.sets}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="number"
            name="reps"
            placeholder="Répétitions"
            value={workout.reps}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <input
          type="number"
          name="weight"
          placeholder="Poids (kg)"
          value={workout.weight}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="date"
          name="date"
          value={workout.date}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
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
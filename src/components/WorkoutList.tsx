import React from 'react';
import { motion } from 'framer-motion';
import { Workout } from '@/utils/types';

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (id: string, updatedWorkout: Omit<Workout, 'id'>) => void;
  onDelete: (id: string) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {workouts.map(workout => (
        <motion.div
          key={workout.id}
          className="bg-gray-700 p-4 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-2">{workout.exercise}</h3>
          <p>Séries: {workout.sets}</p>
          <p>Répétitions: {workout.reps}</p>
          <p>Poids: {workout.weight} kg</p>
          <p>Durée: {workout.duration} minutes</p>
          <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => onEdit(workout.id, {
                exercise: workout.exercise,
                sets: workout.sets,
                reps: workout.reps,
                weight: workout.weight,
                duration: workout.duration,
                date: workout.date
              })}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Éditer
            </button>
            <button
              onClick={() => onDelete(workout.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkoutList;

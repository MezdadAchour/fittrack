import React from 'react';
import { Workout } from '@/utils/types';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <motion.div
          key={workout.id}
          className="bg-gray-700 p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">{workout.exercise}</h3>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(workout)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => onDelete(workout.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          <div className="mt-2 text-gray-300">
            <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
            <p>Séries: {workout.sets}</p>
            <p>Répétitions: {workout.reps}</p>
            <p>Poids: {workout.weight} kg</p>
            <p>Durée: {workout.duration} minutes</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkoutList;
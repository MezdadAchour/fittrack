import React from 'react';
import { Workout } from '@/utils/types';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faDumbbell, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

// Définition des props du composant
interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

// Composant principal WorkoutList
const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <motion.div
          key={workout.id}
          className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faDumbbell} className="mr-3 text-blue-400" />
              {workout.exercise}
            </h3>
            <div className="space-x-3">
              <button
                onClick={() => onEdit(workout)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => onDelete(workout.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-green-400" />
              <p>{new Date(workout.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2 text-yellow-400" />
              <p>{workout.duration} minutes</p>
            </div>
            <p><span className="font-semibold">Séries:</span> {workout.sets}</p>
            <p><span className="font-semibold">Répétitions:</span> {workout.reps}</p>
            <p><span className="font-semibold">Poids:</span> {workout.weight} kg</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkoutList;
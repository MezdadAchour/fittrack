import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faDumbbell, faLayerGroup, faRepeat, faWeight, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Workout } from '@/utils/types';

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (id: string, updatedWorkout: Omit<Workout, 'id'>) => void;
  onDelete: (id: string) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onEdit, onDelete }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <AnimatePresence>
        {workouts.map(workout => (
          <motion.div
            key={workout.id}
            variants={itemVariants}
            exit="exit"
            layout
            className="bg-gray-700 bg-opacity-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold flex items-center">
                <FontAwesomeIcon icon={faDumbbell} className="mr-3 text-blue-400" />
                {workout.exercise}
              </h3>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(workout.id, {
                    exercise: workout.exercise,
                    sets: workout.sets,
                    reps: workout.reps,
                    weight: workout.weight,
                    duration: workout.duration,
                    date: workout.date
                  })}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(workout.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </motion.button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2 text-purple-400" />
                <span>Séries: {workout.sets}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faRepeat} className="mr-2 text-green-400" />
                <span>Répétitions: {workout.reps}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faWeight} className="mr-2 text-yellow-400" />
                <span>Poids: {workout.weight} kg</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2 text-red-400" />
                <span>Durée: {workout.duration} min</span>
              </div>
              <div className="flex items-center col-span-2 md:col-span-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-400" />
                <span>Date: {new Date(workout.date).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorkoutList;
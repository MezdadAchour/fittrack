import { motion } from 'framer-motion';

const RecentWorkouts = () => {
  const workouts = [
    { id: 1, name: 'Course à pied', date: '2023-08-22', duration: '30 min' },
    { id: 2, name: 'Musculation', date: '2023-08-20', duration: '45 min' },
    { id: 3, name: 'Yoga', date: '2023-08-18', duration: '60 min' },
  ];

  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Entraînements récents</h2>
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li key={workout.id} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{workout.name}</p>
              <p className="text-sm text-gray-400">{workout.date}</p>
            </div>
            <span className="bg-blue-600 px-2 py-1 rounded text-sm">{workout.duration}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RecentWorkouts;
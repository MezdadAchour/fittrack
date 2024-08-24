import { motion } from 'framer-motion';

const FitnessGoals = () => {
  const goals = [
    { id: 1, name: 'Perdre 5 kg', progress: 60 },
    { id: 2, name: 'Courir 5 km', progress: 80 },
    { id: 3, name: 'Méditer 10 min/jour', progress: 40 },
  ];

  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Objectifs de fitness</h2>
      <ul className="space-y-4">
        {goals.map((goal) => (
          <li key={goal.id}>
            <p className="font-semibold mb-2">{goal.name}</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-400 mt-1">{goal.progress}%</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FitnessGoals;
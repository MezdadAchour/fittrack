import { motion } from 'framer-motion';

const DashboardSummary = () => {
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Résumé</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-400">Total des entraînements</p>
          <p className="text-3xl font-bold">28</p>
        </div>
        <div>
          <p className="text-gray-400">Calories brûlées (cette semaine)</p>
          <p className="text-3xl font-bold">1,540</p>
        </div>
        <div>
          <p className="text-gray-400">Temps total d'entraînement</p>
          <p className="text-3xl font-bold">12h 30m</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSummary;
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = () => {
  const data = [
    { name: 'Jan', weight: 80 },
    { name: 'Feb', weight: 79 },
    { name: 'Mar', weight: 78 },
    { name: 'Apr', weight: 77 },
    { name: 'May', weight: 76 },
    { name: 'Jun', weight: 75 },
  ];

  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Suivi du poids</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
          <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ProgressChart;
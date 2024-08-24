import { motion } from 'framer-motion';

const UserProfile = () => {
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Profil</h2>
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src="/api/placeholder/100/100" 
          alt="Profile" 
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">John Doe</h3>
          <p className="text-gray-400">Membre depuis 2023</p>
        </div>
      </div>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="text-gray-400">Âge</span>
          <span>30 ans</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">Taille</span>
          <span>175 cm</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">Poids actuel</span>
          <span>75 kg</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-400">Objectif</span>
          <span>Perte de poids</span>
        </li>
      </ul>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
        Éditer le profil
      </button>
    </motion.div>
  );
};

export default UserProfile;
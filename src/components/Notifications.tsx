import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTrophy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Type pour les différents types de notifications
type NotificationType = 'reminder' | 'achievement' | 'info';

// Interface pour la structure d'une notification
interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

const Notifications = () => {
  // Tableau de notifications (à remplacer par des données dynamiques dans une vraie application)
  const notifications: Notification[] = [
    { id: 1, message: "N'oubliez pas votre séance de course à 18h!", type: 'reminder' },
    { id: 2, message: "Bravo ! Vous avez atteint votre objectif de méditation.", type: 'achievement' },
    { id: 3, message: "Nouvelle recette protéinée disponible !", type: 'info' },
  ];

  // Fonction pour obtenir l'icône correspondant au type de notification
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'reminder': return faBell;
      case 'achievement': return faTrophy;
      case 'info': return faInfoCircle;
      default: return faInfoCircle; // Icône par défaut
    }
  };

  // Rendu du composant
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {/* Mapping des notifications */}
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start space-x-3">
            <FontAwesomeIcon icon={getIcon(notification.type)} className="text-2xl" />
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Notifications;
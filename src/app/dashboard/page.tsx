'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDumbbell, faTrophy, faBell } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type WorkoutEntry = {
  date: Date;
  workout: string;
};

const DashboardPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([]);
  const [newWorkout, setNewWorkout] = useState<string>('');

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const handleAddWorkout = () => {
    if (newWorkout.trim() !== '') {
      setWorkoutEntries([...workoutEntries, { date: selectedDate, workout: newWorkout }]);
      setNewWorkout('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">FitTrack - Tableau de bord</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Calendrier d'entraînement
            </h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="bg-white text-gray-900 rounded-lg"
            />
            <div className="mt-4">
              <input
                type="text"
                value={newWorkout}
                onChange={(e) => setNewWorkout(e.target.value)}
                placeholder="Ajouter un entraînement"
                className="w-full p-2 bg-gray-700 rounded"
              />
              <button
                onClick={handleAddWorkout}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Ajouter
              </button>
            </div>
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              Derniers entraînements
            </h2>
            <ul>
              {workoutEntries.slice(-5).reverse().map((entry, index) => (
                <li key={index} className="mb-2">
                  {entry.date.toLocaleDateString()} - {entry.workout}
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              Objectifs en cours
            </h2>
            <ul>
              <li>Courir 5km en moins de 25 minutes</li>
              <li>Soulever 100kg au développé couché</li>
              <li>Faire 50 pompes d'affilée</li>
            </ul>
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Notifications
            </h2>
            <ul>
              <li>Rappel: Entraînement de course prévu demain</li>
              <li>Nouveau défi disponible: 30 jours de yoga</li>
              <li>Félicitations! Vous avez atteint votre objectif de pas cette semaine</li>
            </ul>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-800 p-4 mt-8 text-center">
        <p>&copy; 2024 FitTrack. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
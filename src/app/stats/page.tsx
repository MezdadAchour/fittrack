"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardSummary from '@/components/DashboardSummary';
import RecentWorkouts from '@/components/RecentWorkouts';
import FitnessGoals from '@/components/FitnessGoals';
import ProgressChart from '@/components/ProgressChart';
import Notifications from '@/components/Notifications';
import UserProfile from '@/components/UserProfile';

// Composant Spinner pour le chargement
const Spinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => setLoading(false), 1000);

    // Nettoyer le timeout si le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Bienvenue sur FitTrack</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardSummary />
          <RecentWorkouts />
          <FitnessGoals />
          <ProgressChart />
          <Notifications />
          <UserProfile />
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transformez votre vie avec FitTrack
          </motion.h1>
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Suivez vos entraînements, fixez des objectifs et voyez vos progrès comme jamais auparavant.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-x-4"
          >
            <Link 
              href="/register" 
              className="bg-gray-700 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition duration-300"
            >
              S'inscrire
            </Link>
            <Link 
              href="/login" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Se connecter
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Suivi des entraînements" 
                description="Enregistrez facilement vos séances et suivez vos performances."
                icon="📊"
              />
              <FeatureCard 
                title="Objectifs personnalisés" 
                description="Fixez des objectifs réalistes et suivez vos progrès."
                icon="🎯"
              />
              <FeatureCard 
                title="Analyses détaillées" 
                description="Obtenez des insights sur vos performances et votre progression."
                icon="📈"
              />
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Ce que disent nos utilisateurs</h2>
            <blockquote className="text-2xl italic mb-4">
              "FitTrack a complètement changé ma façon de m'entraîner. Je n'ai jamais été aussi motivé !"
            </blockquote>
            <p className="text-gray-400">- Marie D., utilisatrice depuis 6 mois</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre vie ?</h2>
            <Link 
              href="/register" 
              className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Rejoignez-nous maintenant
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const FeatureCard = ({ title, description, icon }) => (
  <motion.div 
    className="bg-gray-700 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

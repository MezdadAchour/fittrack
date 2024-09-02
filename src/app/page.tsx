"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDumbbell, faBullseye, faChartLine, faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconDefinition;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <motion.div 
    className="bg-gray-700 bg-opacity-50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <FontAwesomeIcon icon={icon} className="text-4xl mb-4 text-blue-400" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => (
  <motion.div 
    className="bg-gray-700 bg-opacity-50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <blockquote className="text-lg italic mb-4">{quote}</blockquote>
    <p className="text-gray-400">- {author}</p>
  </motion.div>
);

export default function Home() {
  const [activeTip, setActiveTip] = useState(0);
  const tips = [
    "Commencez doucement et augmentez progressivement l'intensité.",
    "Restez hydraté pendant vos entraînements.",
    "N'oubliez pas l'importance de la récupération.",
    "Variez vos exercices pour éviter la monotonie.",
    "Fixez-vous des objectifs réalistes et mesurables."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prevTip) => (prevTip + 1) % tips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [tips.length]); // Ajout de tips.length (pour deploiment)
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="py-20 px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transformez votre vie avec FitTrack
          </motion.h1>
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto text-gray-300"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Suivez vos entraînements, fixez des objectifs et voyez vos progrès comme jamais auparavant.
          </motion.p>
          <motion.div
            className="space-x-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col space-y-4">
            <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg">
              Commencer maintenant
            </Link>
            <Link href="/login" className="bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg">
              Se connecter
            </Link>

      </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Suivi des entraînements" 
                description="Enregistrez facilement vos séances et suivez vos performances en temps réel."
                icon={faDumbbell}
              />
              <FeatureCard 
                title="Objectifs personnalisés" 
                description="Fixez des objectifs réalistes et suivez vos progrès avec des visualisations claires."
                icon={faBullseye}
              />
              <FeatureCard 
                title="Analyses détaillées" 
                description="Obtenez des insights sur vos performances et votre progression avec des graphiques interactifs."
                icon={faChartLine}
              />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Rejoignez notre communauté</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <FontAwesomeIcon icon={faUsers} className="text-6xl mb-6 text-purple-500" />
                <p className="text-xl mb-6">Connectez-vous avec d&apos;autres passionnés de fitness, partagez vos succès et motivez-vous mutuellement.</p>
                <Link href="/community" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-lg">
                  Explorer la communauté
                </Link>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg">
                <h3 className="text-2xl font-semibold mb-4">Conseil du jour</h3>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTip}
                    className="text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {tips[activeTip]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Ce que disent nos utilisateurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="FitTrack a complètement changé ma façon de m'entraîner. Je n'ai jamais été aussi motivé !"
                author="Marie D., utilisatrice depuis 6 mois"
              />
              <TestimonialCard 
                quote="Les analyses détaillées m'ont permis de comprendre mes points forts et mes faiblesses. C'est incroyable !"
                author="Thomas L., utilisateur depuis 1 an"
              />
              <TestimonialCard 
                quote="La communauté FitTrack est incroyablement motivante. J'adore partager mes progrès et encourager les autres."
                author="Sophie M., utilisatrice depuis 3 mois"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre vie ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Rejoignez FitTrack aujourd&apos;hui et commencez votre voyage vers une meilleure version de vous-même.</p>
            <Link href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg inline-flex items-center">
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              Commencer gratuitement
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
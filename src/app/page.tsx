"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; //type pour les icons
import { faDumbbell, faBullseye, faChartLine, faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Interface pour définir les props de FeatureCard
interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconDefinition;
  imageSrc: string;
}

// Composant FeatureCard pour afficher les fonctionnalités
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, imageSrc }) => (
  <motion.div 
    className="bg-gray-800 bg-opacity-50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg overflow-hidden relative group h-[500px]"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative z-10 h-full flex flex-col justify-center items-center">
      <div className="text-center">
        <FontAwesomeIcon icon={icon} className="text-4xl mb-4 text-blue-400" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
      <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" className="rounded-3xl" />
    </div>
  </motion.div>
);

// Interface pour définir les props de TestimonialCard
interface TestimonialCardProps {
  quote: string;
  author: string;
  imageSrc: string;
}

// Composant TestimonialCard pour afficher les témoignages
const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, imageSrc }) => (
  <motion.div 
    className="bg-gray-800 bg-opacity-50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg relative overflow-hidden group h-[500px]"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
      <blockquote className="text-lg italic mb-4">{quote}</blockquote>
      <p className="text-gray-400">- {author}</p>
    </div>
    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
      <Image src={imageSrc} alt={author} layout="fill" objectFit="cover" className="rounded-3xl" />
    </div>
  </motion.div>
);

// Composant pour l'arrière-plan fluide
const FluidBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50" />
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        </filter>
      </defs>
      <g filter="url(#goo)">
        {[...Array(40)].map((_, index) => (  
          <circle
            key={index}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 50 + 10}
            fill={`rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3)`}
          >
            <animate
              attributeName="cx"
              from={Math.random() * 100 + "%"}
              to={Math.random() * 100 + "%"}
              dur={Math.random() * 10 + 10 + "s"}  
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              from={Math.random() * 100 + "%"}
              to={Math.random() * 100 + "%"}
              dur={Math.random() * 10 + 10 + "s"}  
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  </div>
);


// Composant principal de la page d'accueil
export default function Home() {
  // État pour gérer les conseils affichés
  const [activeTip, setActiveTip] = useState(0);
  const tips = [
    "Commencez doucement et augmentez progressivement l'intensité.",
    "Restez hydraté pendant vos entraînements.",
    "N'oubliez pas l'importance de la récupération.",
    "Variez vos exercices pour éviter la monotonie.",
    "Fixez-vous des objectifs réalistes et mesurables."
  ];

  // Effet pour changer automatiquement les conseils
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prevTip) => (prevTip + 1) % tips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [tips.length]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative">
      <FluidBackground />
      <Header />
      <main className="flex-grow relative z-10">
        {/* Section Hero */}
        <section className="h-screen relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/statue1.jpg" alt="Hero background" layout="fill" objectFit="cover" className="opacity-30" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transformez votre vie avec FitTrack
            </motion.h1>
            <motion.p 
              className="text-xl mb-10 max-w-2xl mx-auto text-gray-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Suivez vos entraînements, fixez des objectifs et voyez vos progrès comme jamais auparavant.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/register" className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg text-center">
                Commencer maintenant
              </Link>
              <Link href="/login" className="bg-gray-700 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg text-center">
                Se connecter
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section Fonctionnalités */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Suivi des entraînements" 
                description="Enregistrez facilement vos séances et suivez vos performances en temps réel."
                icon={faDumbbell}
                imageSrc="/images/statue2.jpg"
              />
              <FeatureCard 
                title="Objectifs personnalisés" 
                description="Fixez des objectifs réalistes et suivez vos progrès avec des visualisations claires."
                icon={faBullseye}
                imageSrc="/images/statue3.jpg"
              />
              <FeatureCard 
                title="Analyses détaillées" 
                description="Obtenez des insights sur vos performances et votre progression avec des graphiques interactifs."
                icon={faChartLine}
                imageSrc="/images/statue4.jpg"
              />
            </div>
          </div>
        </section>

        {/* Section Communauté */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Rejoignez notre communauté</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <FontAwesomeIcon icon={faUsers} className="text-6xl mb-6 text-purple-500" />
                <p className="text-xl mb-6">Connectez-vous avec d&apos;autres passionnés de fitness, partagez vos succès et motivez-vous mutuellement.</p>
                <Link href="/community" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-lg inline-block">
                  Explorer la communauté
                </Link>
              </div>
              <div className="relative h-[400px] w-full">
                <Image src="/images/statue5.jpg" alt="Community" layout="fill" objectFit="cover" className="rounded-lg shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
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
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Ce que disent nos utilisateurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="FitTrack a complètement changé ma façon de m'entraîner. Je n'ai jamais été aussi motivé !"
                author="Marie D., utilisatrice depuis 6 mois"
                imageSrc="/images/statue6.jpg"
              />
              <TestimonialCard 
                quote="Les analyses détaillées m'ont permis de comprendre mes points forts et mes faiblesses. C'est incroyable !"
                author="Thomas L., utilisateur depuis 1 an"
                imageSrc="/images/statue7.jpg"
              />
              <TestimonialCard 
                quote="La communauté FitTrack est incroyablement motivante. J'adore partager mes progrès et encourager les autres."
                author="Sophie M., utilisatrice depuis 3 mois"
                imageSrc="/images/statue1.jpg"
              />
            </div>
          </div>
        </section>

        {/* call to action Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre vie ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Rejoignez FitTrack aujourd&apos;hui et commencez votre voyage vers une meilleure version de vous-même.</p>
            <Link href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg inline-flex items-center">
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              Commencer gratuitement
            </Link>
          </div>
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/statue2.jpg" alt="Background" layout="fill" objectFit="cover" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
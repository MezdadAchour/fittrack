import { motion } from 'framer-motion';
import Link from 'next/link';

// Types pour les props des composants FooterLink et SocialLink
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

interface SocialLinkProps {
  href: string;
  aria: string;
  children: React.ReactNode;
}

// Composant pour les liens du footer
// Utilisation de motion pour l'animation au survol
const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className="text-gray-400 hover:text-white transition duration-300"
        whileHover={{ x: 5 }}
      >
        {children}
      </motion.a>
    </Link>
  </li>
);

// Composant pour les liens des réseaux sociaux
// Animation au survol vers le haut
const SocialLink = ({ href, aria, children }: SocialLinkProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={aria}
    className="text-gray-400 hover:text-white transition duration-300"
    whileHover={{ y: -3 }}
  >
    {children}
  </motion.a>
);

// Composant principal du footer
const Footer = () => {
  // Récupération de l'année en cours pour le copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Grille responsive pour le contenu du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section logo et description */}
          <div>
            <motion.h3 
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              FitTrack
            </motion.h3>
            <p className="text-gray-400">
              Votre compagnon fitness personnel pour atteindre vos objectifs.
            </p>
          </div>
          
          {/* Sections de liens */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <FooterLink href="/workouts">Entraînements</FooterLink>
              <FooterLink href="/stats">Statistiques</FooterLink>
              <FooterLink href="/profile">Profil</FooterLink>
              <FooterLink href="/settings">Paramètres</FooterLink>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              <FooterLink href="/blog">Blog Fitness</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
              <FooterLink href="/community">Communauté</FooterLink>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <FooterLink href="/privacy">Politique de confidentialité</FooterLink>
              <FooterLink href="/terms">Conditions d&apos;utilisation</FooterLink>
              <FooterLink href="/cookies">Politique des cookies</FooterLink>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} FitTrack. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <SocialLink href="https://twitter.com" aria="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://facebook.com" aria="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://instagram.com" aria="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.253 1.805-.415 2.227a3.804 3.804 0 01-.896 1.382c-.42.418-.818.678-1.38.895-.423.165-1.057.36-2.228.415-1.266.057-1.646.074-4.85.074-3.204 0-3.585-.015-4.85-.072-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.381-.895-.419-.42-.679-.819-.896-1.382-.164-.422-.36-1.057-.413-2.227-.057-1.265-.074-1.646-.074-4.85s.015-3.584.072-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.381.42-.42.819-.679 1.381-.896.422-.166 1.057-.36 2.227-.415 1.266-.057 1.646-.072 4.85-.072zM12 5.838c-3.407 0-6.163 2.756-6.163 6.163 0 3.407 2.756 6.162 6.163 6.162 3.407 0 6.162-2.755 6.162-6.162 0-3.407-2.755-6.163-6.162-6.163zm0 10.167c-2.212 0-4.004-1.792-4.004-4.004 0-2.212 1.792-4.004 4.004-4.004s4.004 1.792 4.004 4.004c0 2.212-1.792 4.004-4.004 4.004zm6.406-10.723c-.796 0-1.44.645-1.44 1.44 0 .796.644 1.44 1.44 1.44.795 0 1.439-.644 1.439-1.44 0-.795-.644-1.44-1.439-1.44z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://linkedin.com" aria="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.049 3H4.947A1.946 1.946 0 003 4.947v14.102A1.946 1.946 0 004.947 21h14.102A1.946 1.946 0 0021 19.049V4.947A1.946 1.946 0 0019.049 3zM8.757 18.049H6.299V10.86h2.458v7.189zm-1.228-8.302a1.426 1.426 0 01-1.422-1.423c0-.784.637-1.423 1.422-1.423.784 0 1.423.639 1.423 1.423 0 .784-.639 1.423-1.423 1.423zm10.52 8.302h-2.459v-3.641c0-.91-.016-2.079-1.267-2.079-1.267 0-1.461.992-1.461 2.014v3.706H11.51V10.86h2.358v.994h.033c.327-.618 1.127-1.267 2.32-1.267 2.48 0 2.937 1.635 2.937 3.761v4.701h-.001z"/>
              </svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

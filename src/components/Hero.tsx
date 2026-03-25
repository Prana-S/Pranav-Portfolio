import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileData from '@/data/profile.json';

const powerWords = [
  "Founder",
  "Engineer",
  "Developer",
  "Builder",
  "Creator",
  "Crafter",
  "Pioneer",
];

// Icon components
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % powerWords.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { name: 'LinkedIn', url: profileData.profileUrl, icon: LinkedinIcon },
    { name: 'GitHub', url: profileData.githubUrl, icon: GithubIcon },
    { name: 'Resume', url: '#', icon: FileTextIcon },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Enhanced pastel gradient blobs - more colors, better blending */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top gradient wash - subtle pastel overlay */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-50/50 via-violet-50/30 to-transparent" />
        
        {/* Additional pastel blobs for better blending */}
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          animate={{ 
            x: [0, -30, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-pink-100 via-rose-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          animate={{ 
            x: [0, 20, -30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Extra blending blobs */}
        <motion.div 
          className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-100 via-green-100 to-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{ 
            x: [0, -20, 30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-40 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{ 
            x: [0, 25, -25, 0],
            y: [0, 20, -30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top label - higher z-index to stay visible */}
        <motion.div
          className="absolute top-8 left-4 sm:left-8 text-xs sm:text-sm font-mono text-muted-foreground z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {'{ software }'}
        </motion.div>

        {/* Name badge - higher z-index */}
        <motion.div
          className="absolute top-8 right-4 sm:right-8 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
            {profileData.name}
          </span>
        </motion.div>

        {/* The Big Word - Cycling with Framer Motion */}
        <div className="relative z-10 w-full">
          <div className="h-[20vw] sm:h-[22vw] relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={powerWords[currentWordIndex]}
                className="text-[14vw] sm:text-[16vw] leading-none font-bold text-[#0a0a0a] tracking-tight whitespace-nowrap"
                style={{ fontFamily: '"Inter", sans-serif' }}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -60, rotateX: 15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {powerWords[currentWordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subheadline */}
          <motion.p 
            className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground font-light max-w-md mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {profileData.subheadline}
          </motion.p>

          {/* Social links row */}
          <motion.div 
            className="mt-8 sm:mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-accent transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"
      />
    </section>
  );
}

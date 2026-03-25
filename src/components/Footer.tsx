import { motion } from 'framer-motion';
import profileData from '@/data/profile.json';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
              PS
            </span>
            <span>© {currentYear} {profileData.name}</span>
          </motion.div>
          
          <p className="flex items-center gap-1">
            Built with <span className="text-accent">♥</span> using Claude Code <span className="text-accent"><img className="w-[15px]" src='./claude-logo.svg'></img></span> & Tailwind
          </p>
          
          {profileData.profileUrl && (
            <motion.a
              href={profileData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
          )}
        </motion.div>
      </div>
    </footer>
  );
}

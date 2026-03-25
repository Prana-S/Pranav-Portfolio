import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import profileData from '@/data/profile.json';

export function About() {
  const ref = useRef(null);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - About Text */}
          <div>
            <motion.span 
              className="text-xs font-semibold tracking-widest text-accent uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              About
            </motion.span>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hello there 👋, I'm {profileData.name.split(' ')[0]}.
            </motion.h2>
            <motion.p 
              className="text-muted-foreground leading-relaxed text-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profileData.about}
            </motion.p>
            {profileData.profileUrl && (
              <motion.a
                href={profileData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-accent hover:translate-x-1 transition-transform"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ x: 8 }}
              >
                <span>LinkedIn Profile</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            )}
          </div>

          {/* Right Column - Stat Cards */}
          <div className="grid gap-4">
            {profileData.stats?.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="border-l-4 border-l-accent hover:shadow-md transition-shadow cursor-default">
                  <CardContent className="p-6">
                    <motion.div 
                      className="text-4xl font-bold text-foreground mb-1"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

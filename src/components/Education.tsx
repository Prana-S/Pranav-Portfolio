import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import profileData from '@/data/profile.json';
import { useRef } from 'react';

export function Education() {
  const ref = useRef(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-xs font-semibold tracking-widest text-accent uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Education
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Where I studied.
          </motion.h2>

          <div className="space-y-4">
            {profileData.education.map((edu, index) => {
              const eduRef = useRef(null);

              return (
                <motion.div
                  key={`${edu.institution}-${edu.degree}`}
                  ref={eduRef}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 8 }}
                >
                  <Card className="border-l-4 border-l-accent hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="flex-shrink-0"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                        >
                          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-accent" />
                          </div>
                        </motion.div>
                        <div className="flex-1">
                          <motion.h3 
                            className="text-lg font-bold text-foreground"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            {edu.institution}
                          </motion.h3>
                          <motion.p 
                            className="text-muted-foreground mb-2 font-light"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                          >
                            {edu.degree}
                          </motion.p>
                          <motion.p 
                            className="text-sm text-muted-foreground"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                          >
                            {edu.startDate} — {edu.endDate}
                          </motion.p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

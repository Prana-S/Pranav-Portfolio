import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import profileData from '@/data/profile.json';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineDrawn, setLineDrawn] = useState(false);

  useEffect(() => {
    if (isInView && lineRef.current && !lineDrawn) {
      setLineDrawn(true);
    }
  }, [isInView, lineDrawn]);

  return (
    <section id="experience" className="py-24 bg-white relative">
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
            Experience
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Where I've worked.
          </motion.h2>
          
          {/* Accent underline */}
          <motion.div 
            className="w-20 h-1 bg-accent rounded-full mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <div className="relative">
            {/* Center timeline line - hidden on mobile */}
            <motion.div 
              ref={lineRef}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border opacity-50"
              style={{ 
                transformOrigin: 'top',
                scaleY: lineDrawn ? 1 : 0,
              }}
              animate={{ scaleY: lineDrawn ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Experience items */}
            <div className="space-y-12">
              {profileData.experience.map((exp, index) => {
                const isLeft = index % 2 === 0;
                const itemRef = useRef(null);
                const isItemInView = useInView(itemRef, {
                  once: true,
                  margin: '-50px',
                });

                return (
                  <motion.div
                    key={`${exp.company}-${exp.role}`}
                    ref={itemRef}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    animate={
                      isItemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }
                    }
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.15,
                    }}
                    className="relative md:flex items-center"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Left side content (for even indices) - full width on mobile */}
                    {isLeft && (
                      <div className="md:w-1/2 md:pr-12">
                        <motion.div 
                          className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all duration-200"
                          whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
                        >
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-medium mt-1 text-accent">
                            @ {exp.company}
                          </p>
                          
                          {/* Date pill - shown on mobile inside card */}
                          <div className="md:hidden mt-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                              {exp.startDate} — {exp.endDate}
                            </span>
                          </div>
                          
                          {exp.description && exp.description.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {exp.description.map((item, i) => (
                                <motion.li 
                                  key={i} 
                                  className="flex items-start gap-2 text-muted-foreground font-light text-sm"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={isItemInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                  <span className="mt-1.5 text-xs text-accent">•</span>
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      </div>
                    )}

                    {/* Center dot and connector - hidden on mobile */}
                    <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex md:items-center md:justify-center">
                      {/* Connector line to card */}
                      <motion.div 
                        className="absolute w-6 h-px bg-accent"
                        style={{
                          [isLeft ? 'right' : 'left']: '50%',
                        }}
                        initial={{ width: 0 }}
                        animate={isItemInView ? { width: 24 } : { width: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      />
                      
                      {/* Timeline dot */}
                      <motion.div 
                        className="w-3.5 h-3.5 rounded-full bg-white border-2 border-accent z-10"
                        initial={{ scale: 0 }}
                        animate={isItemInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                      />
                    </div>

                    {/* Right side content (for odd indices) - full width on mobile */}
                    {!isLeft && (
                      <div className="md:w-1/2 md:pl-12">
                        <motion.div 
                          className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all duration-200"
                          whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
                        >
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-medium mt-1 text-accent">
                            @ {exp.company}
                          </p>
                          
                          {/* Date pill - shown on mobile inside card */}
                          <div className="md:hidden mt-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                              {exp.startDate} — {exp.endDate}
                            </span>
                          </div>
                          
                          {exp.description && exp.description.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {exp.description.map((item, i) => (
                                <motion.li 
                                  key={i} 
                                  className="flex items-start gap-2 text-muted-foreground font-light text-sm"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={isItemInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                  <span className="mt-1.5 text-xs text-accent">•</span>
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      </div>
                    )}

                    {/* Date label on opposite side - hidden on mobile */}
                    <motion.div 
                      className={`hidden md:block md:absolute md:top-0 ${isLeft ? 'md:right-1/2 md:mr-16' : 'md:left-1/2 md:ml-16'}`}
                      initial={{ opacity: 0 }}
                      animate={isItemInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-xs text-muted-foreground font-light italic">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

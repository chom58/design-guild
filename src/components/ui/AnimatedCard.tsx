'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreatorCard, CreatorCardProps } from './Card';

export const AnimatedCard: React.FC<CreatorCardProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <CreatorCard {...props} />
    </motion.div>
  );
};
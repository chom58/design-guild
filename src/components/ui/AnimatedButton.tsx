'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './Button';

export const AnimatedButton: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      <Button {...rest}>
        {children}
      </Button>
    </motion.div>
  );
};
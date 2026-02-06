
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, MessageSquare, Zap } from 'lucide-react';

// --- RAG VISUALIZATION ---
export const RAGVisualization: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Query", icon: <MessageSquare size={20} /> },
    { label: "FAISS", icon: <Database size={20} /> },
    { label: "Llama", icon: <Cpu size={20} /> },
    { label: "Result", icon: <Zap size={20} /> }
  ];

  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-white/10 rounded-2xl shadow-sm border border-white/10 my-4 md:my-8 backdrop-blur-md">
      <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-4 text-white">IntelliQuery Pipeline</h3>
      <p className="text-[10px] md:text-sm text-stone-400 mb-6 md:mb-8 text-center max-w-md font-light">
        Dynamic context retrieval using Llama 3.2 and optimized vector spaces.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl gap-3 md:gap-0">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2 md:gap-3 relative">
              <motion.div 
                className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${step === i ? 'border-nobel-gold bg-nobel-gold/20 text-white' : 'border-white/5 bg-white/5 text-stone-600'}`}
                animate={step === i ? { scale: 1.1, boxShadow: "0 0 20px rgba(197,160,89,0.3)" } : { scale: 1 }}
              >
                {s.icon}
              </motion.div>
              <span className={`text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-center ${step === i ? 'text-white' : 'text-stone-500'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block w-8 lg:w-12 h-0.5 bg-white/10 relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-nobel-gold"
                  initial={{ width: 0 }}
                  animate={step === i ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 1 }}
                />
              </div>
            )}
            {i < steps.length - 1 && (
              <div className="md:hidden w-0.5 h-6 bg-white/10 relative">
                <motion.div 
                  className="absolute inset-x-0 top-0 bg-nobel-gold"
                  initial={{ height: 0 }}
                  animate={step === i ? { height: '100%' } : { height: 0 }}
                  transition={{ duration: 1 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// --- SKILL CLOUD ---
export const SkillCloud: React.FC = () => {
  const skills = [
    { name: "Python", category: "lang" },
    { name: "TensorFlow", category: "tool" },
    { name: "PyTorch", category: "tool" },
    { name: "Java", category: "lang" },
    { name: "C/C++", category: "lang" },
    { name: "LLAMA 3.2", category: "ai" },
    { name: "Langchain", category: "ai" },
    { name: "OpenCV", category: "tool" },
    { name: "Neo4j", category: "db" },
    { name: "Cypher", category: "lang" },
    { name: "FastAPI", category: "tool" },
    { name: "FAISS", category: "ai" },
    { name: "Hugging Face", category: "ai" },
    { name: "Streamlit", category: "tool" }
  ];

  return (
    <div className="flex flex-wrap justify-start gap-2 md:gap-3 max-w-2xl">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs md:text-sm font-medium text-stone-600 hover:border-nobel-gold hover:text-nobel-gold hover:shadow-sm transition-all duration-300 cursor-default"
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  );
};

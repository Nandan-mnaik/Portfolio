
import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  tools: string;
  description: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tools, description, link }) => {
  return (
    <motion.div 
      whileHover={{ y: -15, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="p-8 md:p-12 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/[0.08] hover:border-nobel-gold/40 transition-all duration-500 group flex flex-col h-full backdrop-blur-3xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-nobel-gold/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="flex justify-between items-start mb-10">
        <h3 className="font-serif text-3xl md:text-4xl text-white group-hover:text-nobel-gold transition-colors duration-500 leading-tight">{title}</h3>
        {link && (
          <motion.a 
            whileHover={{ scale: 1.2, rotate: 15, backgroundColor: '#C5A059', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-stone-400 bg-white/5 p-3.5 rounded-2xl border border-white/10 transition-all"
            title="View Source"
          >
            <Github size={22} />
          </motion.a>
        )}
      </div>

      <div className="mb-10 text-[10px] md:text-xs font-bold text-nobel-gold tracking-[0.3em] uppercase bg-nobel-gold/10 px-5 py-2.5 rounded-full border border-nobel-gold/30 inline-block self-start shadow-sm">
        {tools}
      </div>

      <ul className="space-y-4 md:space-y-6 text-stone-400 text-lg md:text-xl flex-grow font-light leading-relaxed">
        {description.map((item, idx) => (
          <li key={idx} className="flex gap-4 group/li">
            <span className="text-nobel-gold font-serif mt-1 transition-transform group-hover/li:scale-150">•</span>
            <span className="group-hover/li:text-stone-200 transition-colors">{item}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-12 pt-8 border-t border-white/10">
        <motion.a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ x: 5, color: '#C5A059' }}
          className="inline-flex items-center gap-3 text-stone-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] transition-all group/link"
        >
          Explore Repository <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

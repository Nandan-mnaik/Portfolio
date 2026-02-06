
import React, { useState, useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowDown, 
  Menu, 
  X, 
  GraduationCap, 
  Briefcase, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Award, 
  ChevronRight,
  Globe,
  MapPin,
  Sparkles,
  Zap,
  Terminal,
  Code2,
  Cpu,
  Binary,
  Sigma,
  Variable,
  User
} from 'lucide-react';
import { HeroScene, QuantumComputerScene, NeuralSwarmScene, GlobeScene } from './components/QuantumScene.tsx';
import { RAGVisualization, SkillCloud } from './components/Diagrams.tsx';
import ProjectCard from './components/ProjectCard.tsx';
import resume from './assets/Resume.pdf';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error(error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="p-8 text-center text-stone-400 font-serif border border-stone-200 rounded-3xl">Visual content loading...</div>;
    return this.props.children;
  }
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 5000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.06] select-none">
      <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[8%] text-nobel-gold"><Sigma size={160} /></motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[45%] right-[12%] text-stone-900"><Binary size={120} /></motion.div>
      <motion.div style={{ y: y1 }} className="absolute top-[75%] left-[18%] text-nobel-gold"><Variable size={100} /></motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

const handleDownloadResume = () => {
  const link = document.createElement('a');
  link.href = resume;
  link.download = 'Nandan_M_Naik_Resume.pdf';
  link.click();
};

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-nobel-gold selection:text-white font-sans overflow-x-hidden">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-nobel-gold origin-left z-[100] shadow-[0_0_20px_rgba(197,160,89,0.4)]" style={{ scaleX }} />

      <ParallaxBackground />

      <nav className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-stone-50/80 backdrop-blur-2xl shadow-sm py-3 md:py-4 border-b border-stone-200/50' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 md:gap-4 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-nobel-gold rounded-lg md:rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl md:text-2xl shadow-lg pb-0.5">N</div>
            <span className={`font-serif font-bold text-lg md:text-xl tracking-wide transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
            
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">
            {['about', 'education', 'experience', 'projects'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                onClick={scrollToSection(item)} 
                whileHover={{ y: -2, color: '#C5A059' }}
                className="transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nobel-gold transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              onClick={scrollToSection('contact')} 
              whileHover={{ scale: 1.05, backgroundColor: '#292524' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-stone-900 text-white rounded-full transition-all shadow-xl hover:shadow-nobel-gold/10"
            >
              Let's Talk
            </motion.a>
          </div>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-stone-900 p-2 z-50" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="no-print fixed inset-0 z-40 bg-stone-900 text-white flex flex-col items-center justify-center gap-8 text-2xl font-serif"
          >
              {['about', 'education', 'experience', 'projects', 'contact'].map((item) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  onClick={scrollToSection(item)}
                  whileHover={{ scale: 1.1, color: '#C5A059' }}
                >
                  {item.toUpperCase()}
                </motion.a>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="no-print relative h-screen flex items-center justify-center overflow-hidden">
        <ErrorBoundary>
          <Suspense fallback={<div className="absolute inset-0 bg-stone-100 animate-pulse" />}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.6)_0%,rgba(249,248,244,0.2)_100%)]" />

        <motion.div 
          className="relative z-10 container mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={revealVariants}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 border border-nobel-gold/30 text-nobel-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold rounded-full backdrop-blur-xl bg-white/40 shadow-xl"
          >
            <Sparkles size={14} className="animate-pulse" /> Emerging AI Developer
          </motion.div>
          <motion.h1 
            variants={revealVariants}
            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-medium leading-[0.9] mb-10 text-stone-900 tracking-tight"
          >
            Nandan M Naik
          </motion.h1>
          <motion.p 
            variants={revealVariants}
            className="max-w-2xl mx-auto text-xl md:text-3xl text-stone-600 font-light leading-relaxed mb-12 italic px-4"
          >
            "Engineering systems that think, learn, and evolve."
          </motion.p>
          
          <motion.div variants={revealVariants} className="flex justify-center items-center gap-8">
  
            <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-4 text-[10px] font-bold tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-all cursor-pointer">
              <span className="p-4 md:p-6 border border-stone-200 rounded-full group-hover:border-nobel-gold transition-all bg-white shadow-xl">
                <ArrowDown size={22} className="animate-bounce" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </header>

      <main className="no-print relative z-10">
        <section id="about" className="py-24 md:py-40 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Re-integrated Identity Visuals */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              {/* Layer 1: Neural Swarm Background */}
              <div className="absolute -inset-20 md:-inset-32 opacity-70 z-0">
                <ErrorBoundary>
                  <NeuralSwarmScene />
                </ErrorBoundary>
              </div>

              {/* Layer 2: Profile Image with High-End Framing */}
              <motion.div 
                style={{ 
                  rotateX: (mousePos.y - window.innerHeight/2) * -0.01,
                  rotateY: (mousePos.x - window.innerWidth/2) * 0.01,
                  perspective: 1000
                }}
                className="relative z-10 w-full aspect-[4/5] max-w-[400px] mx-auto group"
              >
                <div className="absolute inset-0 bg-nobel-gold/20 rounded-[3rem] blur-2xl group-hover:bg-nobel-gold/40 transition-all duration-700" />
                <div className="absolute inset-0 border-[1.5px] border-nobel-gold/30 rounded-[3rem] rotate-3 scale-105 group-hover:rotate-0 transition-all duration-700" />
                
                <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-2 border-white/50 shadow-2xl bg-stone-100">
                  <img 
                    src="./profile.jpeg" 
                    alt="Nandan M Naik" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                    }}
                  />
                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-70 mb-1">Emerging AI developer</p>
                    <h4 className="font-serif text-2xl">Nandan M Naik</h4>
                  </div>
                </div>
              </motion.div>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-nobel-gold rounded-full blur-[80px] opacity-20 pointer-events-none" />
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="lg:col-span-7 z-10"
            >
              <motion.div variants={revealVariants} className="inline-block mb-6 text-xs font-bold tracking-[0.3em] text-stone-400 uppercase">Profile</motion.div>
              <motion.h2 variants={revealVariants} className="font-serif text-5xl md:text-7xl mb-10 text-stone-900 leading-tight tracking-tight">Driven by Curiosity</motion.h2>
              <motion.div variants={revealVariants} className="w-24 h-2 bg-nobel-gold mb-12 rounded-full shadow-lg shadow-nobel-gold/30"></motion.div>
              
              <div className="text-xl md:text-2xl text-stone-600 leading-relaxed space-y-10 font-light">
                <motion.p variants={revealVariants} className="relative">
                  <span className="text-8xl md:text-9xl float-left mr-6 mt-[-10px] font-serif text-nobel-gold opacity-30 leading-none select-none">I</span>
                  am an AI and Python professional with deep focus on algorithmic efficiency and data pipeline optimization. I thrive at the intersection of mathematical theory and practical code implementation.
                </motion.p>
                <motion.p variants={revealVariants}>
                  Currently architecting scalable <strong className="text-stone-900 font-semibold underline decoration-nobel-gold/30 underline-offset-8">Generative AI</strong> solutions and exploring high-dimensional latent spaces in <strong className="text-stone-900 font-semibold underline decoration-nobel-gold/30 underline-offset-8">RAG architectures</strong>.
                </motion.p>
                
                <motion.div variants={revealVariants} className="pt-10 border-t border-stone-100">
                  <h4 className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-8">Technical Core</h4>
                  <SkillCloud />
                </motion.div>

                <motion.div variants={revealVariants} className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-10 border-t border-stone-100">
                   <div className="group cursor-default">
                     <h4 className="text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-4 group-hover:text-nobel-gold transition-colors">Social Path</h4>
                     <div className="flex gap-6">
                        <motion.a whileHover={{ scale: 1.3, color: '#C5A059' }} whileTap={{ scale: 0.9 }} href="https://github.com/Nandan-mnaik" target="_blank" className="text-stone-400 hover:text-stone-900 transition-all"><Github size={20}/></motion.a>
                        <motion.a whileHover={{ scale: 1.3, color: '#C5A059' }} whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/in/nandan-naik-201539255/" target="_blank" className="text-stone-400 hover:text-stone-900 transition-all"><Linkedin size={20}/></motion.a>
                     </div>
                   </div>
                   <div>
                     <h4 className="text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-4">Identity</h4>
                     <div className="text-sm text-stone-600 font-medium flex items-center gap-2">
                       <User size={14} className="text-nobel-gold" /> AI Developer
                     </div>
                   </div>
                   <div>
                     <h4 className="text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-4">Base</h4>
                     <div className="text-sm text-stone-600 font-medium flex items-center gap-2 group cursor-default">
                       <MapPin size={14} className="text-nobel-gold group-hover:animate-bounce" /> Bengaluru, India
                     </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="education" className="py-24 md:py-40 bg-stone-100 border-y border-stone-200 relative overflow-hidden">
          <div className="container mx-auto px-6">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={containerVariants}
               className="max-w-4xl mx-auto flex flex-col items-center text-center mb-24"
             >
                <motion.div variants={revealVariants} className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-nobel-gold shadow-2xl mb-10 transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <GraduationCap size={40} />
                </motion.div>
                <motion.div variants={revealVariants} className="inline-block mb-6 text-xs font-bold tracking-[0.4em] text-stone-400 uppercase">Scholastic Records</motion.div>
                <motion.h2 variants={revealVariants} className="font-serif text-5xl md:text-8xl mb-8 text-stone-900 tracking-tight">Education</motion.h2>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="max-w-6xl mx-auto bg-white p-10 md:p-24 rounded-[4rem] border border-stone-200 shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:shadow-2xl transition-all duration-700"
             >
                <div className="absolute top-0 right-0 w-80 h-80 bg-nobel-gold/5 rounded-bl-[200px] transition-all group-hover:bg-nobel-gold/10 duration-700"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 group-hover:text-nobel-gold transition-colors duration-500">R.N.S Institute of Technology</h3>
                    <p className="text-xl text-stone-500 italic flex items-center gap-3">Bengaluru, India</p>
                  </div>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-bold tracking-[0.3em] text-nobel-gold bg-stone-50 px-8 py-4 rounded-full border border-stone-200 uppercase shadow-sm"
                  >
                    Dec 2022 – Aug 2026
                  </motion.span>
                </div>

                <div className="mb-16">
                   <p className="text-2xl md:text-3xl text-stone-700 font-medium mb-8 leading-tight">Bachelors in Artificial Intelligence and Machine Learning</p>
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 'auto' }}
                    className="inline-flex items-center gap-6 px-10 py-5 bg-stone-900 text-white rounded-[2rem] shadow-2xl overflow-hidden"
                   >
                     <span className="text-stone-400 font-serif italic text-2xl">GPA:</span>
                     <span className="text-4xl font-bold tracking-tighter">8.63 / 10.0</span>
                   </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-stone-100">
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase flex items-center gap-2"><Zap size={14} className="text-nobel-gold"/> Theoretical Core</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-stone-600 font-medium">
                      {['Data Structures', 'Algorithm Designs', 'Computer Networks', 'System Design'].map((course) => (
                        <motion.li key={course} whileHover={{ x: 10, color: '#C5A059' }} className="flex items-center gap-4 transition-all cursor-default">
                          <div className="w-2.5 h-2.5 rounded-full bg-nobel-gold shadow-lg shadow-nobel-gold/50"></div>
                          {course}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase flex items-center gap-2"><Award size={14} className="text-nobel-gold"/> Distinctions</h4>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-6 p-8 bg-stone-50 rounded-[2rem] border border-stone-100 hover:border-nobel-gold/50 transition-all cursor-default"
                    >
                       <Award size={32} className="text-nobel-gold mt-1 flex-shrink-0" />
                       <div className="text-base font-medium text-stone-700 leading-relaxed italic">
                         "Finalist, AMD Pervasive AI Contest – Orchestrated the development of an AR mapping engine leveraging AI for spatial localization."
                       </div>
                    </motion.div>
                  </div>
                </div>
             </motion.div>
          </div>
        </section>

        <section id="experience" className="py-24 md:py-40 bg-white overflow-hidden relative">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-32">
                <motion.div 
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  className="w-16 h-16 bg-stone-100 rounded-[1.5rem] flex items-center justify-center text-nobel-gold mb-10 shadow-xl"
                >
                  <Briefcase size={32} />
                </motion.div>
                <div className="inline-block mb-6 text-xs font-bold tracking-[0.3em] text-stone-400 uppercase">Industry Interface</div>
                <h2 className="font-serif text-5xl md:text-7xl mb-10 text-stone-900 leading-tight">Career Path</h2>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="hidden lg:block h-[500px] w-full mt-16 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-stone-950 p-1 relative border border-white/10 group"
                >
                  <div className="absolute inset-0 bg-nobel-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <ErrorBoundary>
                    <Suspense fallback={<div className="w-full h-full bg-stone-900 animate-pulse" />}>
                      <GlobeScene />
                    </Suspense>
                  </ErrorBoundary>
                  <div className="absolute top-8 left-8 text-[9px] tracking-[0.4em] text-white/40 uppercase pointer-events-none">
                   
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-24 pt-10">
               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative pl-16 border-l-2 border-stone-100 pb-20"
               >
                  <div className="absolute top-0 -left-[13px] w-6 h-6 rounded-full bg-nobel-gold border-[6px] border-white shadow-xl animate-pulse"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                    <div>
                      <h3 className="text-4xl font-serif text-stone-900 mb-2">Project Intern</h3>
                      <div className="text-xl text-nobel-gold font-bold tracking-tight">ABB</div>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase bg-stone-50 px-6 py-3 rounded-full border border-stone-200 shadow-sm">Apr 2025 – Jun 2025</span>
                  </div>
                  
                  <ul className="space-y-10 text-stone-600 text-xl leading-relaxed font-light">
                    <motion.li whileHover={{ x: 10 }} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-nobel-gold group-hover:bg-nobel-gold group-hover:text-white transition-all shadow-sm">
                        <Code2 size={24} />
                      </div>
                      <span>Engineered high-precision <strong className="text-stone-900 font-medium text-2xl">Bezier curve solvers</strong> for the PixelPaint robotics initiative, enhancing trajectory planning for industrial automation.</span>
                    </motion.li>
                    <motion.li whileHover={{ x: 10 }} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-nobel-gold group-hover:bg-nobel-gold group-hover:text-white transition-all shadow-sm">
                        <Cpu size={24} />
                      </div>
                      <span>Orchestrated cross-functional deployment of Python-based mathematical models in real-time robotic testing pipelines, significantly improving system reliability.</span>
                    </motion.li>
                  </ul>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="relative pl-16 border-l-2 border-stone-100 pb-12"
               >
                  <div className="absolute top-0 -left-[13px] w-6 h-6 rounded-full bg-stone-200 border-[6px] border-white shadow-sm"></div>
                  <h3 className="text-3xl font-serif text-stone-900 italic opacity-40 mb-10">Beyond the Horizon</h3>
                  <p className="text-stone-500 font-light text-2xl leading-relaxed max-w-2xl">
                    Dedicated to pushing the boundaries of machine reasoning and automated industrial systems. My methodology prioritizes scalability, math-first logic, and elegant design.
                  </p>
               </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 md:py-40 bg-stone-950 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="w-[800px] h-[800px] rounded-full bg-stone-800 blur-[200px] absolute top-[-200px] left-[-200px]"></div>
                <div className="w-[900px] h-[900px] rounded-full bg-nobel-gold/15 blur-[250px] absolute bottom-[-200px] right-[-200px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 backdrop-blur-3xl text-nobel-gold text-[10px] font-bold tracking-[0.4em] uppercase rounded-full mb-10 border border-white/10 shadow-2xl"
                    >
                        Portfolio of Work
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="font-serif text-6xl md:text-[8rem] mb-10 text-white leading-none tracking-tighter uppercase"
                    >
                      Engineered
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
                    {[
                      {
                        title: "IntelliQuery",
                        tools: "Python, Llama 3.2, FAISS, ChromaDB",
                        desc: [
                          "High-fidelity RAG engine optimized for document reasoning.",
                          "Vector search optimization yielding 15% latency reduction.",
                          "Semantic re-ranking pipeline using BM25 expansion."
                        ],
                        url: "https://github.com/Nandan-mnaik/RAG"
                      },
                      {
                        title: "HeartHz",
                        tools: "Python, TensorFlow, Bi-LSTM, Librosa",
                        desc: [
                          "Emotion classification system with 90.94% accuracy.",
                          "Temporal pattern recognition using Bi-LSTM architectures.",
                          "Near-real-time latency (<200ms) on live audio streams."
                        ],
                        url: "https://github.com/Nandan-mnaik/Ser_proto"
                      },
                      {
                        title: "Dermalyze",
                        tools: "OpenCV, ResNet, MobileNet, HAM10000",
                        desc: [
                          "Medical vision system with 82% precision on HAM10000.",
                          "Ensemble classification across 7 critical cancer categories.",
                          "Pre-processing pipeline optimized for 15% validation gain."
                        ],
                        url: "https://github.com/Nandan-mnaik/Skin_cancer_detection"
                      }
                    ].map((p, i) => (
                      <motion.div 
                        key={p.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <ProjectCard 
                          title={p.title}
                          tools={p.tools}
                          description={p.desc}
                          link={p.url}
                        />
                      </motion.div>
                    ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-[4rem] p-10 md:p-24 backdrop-blur-3xl shadow-3xl overflow-hidden relative group"
                >
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-14 h-14 bg-nobel-gold rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-nobel-gold/30"><Globe size={28} /></div>
                           <h3 className="font-serif text-4xl md:text-5xl text-white tracking-tight">RAG Blueprint</h3>
                        </div>
                        <div className="space-y-10">
                           {[
                             {t: 'Semantic Extraction', d: 'Contextual parsing using high-order transformer weights.'},
                             {t: 'High-D Indexing', d: 'Latent space mapping with optimized FAISS indices.'},
                             {t: 'Cognitive Retrieval', d: 'Cross-encoder re-ranking for enterprise precision.'}
                           ].map(step => (
                             <motion.div key={step.t} whileHover={{ x: 10 }} className="flex gap-8 group/item cursor-default">
                               <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-nobel-gold font-serif italic text-2xl group-hover/item:bg-nobel-gold group-hover/item:text-white transition-all duration-500 shadow-lg">
                                 {step.t[0]}
                               </div>
                               <div>
                                 <div className="font-bold text-white text-lg mb-2 group-hover/item:text-nobel-gold transition-colors">{step.t}</div>
                                 <div className="text-stone-400 text-base leading-relaxed">{step.d}</div>
                               </div>
                             </motion.div>
                           ))}
                        </div>
                      </div>
                      <div className="relative flex justify-center items-center h-[300px] md:h-[500px]">
                         <div className="absolute inset-0 bg-nobel-gold/10 blur-[150px] rounded-full group-hover:bg-nobel-gold/20 transition-all duration-700" />
                         <RAGVisualization />
                      </div>
                   </div>
                </motion.div>
            </div>
        </section>

        <section id="contact" className="py-24 md:py-40 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block mb-8 text-xs font-bold tracking-[0.4em] text-stone-400 uppercase">Gateway</div>
                <h2 className="font-serif text-6xl md:text-8xl mb-12 text-stone-900 leading-[0.9] tracking-tighter">Let's craft the future.</h2>
                
                <p className="text-2xl text-stone-500 font-light leading-relaxed mb-20 max-w-xl">
                  Always open to architectural discussions on AI deployment, industrial automation, or creative coding synergies.
                </p>

                <div className="flex flex-col gap-10">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-nobel-gold group-hover:text-white transition-all shadow-xl group-hover:shadow-nobel-gold/20">
                      <Mail size={28} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">Primary Contact</div>
                      <a href="mailto:nandanmaheshnaik@gmail.com" className="text-2xl md:text-3xl font-serif text-stone-800 hover:text-nobel-gold transition-colors">nandanmaheshnaik@gmail.com</a>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-8 group cursor-pointer">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-nobel-gold group-hover:text-white transition-all shadow-xl group-hover:shadow-nobel-gold/20">
                      <Linkedin size={28} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">Professional Network</div>
                      <a href="https://www.linkedin.com/in/nandan-naik-201539255/" target="_blank" className="text-2xl md:text-3xl font-serif text-stone-800 hover:text-nobel-gold transition-colors">Nandan M Naik</a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-stone-900 p-12 md:p-24 rounded-[4rem] relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] group border border-white/5"
              >
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-nobel-gold/15 rounded-full blur-[100px] group-hover:scale-125 transition-all duration-700"></div>
                <h3 className="font-serif text-5xl mb-10 text-white tracking-tighter">Get to know me</h3>
                <p className="text-stone-400 text-xl mb-16 leading-relaxed font-light">
                  Here’s my resume if you’d like a deeper look at my skills, experience, and academic background.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(197,160,89,0.35)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center gap-5 py-8 bg-nobel-gold text-white rounded-[2rem] hover:bg-white hover:text-stone-900 transition-all font-bold tracking-[0.4em] text-xs uppercase shadow-2xl"
                >
                  <Download size={22} />
                  View Resume (PDF)
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="no-print bg-stone-950 text-stone-500 py-24 border-t border-white/5 relative z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <div className="text-white font-serif font-bold text-4xl mb-4 tracking-tighter uppercase">Nandan M Naik</div>
                <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-nobel-gold flex items-center justify-center md:justify-start gap-3">
                  <MapPin size={14} /> Emerging AI Developer  • Bengaluru, India
                </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em]">
              {['about', 'education', 'experience', 'projects'].map(link => (
                <motion.a key={link} href={`#${link}`} onClick={scrollToSection(link)} whileHover={{ color: '#fff', y: -2 }} className="transition-all">{link}</motion.a>
              ))}
            </div>
        </div>
        <div className="text-center mt-24 text-[9px] text-stone-700 tracking-[0.6em] uppercase font-bold border-t border-white/5 pt-16 px-6">
            © 2026 • Engineered with passion • Nandan M Naik
        </div>
      </footer>
    </div>
  );
};

export default App;

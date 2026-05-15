import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Heart, Calendar, MapPin, Clock, Music, Mail, Camera } from 'lucide-react';

// ─── Reusable Animation Variants ───────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i: any = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};
const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -40 },
  visible: (i: any = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' } }),
};
const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: (i: any = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
};
const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: (i: any = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
};
const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.75 },
  visible: (i: any = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] } }),
};
const flipIn: Variants = {
  hidden:  { opacity: 0, rotateX: -30, y: 30 },
  visible: (i: any = 0) => ({ opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' } }),
};
const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const shimmerReveal: Variants = {
  hidden:  { opacity: 0, scaleX: 0, originX: 0 },
  visible: (i: any = 0) => ({ opacity: 1, scaleX: 1, transition: { duration: 0.9, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

// Viewport config used everywhere for consistent trigger point
const VP = { once: true, margin: '-80px' } as const;

const IMAGES = {
  hero: "/hero section.webp",
  story1: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
  story2: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  storyBg: "/our story section.webp",
  eventsBg: "/Wedding Events Sections.webp",
  rsvpBg: "/RSVP section.jpeg",
  venue: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1498&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ]
};



const GoldParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-sm ${Math.random() > 0.5 ? 'bg-gradient-to-br from-[#FDDA5F] to-[#B38728]' : 'bg-white shadow-[0_0_10px_#fff]'}`}
        style={{
          width: Math.random() * 6 + 3 + 'px',
          height: Math.random() * 6 + 3 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          opacity: Math.random() * 0.6 + 0.2,
          rotate: Math.random() * 360,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px'
        }}
        animate={{
          y: [0, Math.random() * -150 - 50],
          x: [0, Math.random() * 100 - 50],
          rotate: [0, Math.random() * 360],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 6,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-wedding-ivory min-h-screen text-wedding-dark selection:bg-wedding-gold selection:text-white">
      


      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Reduced dark base overlay */}
          <div className="absolute inset-0 bg-black/35 z-10"></div>
          {/* White radial glow overlay — soft luminous bloom from center */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 40%, transparent 75%)"
            }}
          ></div>
          {/* Edge vignette to keep image grounded */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)"
            }}
          ></div>
          <img 
            src={IMAGES.hero} 
            alt="Aaryan & Priya" 
            className="w-full h-full object-cover object-center scale-105 transform origin-center"
            style={{ filter: "brightness(1.08) saturate(0.95)" }}
          />
        </motion.div>

        <GoldParticles />

        {/* Ganesha SVG — top center */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute top-24 md:top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <img
            src="/lord-ganesha-blessing-pose.svg"
            alt="Lord Ganesha"
            className="w-28 h-28 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
            style={{
              filter: "drop-shadow(0 0 12px rgba(212,175,119,0.8)) drop-shadow(0 0 24px rgba(212,175,119,0.4)) brightness(1.1)"
            }}
          />
        </motion.div>

        <div className="relative z-20 text-center px-4 w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative border border-[#D4AF77]/60 p-5 sm:p-8 md:p-16 lg:px-32 lg:py-24 max-w-6xl w-[95%] sm:w-[90%] mx-auto mt-16 md:mt-20"
          >
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-white fill-current drop-shadow-md" />
              <p
                className="font-sans uppercase tracking-[0.3em] md:tracking-[0.45em] text-[10px] md:text-sm font-semibold text-white"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.3)" }}
              >
                We are getting married
              </p>
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-white fill-current drop-shadow-md" />
            </div>
            
            <h1
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] leading-none mb-6 md:mb-10 text-white"
              style={{
                textShadow: `
                  0px 1px 0px rgba(255,255,255,0.4),
                  1px 2px 0px rgba(200,200,200,0.25),
                  2px 4px 0px rgba(150,150,150,0.2),
                  3px 6px 0px rgba(100,100,100,0.15),
                  4px 8px 0px rgba(50,50,50,0.12),
                  5px 10px 15px rgba(0,0,0,0.4),
                  0px 0px 40px rgba(255,255,255,0.15)
                `
              }}
            >
              Aaryan &amp; Priya
            </h1>
            
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-12 font-sans text-white/90 tracking-[0.15em] md:tracking-[0.2em] text-[11px] md:text-sm uppercase mb-8 md:mb-14">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D4AF77]" />
                <span>24 November 2026</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-[#D4AF77] rounded-full"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D4AF77]" />
                <span>Udaipur, Rajasthan</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollTo('events')}
                className="group relative w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#9E7A31] via-[#D4AF77] to-[#9E7A31] text-white font-sans tracking-[0.2em] uppercase text-xs rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,119,0.3)]"
              >
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                Save The Date
              </button>
              <button 
                onClick={() => scrollTo('rsvp')}
                className="w-full sm:w-auto px-8 py-3 bg-[#4A0000] text-white font-sans tracking-[0.2em] uppercase text-xs rounded-full transition-all hover:bg-[#800020] border border-[#D4AF77]"
              >
                RSVP Now
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('story')}
        >
          <span className="font-script text-[#D4AF77] text-2xl drop-shadow-md">Scroll to celebrate</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {/* Elegant Key or decorative icon */}
            <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6H28M28 6V9M24 6V9M18 6V9M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke="#D4AF77" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section 
        id="story" 
        className="py-16 md:py-20 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url("${IMAGES.storyBg}")` }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Custom Header matching the design */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="text-center mb-10 md:mb-12 flex flex-col items-center"
          >
            <motion.p variants={fadeDown} custom={0} className="font-script text-3xl md:text-4xl text-[#9E7A31] mb-1 drop-shadow-sm">How we met</motion.p>
            <motion.h2 variants={fadeDown} custom={1} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#800020] uppercase tracking-[0.15em] mb-4">
              Our Story
            </motion.h2>
            <motion.svg variants={scaleIn} custom={2} width="24" height="24" viewBox="0 0 24 24" fill="url(#gold-grad)" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF77" />
                  <stop offset="50%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#9E7A31" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-4 md:mt-6">
            
            {/* Left Column: Images */}
            <div className="relative flex items-center justify-center lg:justify-end px-4 lg:px-0">
              {/* Main Image */}
              <motion.div 
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                custom={0}
                className="relative z-10 w-[85%] sm:w-[75%] lg:w-[85%]"
              >
                <div className="relative p-1 bg-white shadow-2xl rounded-sm z-20 border border-gray-200">
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-sm relative">
                    <img src={IMAGES.story1} alt="Couple" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Decorative Vine SVG Border */}
                <svg className="absolute -top-6 -bottom-10 -left-10 -right-6 w-[calc(100%+64px)] h-[calc(100%+64px)] pointer-events-none z-10" viewBox="0 0 400 300" fill="none" preserveAspectRatio="none">
                  {/* Subtle golden ornate frame borders wrapping around */}
                  <path d="M 20,40 L 20,280 Q 20,290 30,290 L 360,290 Q 380,290 380,270 L 380,20" stroke="url(#gold-grad)" strokeWidth="1.5" />
                  <path d="M 15,35 L 15,285 Q 15,295 25,295 L 365,295 Q 385,295 385,265 L 385,15" stroke="url(#gold-grad)" strokeWidth="0.5" strokeOpacity="0.5" />
                  {/* Leaf accents */}
                  <path d="M 20,150 Q 5,160 20,170 Q 35,160 20,150 Z" fill="url(#gold-grad)" />
                  <path d="M 20,200 Q 5,210 20,220 Q 35,210 20,200 Z" fill="url(#gold-grad)" />
                  <path d="M 100,290 Q 110,305 120,290 Q 110,275 100,290 Z" fill="url(#gold-grad)" />
                  <path d="M 200,290 Q 210,305 220,290 Q 210,275 200,290 Z" fill="url(#gold-grad)" />
                  <path d="M 380,100 Q 395,110 380,120 Q 365,110 380,100 Z" fill="url(#gold-grad)" />
                </svg>
              </motion.div>

              {/* Overlapping Circular Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={VP}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -top-16 lg:-top-20 left-0 lg:-left-12 w-48 h-48 sm:w-56 sm:h-56 z-30"
              >
                <div className="relative w-full h-full rounded-full flex items-center justify-center p-2 bg-white/50 backdrop-blur-[2px] shadow-xl border border-[#D4AF77]/50">
                  {/* Scalloped edge effect via SVG */}
                  <svg className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] drop-shadow-md pointer-events-none text-[#D4AF77]" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner bg-white relative">
                    <img src={IMAGES.story2} alt="Rings" className="w-full h-full object-cover scale-110" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Text Card */}
            <motion.div 
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              custom={1}
              className="relative p-8 md:p-10 lg:p-12 z-20"
            >
              {/* Paper Background with deckled/shadow effect */}
              <div className="absolute inset-0 bg-[#FCFBF8] shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm"></div>
              
              {/* Subtle watermark pattern (constellations) */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px), linear-gradient(45deg, transparent 48%, #000 49%, #000 51%, transparent 52%)',
                backgroundSize: '80px 80px, 120px 120px'
              }}></div>

              {/* Elegant Gold Corner Ornaments */}
              <svg className="absolute top-4 left-4 w-12 h-12 text-[#D4AF77] pointer-events-none" viewBox="0 0 100 100" fill="none">
                <path d="M 0 100 C 0 50, 50 0, 100 0" stroke="currentColor" strokeWidth="1" />
                <path d="M 0 80 C 0 40, 40 0, 80 0" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="15" cy="15" r="3" fill="currentColor"/>
                <path d="M 25 15 C 25 25, 15 25, 15 25" stroke="currentColor" strokeWidth="1" />
              </svg>
              <svg className="absolute top-4 right-4 w-12 h-12 text-[#D4AF77] pointer-events-none rotate-90" viewBox="0 0 100 100" fill="none">
                <path d="M 0 100 C 0 50, 50 0, 100 0" stroke="currentColor" strokeWidth="1" />
                <path d="M 0 80 C 0 40, 40 0, 80 0" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="15" cy="15" r="3" fill="currentColor"/>
                <path d="M 25 15 C 25 25, 15 25, 15 25" stroke="currentColor" strokeWidth="1" />
              </svg>
              <svg className="absolute bottom-4 left-4 w-12 h-12 text-[#D4AF77] pointer-events-none -rotate-90" viewBox="0 0 100 100" fill="none">
                <path d="M 0 100 C 0 50, 50 0, 100 0" stroke="currentColor" strokeWidth="1" />
                <path d="M 0 80 C 0 40, 40 0, 80 0" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="15" cy="15" r="3" fill="currentColor"/>
                <path d="M 25 15 C 25 25, 15 25, 15 25" stroke="currentColor" strokeWidth="1" />
              </svg>
              <svg className="absolute bottom-4 right-4 w-12 h-12 text-[#D4AF77] pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none">
                <path d="M 0 100 C 0 50, 50 0, 100 0" stroke="currentColor" strokeWidth="1" />
                <path d="M 0 80 C 0 40, 40 0, 80 0" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="15" cy="15" r="3" fill="currentColor"/>
                <path d="M 25 15 C 25 25, 15 25, 15 25" stroke="currentColor" strokeWidth="1" />
              </svg>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="relative z-10 px-2 lg:px-6"
              >
                <motion.h3 variants={fadeUp} custom={0} className="font-serif text-[1.75rem] md:text-3xl text-[#800020] mb-4 font-medium leading-snug tracking-wide">It was written in the stars...</motion.h3>
                <motion.div variants={staggerContainer} className="font-sans text-gray-800 space-y-4 leading-relaxed text-sm tracking-wide">
                  <motion.p variants={fadeUp} custom={1}>
                    Our journey began not with a grand gesture, but with a simple cup of coffee on a rainy November evening. Two different worlds collided, yet everything felt exactly as it was meant to be.
                  </motion.p>
                  <motion.p variants={fadeUp} custom={2}>
                    From endless conversations about our dreams to exploring new cities together, every moment has been a beautiful revelation. Three years, countless memories, and infinite laughs later, we are ready to embark on our most beautiful adventure yet.
                  </motion.p>
                  <motion.p variants={fadeUp} custom={3}>
                    As we step into this new chapter, we can't wait to celebrate our love with the people who mean the world to us.
                  </motion.p>
                </motion.div>
                
                <motion.div variants={fadeUp} custom={4} className="mt-8 text-right font-script text-4xl text-[#D4AF77] font-medium pr-2 drop-shadow-sm">
                  - A & P
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Family Blessings Section                          */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        id="families"
        className="py-12 md:py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #FBF5E6 0%, #F5E6C8 30%, #FBF5E6 60%, #EFE0B0 100%)" }}
      >
        {/* Ambient gold glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,119,0.15) 0%, transparent 70%)" }}></div>

        {/* Decorative top border line */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #D4AF77, #FBF5B7, #D4AF77, transparent)" }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #D4AF77, #FBF5B7, #D4AF77, transparent)" }}></div>

        {/* Corner SVG flourishes */}
        <svg className="absolute top-0 left-0 w-56 h-56 pointer-events-none opacity-30" viewBox="0 0 200 200" fill="none">
          <path d="M 0 100 Q 40 60 80 100 Q 40 20 0 0" stroke="#9E7A31" strokeWidth="1" fill="none"/>
          <path d="M 0 140 Q 60 80 120 100 Q 60 20 0 0" stroke="#9E7A31" strokeWidth="0.6" fill="none" opacity="0.6"/>
          <ellipse cx="50" cy="50" rx="14" ry="24" fill="none" stroke="#9E7A31" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 50 50)"/>
          <circle cx="12" cy="12" r="4" fill="#9E7A31" opacity="0.5"/>
        </svg>
        <svg className="absolute top-0 right-0 w-56 h-56 pointer-events-none opacity-30 scale-x-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M 0 100 Q 40 60 80 100 Q 40 20 0 0" stroke="#9E7A31" strokeWidth="1" fill="none"/>
          <ellipse cx="50" cy="50" rx="14" ry="24" fill="none" stroke="#9E7A31" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 50 50)"/>
          <circle cx="12" cy="12" r="4" fill="#9E7A31" opacity="0.5"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none opacity-30 scale-y-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M 0 100 Q 40 60 80 100 Q 40 20 0 0" stroke="#9E7A31" strokeWidth="1" fill="none"/>
          <ellipse cx="50" cy="50" rx="14" ry="24" fill="none" stroke="#9E7A31" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 50 50)"/>
          <circle cx="12" cy="12" r="4" fill="#9E7A31" opacity="0.5"/>
        </svg>
        <svg className="absolute bottom-0 right-0 w-56 h-56 pointer-events-none opacity-30 scale-x-[-1] scale-y-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M 0 100 Q 40 60 80 100 Q 40 20 0 0" stroke="#9E7A31" strokeWidth="1" fill="none"/>
          <ellipse cx="50" cy="50" rx="14" ry="24" fill="none" stroke="#9E7A31" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 50 50)"/>
          <circle cx="12" cy="12" r="4" fill="#9E7A31" opacity="0.5"/>
        </svg>

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Section Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="text-center mb-10 flex flex-col items-center"
          >
            <motion.p variants={fadeDown} custom={0} className="font-script text-2xl md:text-3xl text-[#9E7A31] mb-2 drop-shadow-sm">
              उभय पक्ष परिवार
            </motion.p>
            <motion.h2 variants={fadeDown} custom={1} className="font-serif text-4xl md:text-5xl lg:text-[3.2rem] text-[#800020] uppercase tracking-[0.15em] mb-2 drop-shadow-sm">
              With the Blessings of Our Families
            </motion.h2>
            <motion.p variants={fadeDown} custom={2} className="font-sans text-sm md:text-base text-[#7A5C2A] tracking-[0.15em] italic mb-5">
              Proudly carrying forward our family legacy
            </motion.p>
            <motion.div variants={scaleIn} custom={3} className="flex items-center gap-4">
              <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-[#D4AF77]"></div>
              {/* Lotus ornament */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="16" cy="20" rx="4" ry="7" fill="#D4AF77" opacity="0.9"/>
                <ellipse cx="9" cy="18" rx="3.5" ry="6" fill="#C9A84C" opacity="0.7" transform="rotate(-25 9 18)"/>
                <ellipse cx="23" cy="18" rx="3.5" ry="6" fill="#C9A84C" opacity="0.7" transform="rotate(25 23 18)"/>
                <ellipse cx="4" cy="22" rx="3" ry="5" fill="#B8942A" opacity="0.5" transform="rotate(-45 4 22)"/>
                <ellipse cx="28" cy="22" rx="3" ry="5" fill="#B8942A" opacity="0.5" transform="rotate(45 28 22)"/>
                <line x1="16" y1="28" x2="16" y2="32" stroke="#D4AF77" strokeWidth="1.5"/>
                <path d="M 8 30 Q 16 26 24 30" stroke="#D4AF77" strokeWidth="1" fill="none"/>
              </svg>
              <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-[#D4AF77]"></div>
            </motion.div>
          </motion.div>

          {/* Family Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* ── BRIDE'S FAMILY CARD ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group"
            >
              <div
                className="relative h-full rounded-sm overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(158,122,49,0.25)]"
                style={{ background: "linear-gradient(145deg, #FDFBF4 0%, #F7EDCF 50%, #FDFBF4 100%)" }}
              >
                {/* Animated eternal-knot border on hover */}
                <div className="absolute inset-0 rounded-sm pointer-events-none z-10 transition-all duration-700"
                  style={{ boxShadow: "inset 0 0 0 1.5px rgba(212,175,119,0.6)" }}>
                </div>
                <div className="absolute inset-[5px] rounded-sm pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,119,0.4)" }}>
                </div>

                {/* Top ribbon band */}
                <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #FBF5B7, #C9A84C, #FBF5B7, #C9A84C)" }}></div>

                {/* Corner ornaments */}
                <svg className="absolute top-3 left-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>
                <svg className="absolute top-3 right-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20 rotate-90" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>
                <svg className="absolute bottom-3 left-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20 -rotate-90" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>
                <svg className="absolute bottom-3 right-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20 rotate-180" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>

                <div className="px-8 md:px-12 py-6 md:py-8 relative z-30">
                  {/* Family Label */}
                  <div className="text-center mb-4">
                    <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[#9E7A31] mb-1">Bride's Family</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px w-10 bg-[#D4AF77]/60"></div>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="#D4AF77"><polygon points="6,0 7.5,4.5 12,4.5 8.5,7 10,12 6,9 2,12 3.5,7 0,4.5 4.5,4.5"/></svg>
                      <div className="h-px w-10 bg-[#D4AF77]/60"></div>
                    </div>
                  </div>

                  {/* Parents' Names */}
                  <div className="text-center mb-6">
                    <p className="font-script text-3xl md:text-4xl text-[#800020] leading-tight mb-1">Mr. Vikram</p>
                    <p className="font-script text-3xl md:text-4xl text-[#800020] leading-tight">&amp; Mrs. Meera Verma</p>
                    <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#9E7A31]/80 mt-3">Parents of the Bride · Priya Verma</p>
                  </div>

                  {/* Thin gold divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF77]/60"></div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2 C9 2 5 7 5 10 C5 12.76 6.91 15 9 15 C11.09 15 13 12.76 13 10 C13 7 9 2 9 2Z" fill="#D4AF77" opacity="0.7"/>
                    </svg>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF77]/60"></div>
                  </div>

                  {/* Business section label */}
                  <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[#9E7A31] text-center mb-4">Proprietors &amp; Directors of</p>

                  {/* Business List */}
                  <div className="space-y-3">
                    {[
                      "Verma Jewellers & Sons",
                      "Meera Real Estate Group",
                      "V.K. Verma & Associates (Legal Consultancy)",
                    ].map((biz, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-80" viewBox="0 0 16 16" fill="none">
                          <ellipse cx="8" cy="11" rx="2.5" ry="4.5" fill="#C9A84C"/>
                          <ellipse cx="4" cy="10" rx="2" ry="3.5" fill="#B8942A" opacity="0.7" transform="rotate(-25 4 10)"/>
                          <ellipse cx="12" cy="10" rx="2" ry="3.5" fill="#B8942A" opacity="0.7" transform="rotate(25 12 10)"/>
                          <line x1="8" y1="15" x2="8" y2="16" stroke="#C9A84C" strokeWidth="1.2"/>
                        </svg>
                        <p className="font-serif text-[0.95rem] leading-snug text-[#7A4F1D] font-medium">
                          {biz}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom ribbon */}
                <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #FBF5B7, #C9A84C, #FBF5B7, #C9A84C)" }}></div>
              </div>
            </motion.div>

            {/* ── GROOM'S FAMILY CARD ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group"
            >
              <div
                className="relative h-full rounded-sm overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(158,122,49,0.25)]"
                style={{ background: "linear-gradient(145deg, #FDFBF4 0%, #F7EDCF 50%, #FDFBF4 100%)" }}
              >
                {/* Animated eternal-knot border */}
                <div className="absolute inset-0 rounded-sm pointer-events-none z-10 transition-all duration-700"
                  style={{ boxShadow: "inset 0 0 0 1.5px rgba(212,175,119,0.6)" }}>
                </div>
                <div className="absolute inset-[5px] rounded-sm pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,119,0.4)" }}>
                </div>

                {/* Top ribbon */}
                <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #FBF5B7, #C9A84C, #FBF5B7, #C9A84C)" }}></div>

                {/* Corner ornaments */}
                <svg className="absolute top-3 left-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>
                <svg className="absolute top-3 right-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20 rotate-90" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>
                <svg className="absolute bottom-3 left-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20 -rotate-90" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>
                <svg className="absolute bottom-3 right-3 w-10 h-10 text-[#D4AF77]/50 pointer-events-none z-20 rotate-180" viewBox="0 0 40 40" fill="none">
                  <path d="M 0 20 C 0 8, 8 0, 20 0" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="2.5" fill="currentColor"/>
                </svg>

                <div className="px-8 md:px-12 py-6 md:py-8 relative z-30">
                  {/* Family Label */}
                  <div className="text-center mb-4">
                    <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[#9E7A31] mb-1">Groom's Family</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px w-10 bg-[#D4AF77]/60"></div>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="#D4AF77"><polygon points="6,0 7.5,4.5 12,4.5 8.5,7 10,12 6,9 2,12 3.5,7 0,4.5 4.5,4.5"/></svg>
                      <div className="h-px w-10 bg-[#D4AF77]/60"></div>
                    </div>
                  </div>

                  {/* Parents' Names */}
                  <div className="text-center mb-6">
                    <p className="font-script text-3xl md:text-4xl text-[#800020] leading-tight mb-1">Mr. Rajesh</p>
                    <p className="font-script text-3xl md:text-4xl text-[#800020] leading-tight">&amp; Mrs. Sunita Sharma</p>
                    <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#9E7A31]/80 mt-3">Parents of the Groom · Aaryan Sharma</p>
                  </div>

                  {/* Thin gold divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF77]/60"></div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2 C9 2 5 7 5 10 C5 12.76 6.91 15 9 15 C11.09 15 13 12.76 13 10 C13 7 9 2 9 2Z" fill="#D4AF77" opacity="0.7"/>
                    </svg>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF77]/60"></div>
                  </div>

                  {/* Business section label */}
                  <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[#9E7A31] text-center mb-4">Proprietors &amp; Directors of</p>

                  {/* Business List */}
                  <div className="space-y-3">
                    {[
                      "Sharma Textiles & Exports Pvt. Ltd.",
                      "Rajesh Construction & Developers",
                      "S.R. Agro Industries",
                    ].map((biz, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-80" viewBox="0 0 16 16" fill="none">
                          <ellipse cx="8" cy="11" rx="2.5" ry="4.5" fill="#C9A84C"/>
                          <ellipse cx="4" cy="10" rx="2" ry="3.5" fill="#B8942A" opacity="0.7" transform="rotate(-25 4 10)"/>
                          <ellipse cx="12" cy="10" rx="2" ry="3.5" fill="#B8942A" opacity="0.7" transform="rotate(25 12 10)"/>
                          <line x1="8" y1="15" x2="8" y2="16" stroke="#C9A84C" strokeWidth="1.2"/>
                        </svg>
                        <p className="font-serif text-[0.95rem] leading-snug text-[#7A4F1D] font-medium">
                          {biz}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom ribbon */}
                <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #FBF5B7, #C9A84C, #FBF5B7, #C9A84C)" }}></div>
              </div>
            </motion.div>

          </div>

          {/* Bottom blessing tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-10"
          >
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-20 md:w-36 bg-gradient-to-r from-transparent to-[#D4AF77]/50"></div>
              <p className="font-script text-2xl md:text-3xl text-[#9E7A31]">समृद्धि और सौभाग्य</p>
              <div className="h-px w-20 md:w-36 bg-gradient-to-l from-transparent to-[#D4AF77]/50"></div>
            </div>
            <p className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#9E7A31]/70 mt-2">Prosperity & Auspiciousness</p>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Wedding & Muhurat Detail Section                   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        id="muhurat"
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1A0A05 0%, #2D0F0A 35%, #1F0D06 65%, #3B1510 100%)" }}
      >
        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,119,0.08) 0%, transparent 70%)" }}></div>

        {/* Corner ornamental flourishes */}
        {/* Top-left */}
        <svg className="absolute top-0 left-0 w-64 md:w-80 h-64 md:h-80 pointer-events-none opacity-60" viewBox="0 0 200 200" fill="none">
          <path d="M 0 80 Q 20 60 40 80 Q 60 100 80 80 Q 60 40 20 20 Q 0 10 0 0" stroke="#D4AF77" strokeWidth="0.8" fill="none"/>
          <path d="M 0 120 Q 30 90 60 120 Q 90 150 120 120 Q 90 60 40 30 Q 10 10 0 0" stroke="#D4AF77" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <circle cx="15" cy="15" r="4" fill="#D4AF77" opacity="0.5"/>
          <circle cx="8" cy="8" r="2" fill="#D4AF77" opacity="0.4"/>
          <ellipse cx="55" cy="55" rx="12" ry="20" fill="none" stroke="#D4AF77" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 55 55)"/>
          <ellipse cx="80" cy="30" rx="8" ry="15" fill="none" stroke="#D4AF77" strokeWidth="0.7" opacity="0.4" transform="rotate(-60 80 30)"/>
          <ellipse cx="30" cy="85" rx="9" ry="16" fill="none" stroke="#D4AF77" strokeWidth="0.7" opacity="0.4" transform="rotate(-25 30 85)"/>
        </svg>
        {/* Top-right */}
        <svg className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 pointer-events-none opacity-60 scale-x-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M 0 80 Q 20 60 40 80 Q 60 100 80 80 Q 60 40 20 20 Q 0 10 0 0" stroke="#D4AF77" strokeWidth="0.8" fill="none"/>
          <path d="M 0 120 Q 30 90 60 120 Q 90 150 120 120 Q 90 60 40 30 Q 10 10 0 0" stroke="#D4AF77" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <circle cx="15" cy="15" r="4" fill="#D4AF77" opacity="0.5"/>
          <ellipse cx="55" cy="55" rx="12" ry="20" fill="none" stroke="#D4AF77" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 55 55)"/>
          <ellipse cx="80" cy="30" rx="8" ry="15" fill="none" stroke="#D4AF77" strokeWidth="0.7" opacity="0.4" transform="rotate(-60 80 30)"/>
        </svg>
        {/* Bottom-left */}
        <svg className="absolute bottom-0 left-0 w-64 md:w-80 h-64 md:h-80 pointer-events-none opacity-60 scale-y-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M 0 80 Q 20 60 40 80 Q 60 100 80 80 Q 60 40 20 20 Q 0 10 0 0" stroke="#D4AF77" strokeWidth="0.8" fill="none"/>
          <ellipse cx="55" cy="55" rx="12" ry="20" fill="none" stroke="#D4AF77" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 55 55)"/>
          <circle cx="35" cy="160" r="6" fill="none" stroke="#D4AF77" strokeWidth="0.8" opacity="0.4"/>
        </svg>
        {/* Bottom-right */}
        <svg className="absolute bottom-0 right-0 w-64 md:w-80 h-64 md:h-80 pointer-events-none opacity-60 scale-x-[-1] scale-y-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M 0 80 Q 20 60 40 80 Q 60 100 80 80 Q 60 40 20 20 Q 0 10 0 0" stroke="#D4AF77" strokeWidth="0.8" fill="none"/>
          <ellipse cx="55" cy="55" rx="12" ry="20" fill="none" stroke="#D4AF77" strokeWidth="0.8" opacity="0.5" transform="rotate(-45 55 55)"/>
        </svg>

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-10 md:mb-12"
          >
            <p className="font-script text-3xl md:text-4xl text-[#D4AF77] mb-2 drop-shadow-lg">Auspicious Timings</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5E6C8] uppercase tracking-[0.15em] mb-6 drop-shadow-lg">
              Wedding <span className="text-[#D4AF77]">&</span> Muhurat
            </h2>
            {/* Gold double-line divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-[#D4AF77]"></div>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polygon points="14,2 17,11 26,11 19,17 22,26 14,20 6,26 9,17 2,11 11,11" fill="#D4AF77" opacity="0.9"/>
              </svg>
              <div className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-[#D4AF77]"></div>
            </div>
          </motion.div>

          {/* Main Content: Central Mandala + Two Columns */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12 items-stretch">

            {/* LEFT COLUMN — Bride's Side Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="flex-1 flex flex-col gap-3"
            >
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  ),
                  label: "Wedding Date",
                  value: "24th November, 2026",
                  sub: "Monday — Mangalvar"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  ),
                  label: "Shubh Muhurat",
                  value: "06:47 PM — 08:20 PM",
                  sub: "Lagna Muhurat (Vrishchik)"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  ),
                  label: "Baraat Procession",
                  value: "05:00 PM Onwards",
                  sub: "Groom's grand entry"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  label: "Jaimala / Varmala",
                  value: "06:30 PM",
                  sub: "Exchange of garlands"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                  className="group relative flex gap-5 items-start p-3 rounded-sm border border-[#D4AF77]/20 hover:border-[#D4AF77]/50 transition-all duration-400"
                  style={{ background: "linear-gradient(135deg, rgba(212,175,119,0.06) 0%, rgba(30,12,6,0.7) 100%)" }}
                >
                  {/* Gold left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF77] to-transparent rounded-full"></div>
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#D4AF77]/40 rounded-sm bg-[#D4AF77]/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#D4AF77]/70 mb-1">{item.label}</p>
                    <p className="font-serif text-[1.05rem] text-[#F5E6C8] font-medium leading-tight">{item.value}</p>
                    <p className="font-sans text-[0.72rem] text-[#D4AF77]/60 mt-1 tracking-wide">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CENTER — Ornate Mandala / Sun Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-shrink-0 flex flex-col items-center justify-center order-first lg:order-none"
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
                {/* Outer rotating ring */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="95" stroke="#D4AF77" strokeWidth="0.6" strokeDasharray="6 4" opacity="0.5"/>
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="100" y1="6"
                      x2="100" y2="18"
                      stroke="#D4AF77"
                      strokeWidth="1.2"
                      opacity="0.6"
                      transform={`rotate(${i * 15} 100 100)`}
                    />
                  ))}
                </svg>

                {/* Inner mandala petals */}
                <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)]" viewBox="0 0 160 160" fill="none">
                  <circle cx="80" cy="80" r="76" stroke="#D4AF77" strokeWidth="0.8" opacity="0.4"/>
                  <circle cx="80" cy="80" r="60" stroke="#D4AF77" strokeWidth="0.5" opacity="0.3"/>
                  {[...Array(8)].map((_, i) => (
                    <ellipse
                      key={i}
                      cx="80" cy="28"
                      rx="8" ry="22"
                      fill="#D4AF77"
                      opacity="0.15"
                      transform={`rotate(${i * 45} 80 80)`}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <ellipse
                      key={i}
                      cx="80" cy="38"
                      rx="5" ry="14"
                      fill="#D4AF77"
                      opacity="0.2"
                      transform={`rotate(${i * 45 + 22.5} 80 80)`}
                    />
                  ))}
                  <circle cx="80" cy="80" r="28" fill="#D4AF77" opacity="0.07"/>
                  <circle cx="80" cy="80" r="18" fill="#D4AF77" opacity="0.1"/>
                </svg>

                {/* Center Card */}
                <div
                  className="relative z-10 w-44 h-44 md:w-52 md:h-52 flex flex-col items-center justify-center border border-[#D4AF77]/50 text-center p-4"
                  style={{ background: "linear-gradient(135deg, rgba(59,21,16,0.9) 0%, rgba(26,10,5,0.95) 100%)" }}
                >
                  <p className="font-script text-2xl text-[#D4AF77] mb-1">A & P</p>
                  <div className="w-10 h-px bg-[#D4AF77]/40 mx-auto mb-2"></div>
                  <p className="font-serif text-[0.7rem] tracking-[0.15em] uppercase text-[#F5E6C8]/80 mb-2">Wedding</p>
                  <p className="font-serif text-xl md:text-2xl text-[#F5E6C8] font-medium leading-tight">24 · 11</p>
                  <p className="font-serif text-xl md:text-2xl text-[#F5E6C8] font-medium">2026</p>
                  <div className="w-10 h-px bg-[#D4AF77]/40 mx-auto mt-2 mb-2"></div>
                  <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-[#D4AF77]/70">Udaipur, Rajasthan</p>
                </div>
              </div>

              {/* Sanskrit / Hindi blessing text below mandala */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-4 text-center"
              >
                <p className="font-script text-2xl text-[#D4AF77] mb-1">शुभ विवाह</p>
                <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#D4AF77]/50">Shubh Vivah</p>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN — Venue & Ceremony Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="flex-1 flex flex-col gap-5"
            >
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: "Wedding Venue",
                  value: "The Palace Fort",
                  sub: "Lake Pichola, Udaipur, Rajasthan"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  ),
                  label: "Pheras (Sacred Vows)",
                  value: "07:00 PM — 08:00 PM",
                  sub: "Seven sacred rounds around the fire"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                  ),
                  label: "Sindoor & Mangalsutra",
                  value: "08:15 PM",
                  sub: "Final sacred rituals & blessings"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#D4AF77" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  ),
                  label: "Vidaai Ceremony",
                  value: "09:30 PM Onwards",
                  sub: "The bittersweet farewell"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                  className="group relative flex gap-5 items-start p-5 rounded-sm border border-[#D4AF77]/20 hover:border-[#D4AF77]/50 transition-all duration-400"
                  style={{ background: "linear-gradient(225deg, rgba(212,175,119,0.06) 0%, rgba(30,12,6,0.7) 100%)" }}
                >
                  {/* Gold right accent bar */}
                  <div className="absolute right-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF77] to-transparent rounded-full"></div>
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#D4AF77]/40 rounded-sm bg-[#D4AF77]/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#D4AF77]/70 mb-1">{item.label}</p>
                    <p className="font-serif text-[1.05rem] text-[#F5E6C8] font-medium leading-tight">{item.value}</p>
                    <p className="font-sans text-[0.72rem] text-[#D4AF77]/60 mt-1 tracking-wide">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Gold Ornament */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-10 md:mt-12"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent to-[#D4AF77]/60"></div>
              <svg viewBox="0 0 60 20" className="w-16 h-5" fill="none">
                <path d="M0 10 Q15 0 30 10 Q45 20 60 10" stroke="#D4AF77" strokeWidth="1" opacity="0.7"/>
                <circle cx="30" cy="10" r="3" fill="#D4AF77" opacity="0.7"/>
                <circle cx="10" cy="10" r="1.5" fill="#D4AF77" opacity="0.5"/>
                <circle cx="50" cy="10" r="1.5" fill="#D4AF77" opacity="0.5"/>
              </svg>
              <div className="h-px w-24 md:w-40 bg-gradient-to-l from-transparent to-[#D4AF77]/60"></div>
            </div>
            <p className="font-script text-2xl md:text-3xl text-[#D4AF77] mt-6 drop-shadow-md">With the blessings of the divine</p>
          </motion.div>
        </div>
      </section>

      {/* Wedding Events Section */}
      <section 
        id="events" 
        className="py-24 md:py-32 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url("${IMAGES.eventsBg}")` }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Custom Header matching the design */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="text-center mb-16 flex flex-col items-center"
          >
            <motion.h2 variants={fadeDown} custom={0} className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-[#800020] uppercase tracking-[0.15em] mb-4 drop-shadow-sm">
              Wedding Events
            </motion.h2>
            <motion.div variants={scaleIn} custom={1} className="flex items-center justify-center gap-4">
              <div className="w-16 md:w-24 h-px bg-[#800020]/40"></div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF77" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="w-16 md:w-24 h-px bg-[#800020]/40"></div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 justify-center">
            {[
              {
                title: "Mehendi Ceremony",
                date: "Nov 22, 2026",
                time: "02:00 PM Onwards",
                venue: "The Royal Gardens, Udaipur",
                icon: <Heart className="w-16 h-16 text-[#A67843] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] fill-[#C99C6A]" strokeWidth={1} />,
                bg: "radial-gradient(circle at 30% 60%, #EBEFE8 0%, #DCE3D6 40%, #1A3828 100%)",
                desc: "Join us for an afternoon of colors, henna, and joy as we kickstart the wedding festivities."
              },
              {
                title: "Sangeet Night",
                date: "Nov 23, 2026",
                time: "07:30 PM Onwards",
                venue: "The Grand Ballroom",
                icon: <Music className="w-16 h-16 text-[#A67843] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] fill-[#C99C6A]" strokeWidth={1} />,
                bg: "radial-gradient(circle at 30% 60%, #E8EDF2 0%, #D3DDE6 40%, #1C355E 100%)",
                desc: "Get ready to dance the night away! A glamorous evening of music, performances, and cocktails."
              },
              {
                title: "Haldi & Choora",
                date: "Nov 24, 2026",
                time: "09:00 AM",
                venue: "Courtyard By The Lake",
                icon: <Camera className="w-16 h-16 text-[#A67843] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] fill-[#C99C6A]" strokeWidth={1} />,
                bg: "radial-gradient(circle at 30% 60%, #F5EFE6 0%, #EBE1CB 40%, #D48F25 100%)",
                desc: "Traditional morning rituals filled with yellow hues, laughter, and blessings."
              },
              {
                title: "Wedding Ceremony",
                date: "Nov 24, 2026",
                time: "06:00 PM",
                venue: "The Palace Fort, Udaipur",
                icon: <Heart className="w-16 h-16 text-[#A67843] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] fill-[#C99C6A]" strokeWidth={1} />,
                bg: "radial-gradient(circle at 30% 60%, #F5EAEB 0%, #E3CDD0 40%, #681A26 100%)",
                desc: "The baraat, the pheras, and the beginning of forever. Witness our union under the stars."
              },
              {
                title: "Reception",
                date: "Nov 25, 2026",
                time: "08:00 PM Onwards",
                venue: "The Crystal Palace",
                icon: <Music className="w-16 h-16 text-[#A67843] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] fill-[#C99C6A]" strokeWidth={1} />,
                bg: "radial-gradient(circle at 30% 60%, #FDF6E3 0%, #EAE2B7 40%, #A57A44 100%)",
                desc: "An evening of elegance, fine dining, and celebrations as we begin our new life together."
              }
            ].map((event, index) => (
              <motion.div 
                key={index}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                custom={index}
                className="w-full flex justify-center"
              >
                {/* Outer Gold/Bronze Frame */}
                <div className="relative p-2 bg-gradient-to-br from-[#E2BE8B] via-[#9B6E39] to-[#E2BE8B] shadow-[0_20px_40px_rgba(0,0,0,0.25)] rounded-sm w-full max-w-md aspect-[4/3.8] flex">
                  {/* Inner dark rim for 3D effect */}
                  <div className="absolute inset-0 border border-[#523315] rounded-sm pointer-events-none z-20"></div>
                  
                  {/* The Card Content Container */}
                  <div 
                    className="relative w-full h-full border-[3px] border-[#FDF6DE] overflow-hidden flex flex-col p-6 z-10"
                    style={{ background: event.bg }}
                  >
                    {/* Corner Ornaments (Inner Card) */}
                    <svg className="absolute top-0 left-0 w-32 h-32 text-[#A67843]/30 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M 0 0 L 100 0 C 100 0, 50 20, 50 50 C 20 50, 0 100, 0 100 Z" />
                      <circle cx="20" cy="20" r="10" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-32 h-32 text-[#A67843]/30 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M 0 0 L 100 0 C 100 0, 50 20, 50 50 C 20 50, 0 100, 0 100 Z" />
                      <circle cx="20" cy="20" r="10" />
                    </svg>
                    
                    {/* Top Section: Title */}
                    <div className="relative z-20 mt-6">
                      <h4 className="font-serif text-[1.65rem] text-[#800020] mb-4 font-medium tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                        {event.title}
                      </h4>
                      
                      {/* Grid for Details + Icon */}
                      <div className="flex justify-between items-start">
                        {/* Details */}
                        <div className="space-y-2.5 font-sans text-[0.8rem] text-gray-800 font-medium tracking-wide flex-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />
                            <span>{event.venue}</span>
                          </div>
                        </div>

                        {/* Floating Decorative Icon */}
                        <div className="ml-4 -mt-2 opacity-90 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                          {event.icon}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-[0.85rem] text-gray-800 leading-relaxed mt-5 font-medium relative z-20 max-w-[85%]">
                        {event.desc}
                      </p>
                    </div>

                    {/* Bottom Decorative Swirls / Accents */}
                    <svg className="absolute -bottom-10 -left-10 w-48 h-48 text-[#A67843]/20 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M 0 200 C 50 150 100 200 150 100 C 200 0 100 0 100 0" />
                      <path d="M 50 200 C 100 150 150 200 200 100" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        id="gallery" 
        className="py-16 md:py-20 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url("${IMAGES.storyBg}")` }}
      >
        {/* Corner Floral Decorations */}
        <svg className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 pointer-events-none opacity-70" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="25" fill="#F5DEB3" opacity="0.6"/>
          <circle cx="30" cy="30" r="12" fill="#FFD700" opacity="0.4"/>
          <path d="M 5 5 Q 50 0 80 40 Q 100 70 60 100" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M 60 100 Q 40 130 10 120" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.5"/>
          <ellipse cx="55" cy="45" rx="15" ry="25" fill="#90EE90" opacity="0.4" transform="rotate(-45 55 45)"/>
          <ellipse cx="30" cy="70" rx="12" ry="20" fill="#90EE90" opacity="0.3" transform="rotate(20 30 70)"/>
          <circle cx="75" cy="95" r="18" fill="#FFE4E1" opacity="0.5"/>
          <circle cx="75" cy="95" r="8" fill="#FFB6C1" opacity="0.4"/>
        </svg>
        <svg className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 pointer-events-none opacity-70 scale-x-[-1]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="25" fill="#F5DEB3" opacity="0.6"/>
          <circle cx="30" cy="30" r="12" fill="#FFD700" opacity="0.4"/>
          <path d="M 5 5 Q 50 0 80 40 Q 100 70 60 100" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.5"/>
          <ellipse cx="55" cy="45" rx="15" ry="25" fill="#90EE90" opacity="0.4" transform="rotate(-45 55 45)"/>
          <circle cx="75" cy="95" r="18" fill="#FFE4E1" opacity="0.5"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 pointer-events-none opacity-70 scale-y-[-1]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="25" fill="#F5DEB3" opacity="0.6"/>
          <path d="M 5 5 Q 50 0 80 40 Q 100 70 60 100" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.5"/>
          <ellipse cx="55" cy="45" rx="15" ry="25" fill="#90EE90" opacity="0.4" transform="rotate(-45 55 45)"/>
          <circle cx="75" cy="95" r="18" fill="#FFE4E1" opacity="0.5"/>
        </svg>
        <svg className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 pointer-events-none opacity-70 scale-x-[-1] scale-y-[-1]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="25" fill="#F5DEB3" opacity="0.6"/>
          <path d="M 5 5 Q 50 0 80 40 Q 100 70 60 100" stroke="#8B7355" strokeWidth="2" fill="none" opacity="0.5"/>
          <ellipse cx="55" cy="45" rx="15" ry="25" fill="#90EE90" opacity="0.4" transform="rotate(-45 55 45)"/>
          <circle cx="75" cy="95" r="18" fill="#FFE4E1" opacity="0.5"/>
        </svg>

        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          {/* Custom Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="text-center mb-10 flex flex-col items-center"
          >
            <motion.p variants={fadeDown} custom={0} className="font-script text-2xl md:text-3xl text-[#9E7A31] mb-2 drop-shadow-sm">A glimpse of our journey</motion.p>
            <motion.h2 variants={fadeDown} custom={1} className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#800020] uppercase tracking-[0.12em] mb-5 drop-shadow-sm">
              Memories
            </motion.h2>
            {/* Gold heart divider */}
            <motion.div variants={scaleIn} custom={2} className="flex items-center gap-3">
              <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF77]"></div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#gal-gold)" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF77"/>
                    <stop offset="50%" stopColor="#FBF5B7"/>
                    <stop offset="100%" stopColor="#9E7A31"/>
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#D4AF77]"></div>
            </motion.div>
          </motion.div>
          
          {/* Gallery Grid — Ornate Framed Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
            {IMAGES.gallery.map((img, i) => {
              // Alternate frame styles like in the reference
              const isWooden = i % 3 === 0;
              const isGold = i % 3 === 1;
              const isPolaroid = i % 3 === 2;
              const frameGradient = isWooden
                ? "from-[#8B5E3C] via-[#A0724A] to-[#6B4226]"
                : isGold
                ? "from-[#C9A84C] via-[#E2BE8B] to-[#9B6E39]"
                : "from-[#7A6535] via-[#C5A75A] to-[#7A6535]";
              const innerBorder = isWooden ? "#5C3D1E" : isGold ? "#7A5C2A" : "#4A3B1A";
              return (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                  custom={i}
                  whileHover={{ y: -10, scale: 1.03, rotate: i % 2 === 0 ? -0.6 : 0.6, transition: { duration: 0.3 } }}
                  className="cursor-pointer group"
                  onClick={() => setActiveImage(img)}
                >
                  {/* Outer ornate frame */}
                  <div className={`relative p-[10px] bg-gradient-to-br ${frameGradient} shadow-[0_15px_35px_rgba(0,0,0,0.3)] rounded-sm`}>
                    {/* Frame corner ornaments */}
                    <svg className="absolute -top-1 -left-1 w-8 h-8 pointer-events-none z-20" viewBox="0 0 30 30" fill="none">
                      <path d="M 0 15 C 0 5, 5 0, 15 0" stroke="#FBF5B7" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="2.5" fill="#FBF5B7"/>
                    </svg>
                    <svg className="absolute -top-1 -right-1 w-8 h-8 pointer-events-none z-20 rotate-90" viewBox="0 0 30 30" fill="none">
                      <path d="M 0 15 C 0 5, 5 0, 15 0" stroke="#FBF5B7" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="2.5" fill="#FBF5B7"/>
                    </svg>
                    <svg className="absolute -bottom-1 -left-1 w-8 h-8 pointer-events-none z-20 -rotate-90" viewBox="0 0 30 30" fill="none">
                      <path d="M 0 15 C 0 5, 5 0, 15 0" stroke="#FBF5B7" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="2.5" fill="#FBF5B7"/>
                    </svg>
                    <svg className="absolute -bottom-1 -right-1 w-8 h-8 pointer-events-none z-20 rotate-180" viewBox="0 0 30 30" fill="none">
                      <path d="M 0 15 C 0 5, 5 0, 15 0" stroke="#FBF5B7" strokeWidth="1.5"/>
                      <circle cx="4" cy="4" r="2.5" fill="#FBF5B7"/>
                    </svg>

                    {/* Inner frame border */}
                    <div 
                      className="absolute inset-[10px] border pointer-events-none z-10 rounded-[1px]"
                      style={{ borderColor: innerBorder }}
                    ></div>

                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={img}
                        alt={`Memory ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{ transform: 'scale(1)' }}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#800020]/0 group-hover:bg-[#800020]/30 transition-all duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                          <Heart className="w-10 h-10 text-white drop-shadow-lg fill-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom romantic tagline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            custom={0}
            className="text-center mt-10"
          >
            <p className="font-script text-3xl md:text-4xl text-[#9E7A31] drop-shadow-sm">where love finds its home.</p>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section 
        id="rsvp" 
        className="py-12 md:py-16 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url("${IMAGES.rsvpBg}")` }}
      >
        {/* Gold botanical corner decorations */}
        {/* Top-left */}
        <svg className="absolute top-0 left-0 w-52 md:w-72 h-52 md:h-72 pointer-events-none opacity-90" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 180 C 40 120, 60 80, 110 20" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
          <ellipse cx="60" cy="60" rx="18" ry="28" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-40 60 60)"/>
          <ellipse cx="85" cy="35" rx="14" ry="22" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-60 85 35)"/>
          <ellipse cx="40" cy="90" rx="16" ry="24" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-20 40 90)"/>
          <ellipse cx="25" cy="130" rx="13" ry="20" fill="none" stroke="#C9A84C" strokeWidth="1" transform="rotate(10 25 130)"/>
          <circle cx="20" cy="180" r="4" fill="#C9A84C" opacity="0.6"/>
          <circle cx="60" cy="60" r="3" fill="#C9A84C" opacity="0.5"/>
        </svg>
        {/* Top-right */}
        <svg className="absolute top-0 right-0 w-52 md:w-72 h-52 md:h-72 pointer-events-none opacity-90 scale-x-[-1]" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 180 C 40 120, 60 80, 110 20" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
          <ellipse cx="60" cy="60" rx="18" ry="28" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-40 60 60)"/>
          <ellipse cx="85" cy="35" rx="14" ry="22" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-60 85 35)"/>
          <ellipse cx="40" cy="90" rx="16" ry="24" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-20 40 90)"/>
          <ellipse cx="25" cy="130" rx="13" ry="20" fill="none" stroke="#C9A84C" strokeWidth="1" transform="rotate(10 25 130)"/>
        </svg>
        {/* Bottom-left */}
        <svg className="absolute bottom-0 left-0 w-52 md:w-72 h-52 md:h-72 pointer-events-none opacity-90 scale-y-[-1]" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 180 C 40 120, 60 80, 110 20" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
          <ellipse cx="60" cy="60" rx="18" ry="28" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-40 60 60)"/>
          <ellipse cx="85" cy="35" rx="14" ry="22" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-60 85 35)"/>
          <ellipse cx="40" cy="90" rx="16" ry="24" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-20 40 90)"/>
          <circle cx="35" cy="160" r="8" fill="none" stroke="#C9A84C" strokeWidth="1"/>
          <circle cx="35" cy="160" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.8"/>
        </svg>
        {/* Bottom-right */}
        <svg className="absolute bottom-0 right-0 w-52 md:w-72 h-52 md:h-72 pointer-events-none opacity-90 scale-x-[-1] scale-y-[-1]" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 180 C 40 120, 60 80, 110 20" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
          <ellipse cx="60" cy="60" rx="18" ry="28" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-40 60 60)"/>
          <ellipse cx="85" cy="35" rx="14" ry="22" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-60 85 35)"/>
          <ellipse cx="40" cy="90" rx="16" ry="24" fill="none" stroke="#C9A84C" strokeWidth="1.2" transform="rotate(-20 40 90)"/>
          <circle cx="35" cy="160" r="8" fill="none" stroke="#C9A84C" strokeWidth="1"/>
        </svg>

        <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="text-center mb-6"
          >
            <motion.p variants={fadeDown} custom={0} className="font-script text-4xl md:text-5xl text-[#C9A84C] mb-2 drop-shadow-md">Be our guest</motion.p>
            <motion.h2 variants={fadeDown} custom={1} className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#E8D5A3] uppercase tracking-[0.2em] drop-shadow-lg">RSVP</motion.h2>
            <motion.div variants={scaleIn} custom={2} className="mt-5 flex items-center justify-center gap-4">
              <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-[#C9A84C]"></div>
              <div className="border border-[#C9A84C] p-1.5 rounded-sm">
                <Mail className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-[#C9A84C]"></div>
            </motion.div>
          </motion.div>

          {/* Beveled Gold Frame Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative p-[2px]"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 25%, #C9A84C 50%, #8B6914 75%, #C9A84C 100%)",
              clipPath: "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)"
            }}
          >
            <div 
              className="relative p-5 md:p-8 lg:p-12"
              style={{
                background: "rgba(22, 18, 14, 0.88)",
                clipPath: "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)"
              }}
            >
              <form 
                className="space-y-5" 
                onSubmit={(e) => { e.preventDefault(); alert("Thank you for your RSVP! This is a demo."); }}
              >
                {/* Row 1 */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} custom={0} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <label className="block font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Full Name</label>
                    <div className="border border-[#C9A84C]/30 bg-[#1A1410]/60 px-4 py-2">
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-transparent text-[#E8D5A3] focus:outline-none font-sans text-sm placeholder-[#7A6535]" 
                        placeholder="Enter your name" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Email Address</label>
                    <div className="border border-[#C9A84C]/30 bg-[#1A1410]/60 px-4 py-2">
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-transparent text-[#E8D5A3] focus:outline-none font-sans text-sm placeholder-[#7A6535]" 
                        placeholder="Enter your email" 
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Row 2 */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} custom={1} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <label className="block font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Will You Attend?</label>
                    <div className="border border-[#C9A84C]/30 bg-[#1A1410]/60 px-4 py-3 relative">
                      <select className="w-full bg-transparent text-[#E8D5A3] focus:outline-none font-sans text-sm appearance-none cursor-pointer">
                        <option value="yes" className="bg-[#1A1410]">Joyfully Accept</option>
                        <option value="no" className="bg-[#1A1410]">Regretfully Decline</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Number of Guests</label>
                    <div className="border border-[#C9A84C]/30 bg-[#1A1410]/60 px-4 py-3 relative">
                      <select className="w-full bg-transparent text-[#E8D5A3] focus:outline-none font-sans text-sm appearance-none cursor-pointer">
                        <option value="1" className="bg-[#1A1410]">Just me (1)</option>
                        <option value="2" className="bg-[#1A1410]">Two of us (2)</option>
                        <option value="3" className="bg-[#1A1410]">Three (3)</option>
                        <option value="4" className="bg-[#1A1410]">Four (4)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Row 3 */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} custom={2}>
                  <label className="block font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">Any Dietary Requirements?</label>
                  <div className="border border-[#C9A84C]/30 bg-[#1A1410]/60 px-4 py-3">
                    <input 
                      type="text" 
                      className="w-full bg-transparent text-[#E8D5A3] focus:outline-none font-sans text-sm placeholder-[#7A6535]" 
                      placeholder="Vegetarian, Vegan, Gluten-free, etc." 
                    />
                  </div>
                </motion.div>

                {/* Row 4 */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP} custom={3}>
                  <label className="block font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">Leave a Message for the Couple</label>
                  <div className="border border-[#C9A84C]/30 bg-[#1A1410]/60 px-4 py-2">
                    <textarea 
                      rows={3} 
                      className="w-full bg-transparent text-[#E8D5A3] focus:outline-none font-sans text-sm resize-none placeholder-[#7A6535]" 
                      placeholder="Your wishes..."
                    ></textarea>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={VP} custom={4} className="pt-2 text-center">
                  <button 
                    type="submit" 
                    className="px-16 py-4 font-sans text-[0.75rem] tracking-[0.3em] uppercase text-[#1A1410] font-semibold transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C 0%, #E2BE8B 40%, #9B6E39 70%, #C9A84C 100%)"
                    }}
                  >
                    Send RSVP
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-10 md:py-16 pb-8 md:pb-10 border-t border-wedding-gold/20 text-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url("${IMAGES.storyBg}")` }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="max-w-4xl mx-auto px-6 relative z-10"
        >
          {/* Monogram & Date */}
          <motion.div variants={scaleIn} custom={0} className="mb-6 md:mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-[#800020] tracking-widest mb-3">
              A <span className="font-script text-[#D4AF77] text-4xl md:text-5xl">&</span> P
            </h2>
            <p className="font-sans text-sm tracking-[0.2em] text-[#5A3A1A] uppercase font-semibold">24 . 11 . 2026</p>
          </motion.div>

          {/* Gold divider line — shimmers in */}
          <motion.div
            variants={shimmerReveal}
            custom={1}
            className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent mb-6"
          />

          {/* Blessings */}
          <motion.div variants={fadeUp} custom={2} className="font-sans text-sm text-[#4A2C0A] mb-6 md:mb-8 space-y-2">
            <p className="uppercase tracking-widest text-xs text-[#9E7A31] mb-4 font-semibold">With the blessings of</p>
            <p className="font-medium">Mr. Rajesh & Mrs. Sunita Sharma</p>
            <p className="font-medium">Mr. Vikram & Mrs. Meera Verma</p>
          </motion.div>

          {/* Closing lines */}
          <motion.p variants={fadeUp} custom={4} className="font-script text-2xl md:text-3xl text-[#800020]">Dhanyawad</motion.p>
          <motion.p variants={fadeUp} custom={5} className="font-sans text-xs tracking-widest text-[#5A3A1A] mt-4 uppercase font-medium">Looking forward to celebrating with you</motion.p>
        </motion.div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActiveImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage} 
              alt="Expanded gallery image" 
              className="max-w-full max-h-[90vh] object-contain border-2 border-wedding-gold/50 shadow-2xl"
            />
            <button className="absolute top-6 right-6 text-white hover:text-wedding-gold p-2">
              <span className="sr-only">Close</span>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;

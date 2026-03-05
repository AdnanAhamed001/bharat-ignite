import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Startup logos
import alchemystLogo from "@/assets/startups/alchemyst-ai-logo.png";
import alchemystFounder from "@/assets/startups/alchemyst-ai-founder.png";
import nugenomicsLogo from "@/assets/startups/nugenomics-logo.png";
import nugenomicsFounder from "@/assets/startups/nugenomics-founder.png";
import bioreformLogo from "@/assets/startups/bioreform-logo.png";
import bioreformFounder from "@/assets/startups/bioreform-founder.png";
import boinggLogo from "@/assets/startups/boingg-logo.png";
import boinggFounder from "@/assets/startups/boingg-founder.png";
import fitkinLogo from "@/assets/startups/fitkin-logo.png";
import fitkinFounder from "@/assets/startups/fitkin-founder.png";

interface StartupSpot {
  name: string;
  city: string;
  x: number; // percentage
  y: number;
  logo: string;
  founder: string;
  founderName: string;
}

const startups: StartupSpot[] = [
  { name: "Alchemyst AI", city: "Bengaluru", x: 40, y: 74, logo: alchemystLogo, founder: alchemystFounder, founderName: "Founders" },
  { name: "NuGenomics", city: "Bengaluru", x: 42, y: 72, logo: nugenomicsLogo, founder: nugenomicsFounder, founderName: "Founder" },
  { name: "Bioreform", city: "Hyderabad", x: 42, y: 58, logo: bioreformLogo, founder: bioreformFounder, founderName: "Founder" },
  { name: "Boingg", city: "Gurgaon", x: 40, y: 28, logo: boinggLogo, founder: boinggFounder, founderName: "Founder" },
  { name: "FitKin", city: "Delhi", x: 42, y: 25, logo: fitkinLogo, founder: fitkinFounder, founderName: "Founder" },
  { name: "ChocoChi", city: "Kozhikode", x: 36, y: 78, logo: "", founder: "", founderName: "" },
  { name: "DriverShaab", city: "Kolkata", x: 62, y: 42, logo: "", founder: "", founderName: "" },
  { name: "Kamikala", city: "Kalimpong", x: 64, y: 32, logo: "", founder: "", founderName: "" },
  { name: "Crink", city: "Kochi", x: 38, y: 82, logo: "", founder: "", founderName: "" },
  { name: "BeFriends", city: "Vadodara", x: 30, y: 44, logo: "", founder: "", founderName: "" },
  { name: "My Pahadi Dukan", city: "Roorkee", x: 41, y: 22, logo: "", founder: "", founderName: "" },
];

// India map SVG path (detailed outline)
const INDIA_PATH = "M38,5 L40,6 L43,7 L45,8 L48,10 L50,9 L53,10 L56,12 L58,11 L61,13 L64,15 L67,17 L69,20 L70,23 L69,26 L68,29 L67,31 L66,33 L67,36 L66,39 L65,41 L64,44 L62,47 L60,50 L58,53 L56,56 L54,59 L52,62 L50,65 L48,68 L46,72 L44,75 L42,78 L40,82 L39,85 L38,88 L37,85 L36,82 L34,79 L32,76 L30,72 L28,68 L27,64 L26,60 L25,56 L24,52 L23,48 L24,44 L25,40 L26,36 L27,32 L26,28 L27,24 L28,20 L29,16 L30,12 L32,9 L35,7 L38,5Z";

const IndiaMapHero = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [allNodesVisible, setAllNodesVisible] = useState(false);

  // Light up all nodes first, then start spotlight cycle
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllNodesVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!allNodesVisible) return;
    const startTimer = setTimeout(() => {
      setActiveIndex(0);
    }, 1000);
    return () => clearTimeout(startTimer);
  }, [allNodesVisible]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % startups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const activeStartup = activeIndex >= 0 ? startups[activeIndex] : null;

  // Calculate viewBox shift for camera pan effect
  const viewTransform = useMemo(() => {
    if (!activeStartup) return { x: 0, y: 0, scale: 1 };
    // Subtle pan toward active city
    const dx = (activeStartup.x - 45) * 0.15;
    const dy = (activeStartup.y - 50) * 0.12;
    return { x: -dx, y: -dy, scale: 1.05 };
  }, [activeStartup]);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* 3D perspective wrapper */}
      <motion.div
        className="w-full h-full"
        style={{ perspective: "800px" }}
        animate={{
          rotateX: 8,
          rotateY: viewTransform.x * 0.5,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            x: viewTransform.x * 3,
            y: viewTransform.y * 3,
            scale: viewTransform.scale,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* India outline */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.08" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Map fill */}
            <path
              d={INDIA_PATH}
              fill="url(#mapGradient)"
              stroke="hsl(var(--gold))"
              strokeWidth="0.25"
              opacity="0.6"
            />

            {/* Grid lines on map for tech feel */}
            {[20, 30, 40, 50, 60, 70, 80].map((y) => (
              <line key={`h${y}`} x1="20" y1={y} x2="75" y2={y} stroke="hsl(var(--gold))" strokeWidth="0.08" opacity="0.15" />
            ))}
            {[25, 35, 45, 55, 65].map((x) => (
              <line key={`v${x}`} x1={x} y1="5" x2={x} y2="90" stroke="hsl(var(--gold))" strokeWidth="0.08" opacity="0.15" />
            ))}

            {/* Connection lines between nodes */}
            {allNodesVisible && startups.map((s, i) => {
              const next = startups[(i + 1) % startups.length];
              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={s.x} y1={s.y} x2={next.x} y2={next.y}
                  stroke="hsl(var(--gold))"
                  strokeWidth="0.12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* City nodes */}
          {startups.map((startup, i) => (
            <div
              key={startup.name}
              className="absolute"
              style={{
                left: `${startup.x}%`,
                top: `${startup.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Base dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={allNodesVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeIndex === i
                    ? "bg-secondary shadow-[0_0_12px_4px_hsl(var(--secondary)/0.5)]"
                    : "bg-gold/40"
                }`}
              />

              {/* Active pulse rings */}
              {activeIndex === i && (
                <>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-secondary/20"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 rounded-full bg-secondary/15"
                  />
                </>
              )}

              {/* Floating startup card */}
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.85 }}
                    animate={{ opacity: 1, y: -12, scale: 1 }}
                    exit={{ opacity: 0, y: -25, scale: 0.85 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20"
                  >
                    <div className="bg-card/95 backdrop-blur-md border border-secondary/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_20px_hsl(var(--secondary)/0.1)] min-w-[180px]">
                      {/* Card content */}
                      <div className="p-3">
                        <div className="flex items-center gap-2.5 mb-2">
                          {startup.founder ? (
                            <img
                              src={startup.founder}
                              alt={startup.founderName}
                              className="w-9 h-9 rounded-full object-cover border border-secondary/30"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-secondary/30">
                              <span className="text-xs font-heading font-bold text-secondary">
                                {startup.name[0]}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-[11px] font-heading font-bold text-foreground leading-tight">
                              {startup.name}
                            </p>
                            <p className="text-[9px] font-body text-muted-foreground">
                              {startup.city}
                            </p>
                          </div>
                        </div>
                        {startup.logo && (
                          <div className="flex justify-center pt-1 border-t border-border/50">
                            <img
                              src={startup.logo}
                              alt={`${startup.name} logo`}
                              className="h-6 object-contain mt-1.5 opacity-80"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-card/95 border-r border-b border-secondary/20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IndiaMapHero;

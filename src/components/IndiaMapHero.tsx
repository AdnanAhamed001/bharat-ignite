import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import indiaMapSvg from "@/assets/india-map-detailed.svg";

// Startup logos & founders
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
  y: number; // percentage
  logo: string;
  founder: string;
  founderName: string;
}

const startups: StartupSpot[] = [
  { name: "Alchemyst AI", city: "Bengaluru", x: 44, y: 74, logo: alchemystLogo, founder: alchemystFounder, founderName: "Founders" },
  { name: "NuGenomics", city: "Bengaluru", x: 44, y: 74, logo: nugenomicsLogo, founder: nugenomicsFounder, founderName: "Founder" },
  { name: "Bioreform", city: "Hyderabad", x: 46, y: 63, logo: bioreformLogo, founder: bioreformFounder, founderName: "Founder" },
  { name: "Boingg", city: "Gurgaon", x: 43, y: 32, logo: boinggLogo, founder: boinggFounder, founderName: "Founder" },
  { name: "FitKin", city: "Delhi", x: 45, y: 30, logo: fitkinLogo, founder: fitkinFounder, founderName: "Founder" },
  { name: "ChocoChi", city: "Kozhikode", x: 38, y: 82, logo: "", founder: "", founderName: "" },
  { name: "DriverShaab", city: "Kolkata", x: 62, y: 50, logo: "", founder: "", founderName: "" },
  { name: "Kamikala", city: "Kalimpong", x: 64, y: 38, logo: "", founder: "", founderName: "" },
  { name: "Crink", city: "Kochi", x: 39, y: 85, logo: "", founder: "", founderName: "" },
  { name: "BeFriends", city: "Vadodara", x: 33, y: 50, logo: "", founder: "", founderName: "" },
  { name: "My Pahadi Dukan", city: "Roorkee", x: 44, y: 25, logo: "", founder: "", founderName: "" },
];

const CYCLE_DURATION = 3500;

const IndiaMapHero = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [nodesReady, setNodesReady] = useState(false);

  // Show nodes after initial delay
  useEffect(() => {
    const t = setTimeout(() => setNodesReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Start cycling after nodes appear
  useEffect(() => {
    if (!nodesReady) return;
    const t = setTimeout(() => setActiveIndex(0), 600);
    return () => clearTimeout(t);
  }, [nodesReady]);

  // Cycle through startups
  useEffect(() => {
    if (activeIndex < 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % startups.length);
    }, CYCLE_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Compute camera transform to pan toward active startup
  const cameraTransform = useMemo(() => {
    if (activeIndex < 0) return { x: 0, y: 0, scale: 1 };
    const s = startups[activeIndex];
    // Pan toward the active city (offset from center)
    const panX = (50 - s.x) * 0.25;
    const panY = (50 - s.y) * 0.2;
    return { x: panX, y: panY, scale: 1.08 };
  }, [activeIndex]);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-2xl">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />
      </div>

      {/* Camera container - pans and zooms */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          x: `${cameraTransform.x}%`,
          y: `${cameraTransform.y}%`,
          scale: cameraTransform.scale,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {/* India map */}
        <img
          src={indiaMapSvg}
          alt="India map"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{
            filter: "drop-shadow(0 0 20px hsl(42 94% 62% / 0.3))",
            opacity: 0.85,
          }}
        />

        {/* Startup nodes */}
        {startups.map((startup, i) => {
          const isActive = activeIndex === i;
          const hasCard = !!startup.logo && !!startup.founder;

          return (
            <div
              key={startup.name}
              className="absolute"
              style={{
                left: `${startup.x}%`,
                top: `${startup.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 30 : 10,
              }}
            >
              {/* Node dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={nodesReady ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-700 ${
                    isActive
                      ? "bg-secondary shadow-[0_0_20px_8px_hsl(var(--secondary)/0.7)]"
                      : "bg-secondary/40 shadow-[0_0_8px_3px_hsl(var(--secondary)/0.15)]"
                  }`}
                />

                {/* Pulse rings when active */}
                {isActive && (
                  <>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 6, opacity: 0 }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-secondary/25"
                    />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.5 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 rounded-full bg-secondary/15"
                    />
                  </>
                )}
              </motion.div>

              {/* Startup Card */}
              {hasCard && (
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-5 transition-all duration-700 pointer-events-none ${
                    isActive
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-20 scale-[0.85] translate-y-1"
                  }`}
                >
                  <div
                    className={`bg-card/95 backdrop-blur-xl border rounded-xl min-w-[180px] transition-all duration-700 ${
                      isActive
                        ? "border-secondary/40 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_30px_hsl(var(--secondary)/0.2)]"
                        : "border-border/20 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    <div className="p-3.5">
                      <div className="flex items-center gap-3 mb-2.5">
                        <img
                          src={startup.founder}
                          alt={startup.founderName}
                          className={`w-10 h-10 rounded-full object-cover border-2 transition-all duration-700 ${
                            isActive ? "border-secondary/50" : "border-border/30"
                          }`}
                        />
                        <div>
                          <p className="text-xs font-heading font-bold text-foreground leading-tight">
                            {startup.name}
                          </p>
                          <p className="text-[10px] font-body text-muted-foreground">
                            {startup.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center pt-2 border-t border-border/30">
                        <img
                          src={startup.logo}
                          alt={`${startup.name} logo`}
                          className="h-5 object-contain mt-1 opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Arrow pointing down */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-card/95 border-r border-b transition-all duration-700 ${
                      isActive ? "border-secondary/40" : "border-border/20"
                    }`}
                  />
                </div>
              )}

              {/* City label for startups without cards */}
              {!hasCard && (
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: -10 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap pointer-events-none"
                    >
                      <div className="bg-card/90 backdrop-blur-sm border border-secondary/25 rounded-lg px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        <p className="text-[11px] font-heading font-bold text-foreground">
                          {startup.name}
                        </p>
                        <p className="text-[9px] font-body text-muted-foreground">
                          {startup.city}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}

        {/* Subtle connection lines between cities with cards */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          {nodesReady &&
            startups.slice(0, 5).map((s, i) => {
              const next = startups[(i + 1) % 5];
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${s.x}%`}
                  y1={`${s.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke="hsl(42 94% 62% / 0.12)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                />
              );
            })}
        </svg>
      </motion.div>
    </div>
  );
};

export default IndiaMapHero;

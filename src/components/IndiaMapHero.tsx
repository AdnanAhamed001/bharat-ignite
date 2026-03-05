import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import indiaMapSvg from "@/assets/india-map-detailed.svg";

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
  x: number;
  y: number;
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

const CYCLE_MS = 3500;

const IndiaMapHero = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setActiveIndex(0), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (activeIndex < 0) return;
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % startups.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [activeIndex]);

  const active = activeIndex >= 0 ? startups[activeIndex] : null;

  return (
    <div className="relative w-full h-[650px] overflow-hidden rounded-2xl">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-secondary/8 rounded-full blur-[90px]" />
      </div>

      {/* Map image - static, no camera transform for performance */}
      <img
        src={indiaMapSvg}
        alt="India startup ecosystem map"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{ opacity: 0.8 }}
      />

      {/* All city dots - always visible */}
      {startups.map((s, i) => (
        <div
          key={s.name}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 5,
          }}
        >
          <div
            className={`rounded-full transition-all duration-500 ${
              activeIndex === i
                ? "w-3.5 h-3.5 bg-secondary shadow-[0_0_16px_6px_hsl(var(--secondary)/0.6)]"
                : "w-2 h-2 bg-secondary/50"
            }`}
          />
        </div>
      ))}

      {/* Active spotlight: single card shown at a time with AnimatePresence */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={activeIndex}
            className="absolute pointer-events-none"
            style={{
              left: `${active.x}%`,
              top: `${active.y}%`,
              zIndex: 20,
            }}
            initial={{ opacity: 0, y: 10, x: "-50%", translateY: "-100%" }}
            animate={{ opacity: 1, y: -20, x: "-50%", translateY: "-100%" }}
            exit={{ opacity: 0, y: -30, x: "-50%", translateY: "-100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Pulse ring behind card */}
            <motion.div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full w-4 h-4 rounded-full bg-secondary/30"
              animate={{ scale: [1, 5, 5], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />

            {active.logo && active.founder ? (
              /* Full card with founder + logo */
              <div className="bg-card/95 backdrop-blur-md border border-secondary/30 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_24px_hsl(var(--secondary)/0.15)] min-w-[220px]">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={active.founder}
                      alt={active.founderName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-secondary/40 shadow-md"
                    />
                    <div>
                      <p className="text-sm font-heading font-bold text-foreground leading-tight">
                        {active.name}
                      </p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">
                        {active.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center pt-3 border-t border-border/30">
                    <img
                      src={active.logo}
                      alt={`${active.name} logo`}
                      className="h-7 object-contain opacity-90"
                    />
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 bg-card/95 border-r border-b border-secondary/30" />
              </div>
            ) : (
              /* Simple label card */
              <div className="bg-card/90 backdrop-blur-sm border border-secondary/25 rounded-xl px-4 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                <p className="text-sm font-heading font-bold text-foreground">
                  {active.name}
                </p>
                <p className="text-[10px] font-body text-muted-foreground">
                  {active.city}
                </p>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-card/90 border-r border-b border-secondary/25" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndiaMapHero;

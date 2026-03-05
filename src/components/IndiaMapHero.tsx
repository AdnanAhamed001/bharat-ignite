import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
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
import chocochiLogo from "@/assets/startups/chocochi-logo.png";
import chocochiFounder from "@/assets/startups/chocochi-founder.png";
import daanvedaLogo from "@/assets/startups/daanveda-logo.png";
import daanvedaFounder from "@/assets/startups/daanveda-founder.png";
import kamikalaLogo from "@/assets/startups/kamikala-logo.png";
import kamikalaFounder from "@/assets/startups/kamikala-founder.png";
import naarioLogo from "@/assets/startups/naario-logo.png";
import naarioFounder from "@/assets/startups/naario-founder.png";
import crinkLogo from "@/assets/startups/crink-logo.png";
import crinkFounder from "@/assets/startups/crink-founder.png";
import mypahadiLogo from "@/assets/startups/mypahadi-logo.png";
import mypahadiFounder from "@/assets/startups/mypahadi-founder.png";
import extramileLogo from "@/assets/startups/extramile-logo.png";
import extramileFounder from "@/assets/startups/extramile-founder.png";
import freshleafLogo from "@/assets/startups/freshleaf-logo.png";
import freshleafFounder from "@/assets/startups/freshleaf-founder.png";

interface StartupSpot {
  name: string;
  city: string;
  x: number;
  y: number;
  logo: string;
  founder: string;
}

const startups: StartupSpot[] = [
  { name: "Alchemyst AI", city: "Bengaluru", x: 38, y: 73, logo: alchemystLogo, founder: alchemystFounder },
  { name: "NuGenomics", city: "Bengaluru", x: 40, y: 75, logo: nugenomicsLogo, founder: nugenomicsFounder },
  { name: "Bioreform", city: "Hyderabad", x: 42, y: 58, logo: bioreformLogo, founder: bioreformFounder },
  { name: "Boingg", city: "Gurgaon", x: 37, y: 31, logo: boinggLogo, founder: boinggFounder },
  { name: "FitKin", city: "Delhi", x: 35, y: 28, logo: fitkinLogo, founder: fitkinFounder },
  { name: "ChocoChi", city: "Kozhikode", x: 28, y: 82, logo: chocochiLogo, founder: chocochiFounder },
  { name: "DaanVeda", city: "Noida", x: 37, y: 27, logo: daanvedaLogo, founder: daanvedaFounder },
  { name: "Kamikala", city: "Kalimpong", x: 72, y: 33, logo: kamikalaLogo, founder: kamikalaFounder },
  { name: "Crink", city: "Kochi", x: 34, y: 82, logo: crinkLogo, founder: crinkFounder },
  { name: "Naario", city: "Delhi", x: 34, y: 29, logo: naarioLogo, founder: naarioFounder },
  { name: "My Pahadi Dukan", city: "Roorkee", x: 42, y: 21, logo: mypahadiLogo, founder: mypahadiFounder },
  { name: "ExtraMile Play", city: "Mumbai", x: 24, y: 55, logo: extramileLogo, founder: extramileFounder },
  { name: "Freshleaf", city: "Ludhiana", x: 30, y: 20, logo: freshleafLogo, founder: freshleafFounder },
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

  // Card placement: if dot is in bottom half, show card above; otherwise below
  const getCardPosition = (s: StartupSpot) => {
    const isBottom = s.y > 50;
    const isRight = s.x > 55;
    const isLeft = s.x < 38;
    return {
      originY: isBottom ? "bottom" : "top",
      offsetY: isBottom ? -24 : 24,
      translateY: isBottom ? "-100%" : "0%",
      offsetX: isRight ? -10 : isLeft ? 10 : 0,
    };
  };

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-2xl">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-secondary/8 rounded-full blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-primary/5 rounded-full blur-[80px]" />
      </div>

      {/* Map image */}
      <img
        src={indiaMapSvg}
        alt="India startup ecosystem map"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{ opacity: 0.75 }}
      />

      {/* All city dots */}
      {startups.map((s, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={`${s.name}-dot`}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isActive ? 10 : 5,
            }}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 -m-3 rounded-full border-2 border-secondary/40"
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <div
              className={`rounded-full transition-all duration-500 ${
                isActive
                  ? "w-3.5 h-3.5 bg-secondary shadow-[0_0_20px_8px_hsl(var(--secondary)/0.5)]"
                  : "w-2 h-2 bg-secondary/40"
              }`}
            />
          </div>
        );
      })}

      {/* Active card */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={activeIndex}
            className="absolute pointer-events-none"
            style={{
              left: `${active.x}%`,
              top: `${active.y}%`,
              zIndex: 30,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {(() => {
              const pos = getCardPosition(active);
              return (
                <motion.div
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "0%",
                    transform: `translate(calc(-50% + ${pos.offsetX}px), ${pos.translateY})`,
                    marginTop: `${pos.offsetY}px`,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Connecting line */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-secondary/60 to-transparent"
                    style={{
                      height: "20px",
                      ...(pos.originY === "bottom"
                        ? { bottom: "-20px" }
                        : { top: "-20px", transform: "translateX(-50%) rotate(180deg)" }),
                    }}
                  />

                  {/* Card */}
                  <div className="w-[190px] rounded-2xl overflow-hidden bg-card/95 backdrop-blur-xl border border-secondary/20 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_hsl(var(--secondary)/0.1)]">
                    {/* Founder image */}
                    <div className="relative w-full h-[130px] overflow-hidden">
                      <img
                        src={active.founder}
                        alt={`${active.name} founder`}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>

                    {/* Info section */}
                    <div className="px-3 pb-3 -mt-3 relative z-10">
                      <div className="w-full flex justify-center mb-1.5">
                        <div className="h-7 px-2 py-1 bg-background/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <img
                            src={active.logo}
                            alt={`${active.name} logo`}
                            className="h-4 max-w-[90px] object-contain"
                          />
                        </div>
                      </div>

                      <p className="text-xs font-heading font-bold text-foreground text-center leading-tight">
                        {active.name}
                      </p>

                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-secondary" />
                        <p className="text-[10px] font-body text-muted-foreground">
                          {active.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndiaMapHero;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CityNode {
  name: string;
  x: number;
  y: number;
  startups: string[];
}

const cities: CityNode[] = [
  { name: "Bengaluru", x: 38, y: 72, startups: ["Alchemyst AI", "NuGenomics"] },
  { name: "Hyderabad", x: 40, y: 60, startups: ["Bioreform", "SMB Kart"] },
  { name: "Nashik", x: 32, y: 52, startups: ["Carver Farms"] },
  { name: "Pune", x: 33, y: 56, startups: ["Bidweelz"] },
  { name: "Gurgaon", x: 38, y: 28, startups: ["Boingg"] },
  { name: "Delhi", x: 40, y: 26, startups: ["FitKin"] },
  { name: "Kozhikode", x: 34, y: 76, startups: ["ChocoChi"] },
  { name: "Kolkata", x: 60, y: 42, startups: ["DriverShaab"] },
  { name: "Kalimpong", x: 62, y: 32, startups: ["Kamikala"] },
  { name: "Kochi", x: 36, y: 80, startups: ["Crink"] },
  { name: "Vadodara", x: 28, y: 44, startups: ["BeFriends"] },
  { name: "Roorkee", x: 39, y: 22, startups: ["My Pahadi Dukan"] },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [4, 5], [0, 6], [7, 8], [9, 6], [10, 3], [5, 11],
];

const IndiaMapHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);

  useEffect(() => {
    // Sequentially light up nodes
    const intervals: NodeJS.Timeout[] = [];
    cities.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleNodes((prev) => [...prev, i]);
      }, i * 400);
      intervals.push(t);
    });

    return () => intervals.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px]">
      {/* India outline SVG simplified */}
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 opacity-20">
        {/* Simplified India shape */}
        <path
          d="M35,8 L42,8 L48,12 L52,10 L58,14 L62,12 L68,16 L72,20 L70,28 L66,32 L68,38 L64,42 L62,48 L58,52 L54,58 L50,64 L48,70 L44,76 L40,82 L38,86 L36,82 L34,78 L30,74 L28,68 L26,62 L24,56 L22,50 L24,44 L26,38 L28,32 L26,26 L28,20 L30,14 L35,8Z"
          fill="none"
          stroke="hsl(var(--gold))"
          strokeWidth="0.3"
          opacity="0.5"
        />
      </svg>

      {/* Connection lines */}
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
        {connections.map(([from, to], i) => {
          const fromCity = cities[from];
          const toCity = cities[to];
          const isVisible = visibleNodes.includes(from) && visibleNodes.includes(to);
          return (
            <motion.line
              key={i}
              x1={fromCity.x}
              y1={fromCity.y}
              x2={toCity.x}
              y2={toCity.y}
              stroke="hsl(var(--gold))"
              strokeWidth="0.15"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 0.3 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          );
        })}
      </svg>

      {/* City nodes */}
      {cities.map((city, i) => (
        <div
          key={city.name}
          className="absolute"
          style={{
            left: `${city.x}%`,
            top: `${city.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Glowing dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              visibleNodes.includes(i)
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`w-2.5 h-2.5 rounded-full ${
              activeIndex === i ? "bg-secondary" : "bg-gold/60"
            } glow-node transition-colors duration-300`}
          />

          {/* Pulse ring */}
          {activeIndex === i && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-secondary/30"
            />
          )}

          {/* Startup card */}
          <AnimatePresence>
            {activeIndex === i && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-10"
              >
                <div className="bg-card/95 backdrop-blur-sm border border-secondary/30 rounded-lg px-3 py-2 shadow-lg">
                  <p className="text-[10px] font-heading font-bold text-secondary">{city.name}</p>
                  {city.startups.map((s) => (
                    <p key={s} className="text-[9px] font-body text-foreground/80">{s}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default IndiaMapHero;

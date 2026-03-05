import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface StatItem {
  value: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "85", suffix: "+", label: "Allies" },
  { value: "65", suffix: "", label: "Startups Incubated" },
  { value: "700", suffix: "+ Cr", label: "Combined Valuation" },
  { value: "4500", suffix: "+", label: "Applications" },
  { value: "190", suffix: "+", label: "Cities Reached" },
  { value: "25000", suffix: "+", label: "Professionals in TSV Network" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="font-heading font-extrabold text-3xl lg:text-4xl text-secondary">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const MilestonesSection = () => {
  return (
    <section className="bg-primary text-primary-foreground section-padding">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading font-bold text-2xl lg:text-3xl mb-12"
        >
          OUR <span className="text-secondary">MILESTONES</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Counter target={parseInt(stat.value)} suffix={stat.suffix} />
              <p className="mt-2 text-xs lg:text-sm font-body opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;

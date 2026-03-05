import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="gradient-hero section-padding">
      <div className="container-wide text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-primary-foreground mb-4">
            If you are a startup looking to scale, we will be happy to help.
          </h2>
          <a
            href="https://www.f6s.com/the-stepup-ventures/connect"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity glow-gold"
          >
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;

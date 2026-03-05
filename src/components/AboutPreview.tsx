import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image placeholder with badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-primary/5 overflow-hidden flex items-center justify-center border border-border">
              <div className="text-center p-8">
                <div className="inline-block px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-lg mb-4">
                  $5 Trillion Economy
                </div>
                <p className="text-muted-foreground font-body text-sm">Contributing to India's growth story</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider mb-2">About Us</p>
            <h2 className="font-heading font-bold text-2xl lg:text-4xl text-foreground mb-2">
              THE STEPUP VENTURES
            </h2>
            <p className="text-secondary font-heading font-semibold text-lg mb-6">
              CONNECT BHARAT WITH THE REST OF THE WORLD
            </p>

            <div className="space-y-4 font-body text-muted-foreground text-sm leading-relaxed">
              <p>
                The StepUp Ventures plans to connect Bharat with the rest of the world. It endeavours to ignite the entrepreneurial spirit in the youth of Bharat, thus contributing in creation of the 5 Trillion Dollar economy.
              </p>
              <p>
                The StepUp Ventures aims to empower the youth of Bharat to realise its aspirations and help make their dreams a reality through startups that positively impact society.
              </p>
              <p>
                The StepUp Ventures will work with startups that are at the MVP/Early Revenue stage and help them scale through a structured three-month program.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center mt-6 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;

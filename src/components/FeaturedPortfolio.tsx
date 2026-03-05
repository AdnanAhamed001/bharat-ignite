import { motion } from "framer-motion";

const portfolioHighlights = [
  {
    name: "FitKin",
    desc: "Women-led activewear brand offering stylish, high-performance, size-inclusive apparel.",
  },
  {
    name: "Crink",
    desc: "AI-powered mental wellness app for stress management & parenting guidance.",
  },
  {
    name: "NuGenomics",
    desc: "DNA analysis platform combining genetics + lifestyle data for health optimization.",
  },
  {
    name: "ChocoChi",
    desc: "Premium affordable vitamin-infused teas sold online & in 40+ cities.",
  },
];

const FeaturedPortfolio = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
            FEATURED <span className="text-secondary">PORTFOLIO</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioHighlights.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <span className="font-heading font-bold text-secondary text-lg">
                  {item.name[0]}
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-foreground mb-2">{item.name}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;

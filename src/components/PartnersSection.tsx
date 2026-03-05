import { motion } from "framer-motion";

const ecosystemPartners = [
  "Artha Venture Fund", "Ennovent", "Anchor Capital", "Pentathlon Ventures",
  "Callapina Capital", "LetsVenture", "India Accelerator", "Tremis Capital",
  "JAFCO Asia", "Digital Futurists", "Rehbar", "100X.VC",
  "Venture Catalysts", "Mount Judi Ventures", "Chandigarh Angels", "Tomorrow Capital",
  "Indian Angel Network", "Aditya Birla Ventures", "Lead Angels", "RealTime Angels",
  "Fluid Ventures", "Piper Serica", "StartupXseed", "Bharat Founders Fund",
  "Recur Club", "Peak XV Partners", "Anthill Ventures", "3one4 Capital",
];

const servicePartners = [
  "AWS", "DigitalOcean", "Freshworks", "IBM Cloud",
  "Monday.com", "Notion", "Twilio", "Google Cloud",
  "Builder.ai", "Paytm", "F6S", "Miro",
];

const PartnersSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        {/* Ecosystem Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-center font-heading font-bold text-2xl lg:text-3xl text-foreground mb-3">
            ECOSYSTEM <span className="text-secondary">PARTNERS</span>
          </h2>
          <p className="text-center text-muted-foreground font-body text-sm mb-10 max-w-xl mx-auto">
            Backed by India's leading venture capital firms, angel networks, and institutional investors.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {ecosystemPartners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="bg-card border border-border rounded-lg p-3 flex items-center justify-center min-h-[60px]"
              >
                <span className="text-[10px] font-heading font-semibold text-center text-muted-foreground leading-tight">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center font-heading font-bold text-xl text-foreground mb-8">
            SERVICE <span className="text-secondary">PARTNERS</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {servicePartners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg px-5 py-3"
              >
                <span className="text-xs font-heading font-semibold text-muted-foreground">{partner}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;

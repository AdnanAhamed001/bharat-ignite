import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import IndiaMapHero from "@/components/IndiaMapHero";
import FeaturedPortfolio from "@/components/FeaturedPortfolio";
import MilestonesSection from "@/components/MilestonesSection";
import AboutPreview from "@/components/AboutPreview";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import CTABanner from "@/components/CTABanner";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden min-h-[90vh] flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="container-wide relative z-10 px-4 lg:px-8 py-16 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4"
              >
                Pan India Startup Ecosystem
              </motion.p>

              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary-foreground leading-tight mb-4">
                Accelerating{" "}
                <span className="text-gradient-gold">Bharat's</span>{" "}
                Founders
              </h1>

              <p className="font-body text-primary-foreground/80 text-base lg:text-lg leading-relaxed mb-4 max-w-lg">
                Pan India focus on entrepreneurs from real Bharat — emphasis on underrepresented & underprivileged communities.
              </p>

              {/* Stats highlights */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { val: "4500+", label: "Applications from 190+ Cities" },
                  { val: "65", label: "Startups | INR 700+ Cr Valuation" },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="font-heading font-bold text-2xl text-secondary">{s.val}</span>
                    <p className="text-primary-foreground/60 font-body text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <p className="font-body text-primary-foreground/70 text-sm mb-6">
                Tailored 3-month program to help startups become Investor Ready
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/program"
                  className="inline-flex items-center px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-sm hover:opacity-90 transition-all glow-gold"
                >
                  For Founders — Explore the Program
                </Link>
                <Link
                  to="/investor-hub"
                  className="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-heading font-semibold text-sm hover:border-secondary hover:text-secondary transition-all"
                >
                  For Investors — Investor Hub
                </Link>
              </div>
            </motion.div>

            {/* Right - India Map Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block"
            >
              <IndiaMapHero />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Cards */}
      <section className="section-padding bg-background -mt-8 relative z-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6 -mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8 shadow-lg card-hover"
            >
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">For Founders</h3>
              <p className="font-body text-muted-foreground text-sm mb-4">
                If you are a startup looking to scale, we will be happy to help.
              </p>
              <Link
                to="/program"
                className="inline-flex px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-heading font-semibold text-sm hover:opacity-90"
              >
                Explore the Program
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-lg card-hover"
            >
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">For Investors</h3>
              <p className="font-body text-muted-foreground text-sm mb-4">
                Partner with us to back category-defining companies for Bharat and beyond.
              </p>
              <Link
                to="/investor-hub"
                className="inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-sm hover:opacity-90"
              >
                Enter Investor Hub
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedPortfolio />
      <MilestonesSection />
      <AboutPreview />
      <TeamSection />
      <PartnersSection />
      <CTABanner />
    </Layout>
  );
};

export default Index;

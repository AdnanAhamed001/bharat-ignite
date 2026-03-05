import Layout from "@/components/Layout";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  subtitle?: string;
}

export const PageHero = ({ title, breadcrumb, subtitle }: PageHeroProps) => (
  <section className="gradient-hero py-16 lg:py-24">
    <div className="container-wide px-4 lg:px-8">
      <p className="font-body text-primary-foreground/60 text-sm mb-2">{breadcrumb}</p>
      <h1 className="font-heading font-black text-3xl lg:text-5xl text-primary-foreground">{title}</h1>
      {subtitle && (
        <p className="font-body text-primary-foreground/80 text-lg mt-3 max-w-2xl">{subtitle}</p>
      )}
    </div>
  </section>
);

const PlaceholderPage = ({ title, breadcrumb }: { title: string; breadcrumb: string }) => (
  <Layout>
    <PageHero title={title} breadcrumb={breadcrumb} />
    <section className="section-padding bg-background">
      <div className="container-wide text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="font-heading font-bold text-xl text-foreground mb-3">Coming Soon</h2>
          <p className="font-body text-muted-foreground text-sm">This page is under development.</p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export const ProgramPage = () => <PlaceholderPage title="PROGRAM" breadcrumb="Home > Program" />;
export const InvestorHubPage = () => <PlaceholderPage title="INVESTOR HUB" breadcrumb="Home > Investor Hub" />;
export const PortfolioPage = () => <PlaceholderPage title="PORTFOLIO" breadcrumb="Home > Portfolio" />;
export const ResourcesPage = () => <PlaceholderPage title="RESOURCES & LIBRARY" breadcrumb="Home > Resources" />;
export const AboutPage = () => <PlaceholderPage title="ABOUT US" breadcrumb="Home > About Us" />;
export const PeoplePage = () => <PlaceholderPage title="PEOPLE" breadcrumb="Home > People" />;
export const BlogPage = () => <PlaceholderPage title="BLOG" breadcrumb="Home > Blog" />;
export const ContactPage = () => <PlaceholderPage title="CONTACT US" breadcrumb="Home > Contact Us" />;
export const FAQPage = () => <PlaceholderPage title="FAQ" breadcrumb="Home > FAQ" />;
export const DisclaimerPage = () => <PlaceholderPage title="DISCLAIMER" breadcrumb="Home > Disclaimer" />;
export const PrivacyPolicyPage = () => <PlaceholderPage title="PRIVACY POLICY" breadcrumb="Home > Privacy Policy" />;

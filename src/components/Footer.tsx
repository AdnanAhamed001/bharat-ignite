import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <img src={logo} alt="StepUp Ventures" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-sm opacity-80 leading-relaxed font-body">
              The StepUp Ventures plans to connect Bharat with the rest of the world. It endeavours to ignite the entrepreneurial spirit in the youth of Bharat, thus contributing in creation of the 5 Trillion Dollar economy.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-secondary">Our Pages</h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: "Apply", path: "https://www.f6s.com/the-stepup-ventures/connect", external: true },
                { label: "About Us", path: "/about" },
                { label: "People", path: "/people" },
                { label: "Program", path: "/program" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) =>
                item.external ? (
                  <li key={item.label}>
                    <a href={item.path} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link to={item.path} className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Disclaimer", path: "/disclaimer" },
                { label: "Privacy Policy", path: "/privacy-policy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-secondary">Get the Latest from TSV</h4>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-3 py-2 rounded-lg bg-teal-light/20 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/50 font-body focus:outline-none focus:border-secondary"
              />
              <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Linkedin, url: "https://www.linkedin.com/company/the-step-up-ventures/" },
                { icon: Instagram, url: "https://www.instagram.com/thestepupventures/" },
                { icon: Facebook, url: "https://www.facebook.com/p/The-StepUp-Ventures-100063871641779/" },
                { icon: Twitter, url: "https://twitter.com/step_ventures" },
              ].map(({ icon: Icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60 font-body">
          <p>© 2022 THE STEPUP VENTURE All rights reserved.</p>
          <Link to="/disclaimer" className="hover:text-secondary transition-colors">Legal</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

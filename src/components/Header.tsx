import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Program", path: "/program" },
  { label: "Investor Hub", path: "/investor-hub" },
  { label: "Portfolio", path: "/portfolio" },
  {
    label: "Resources",
    path: "/resources",
    dropdown: [
      { label: "All Resources", path: "/resources" },
      { label: "Tools", path: "/resources/tools" },
      { label: "Assessments", path: "/resources/assessments" },
    ],
  },
  { label: "About Us", path: "/about" },
  { label: "People", path: "/people" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between h-16 lg:h-20 px-4 lg:px-8">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="StepUp Ventures" className="h-10 lg:h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium font-heading transition-colors rounded-md hover:text-secondary ${
                    location.pathname.startsWith(link.path)
                      ? "text-secondary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </Link>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px]"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-sm font-body text-foreground hover:bg-muted hover:text-secondary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium font-heading transition-colors rounded-md hover:text-secondary ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.f6s.com/the-stepup-ventures/connect"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground font-heading font-semibold text-sm transition-all hover:opacity-90 glow-gold"
          >
            APPLY
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-heading font-medium rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? "bg-muted text-secondary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.f6s.com/the-stepup-ventures/connect"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-center rounded-full bg-secondary text-secondary-foreground font-heading font-semibold text-sm mt-3"
              >
                APPLY
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

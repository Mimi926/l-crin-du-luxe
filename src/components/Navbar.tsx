import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome ? "bg-noir/80 backdrop-blur-md" : "bg-noir shadow-elevated"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-wider text-cream">
            Ravaka
          </span>
          <span className="text-gold text-xs font-body uppercase tracking-[0.3em]">
            Madagascar
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-cream/80 hover:text-gold transition-colors text-sm font-body tracking-wide"
          >
            Accueil
          </Link>
          <Link
            to="/salons"
            className="text-cream/80 hover:text-gold transition-colors text-sm font-body tracking-wide"
          >
            Salons
          </Link>
          <Link
            to="/salons"
            className="text-cream/80 hover:text-gold transition-colors text-sm font-body tracking-wide"
          >
            Services
          </Link>
          <Button variant="gold" size="sm">
            Réserver
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cream"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-noir border-t border-noir-light"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-cream/80 hover:text-gold transition-colors text-sm font-body tracking-wide py-2"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/salons"
              className="text-cream/80 hover:text-gold transition-colors text-sm font-body tracking-wide py-2"
              onClick={() => setIsOpen(false)}
            >
              Salons
            </Link>
            <Button variant="gold" size="sm" className="w-full">
              Réserver
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

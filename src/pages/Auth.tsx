import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth - redirect to client dashboard
    navigate("/client");
  };

  return (
    <div className="min-h-screen bg-noir flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-cream font-semibold mb-2">
              {isLogin ? "Bon retour" : "Créer un compte"}
            </h1>
            <p className="text-cream/60 text-sm font-body">
              {isLogin ? "Connectez-vous à votre espace Ravaka" : "Rejoignez la communauté Ravaka"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
                <input
                  type="text"
                  placeholder="Nom complet"
                  required
                  className="w-full bg-noir-light border border-cream/10 rounded-sm px-4 py-3 pl-11 text-cream placeholder:text-cream/30 font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full bg-noir-light border border-cream/10 rounded-sm px-4 py-3 pl-11 text-cream placeholder:text-cream/30 font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                required
                className="w-full bg-noir-light border border-cream/10 rounded-sm px-4 py-3 pl-11 pr-11 text-cream placeholder:text-cream/30 font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream/60"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button variant="gold" type="submit" className="w-full">
              {isLogin ? "Se connecter" : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cream/50 text-sm font-body hover:text-gold transition-colors"
            >
              {isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
            </button>
          </div>

          {/* Salon partner link */}
          <div className="mt-10 pt-6 border-t border-cream/10 text-center">
            <p className="text-cream/40 text-xs font-body mb-2">Vous êtes un salon partenaire ?</p>
            <Link to="/salon-dashboard" className="text-gold text-sm font-body hover:underline">
              Accéder au dashboard salon →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;

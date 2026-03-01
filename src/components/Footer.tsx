import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-noir text-cream/70">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl text-cream font-semibold tracking-wider mb-2">
              Ravaka
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
              Madagascar
            </p>
            <p className="text-sm leading-relaxed">
              La plateforme premium des salons de beauté haut de gamme à Madagascar.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg text-cream mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-gold transition-colors">Accueil</Link>
              <Link to="/salons" className="text-sm hover:text-gold transition-colors">Salons</Link>
              <Link to="/salons" className="text-sm hover:text-gold transition-colors">Services</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-cream mb-4">Partenaires</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm">Devenir partenaire</span>
              <span className="text-sm">Dashboard salon</span>
              <span className="text-sm">Conditions</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-cream mb-4">Contact</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm">Antananarivo, Madagascar</span>
              <span className="text-sm">contact@ravaka.mg</span>
              <span className="text-sm">+261 34 00 000 00</span>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2026 Ravaka Madagascar. Tous droits réservés.</p>
          <p className="text-xs text-gold">L'excellence de la beauté malgache</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

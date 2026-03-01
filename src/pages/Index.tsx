import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { salons, serviceCategories } from "@/data/salons";
import SalonCard from "@/components/SalonCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-salon.jpg";

const Index = () => {
  const popularServices = [
    { name: "Coiffure", icon: "✂️" },
    { name: "Massage", icon: "💆" },
    { name: "Ongles", icon: "💅" },
    { name: "Maquillage", icon: "💄" },
    { name: "Soins visage", icon: "🌸" },
    { name: "Esthétique", icon: "✨" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Salon premium Madagascar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-6 font-body">
              Plateforme exclusive Madagascar
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream mb-6 leading-tight">
              L'excellence de la
              <br />
              <span className="font-semibold italic">beauté</span>
            </h1>
            <p className="text-cream/70 text-base md:text-lg max-w-xl mx-auto mb-10 font-body font-light leading-relaxed">
              Découvrez les salons premium d'Antananarivo. Réservez en ligne, vivez une expérience unique.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-cream/95 backdrop-blur-sm rounded-sm p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un salon ou service..."
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-3 outline-none font-body"
                />
              </div>
              <div className="flex items-center gap-2 px-4 border-t md:border-t-0 md:border-l border-border">
                <MapPin size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Localisation"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-3 outline-none font-body"
                />
              </div>
              <Link to="/salons">
                <Button variant="gold" className="w-full md:w-auto whitespace-nowrap">
                  Rechercher
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
        </motion.div>
      </section>

      {/* Featured Salons */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-body">
              Sélection premium
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Salons <span className="italic font-semibold">recommandés</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon, i) => (
              <SalonCard key={salon.id} salon={salon} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/salons">
              <Button variant="outline" size="lg" className="font-body tracking-wide">
                Voir tous les salons
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-24 bg-noir">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-body">
              Nos expertises
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream">
              Services <span className="italic font-semibold">populaires</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularServices.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group text-center"
              >
                <div className="bg-noir-light rounded-sm p-8 mb-3 transition-all duration-300 group-hover:bg-gold/10 group-hover:shadow-luxury">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <span className="text-cream/80 text-sm font-body tracking-wide group-hover:text-gold transition-colors">
                  {service.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-body">
              Professionnels
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Rejoignez <span className="italic font-semibold">Ravaka</span>
            </h2>
            <p className="text-muted-foreground mb-10 font-body leading-relaxed">
              Vous êtes un salon premium à Madagascar ? Rejoignez notre plateforme exclusive 
              et donnez de la visibilité à votre établissement auprès d'une clientèle exigeante.
            </p>
            <Button variant="gold" size="lg" className="font-body tracking-wider">
              Devenir partenaire
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

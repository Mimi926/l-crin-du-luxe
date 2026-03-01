import { useState, useMemo } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { salons, serviceCategories, locations } from "@/data/salons";
import SalonCard from "@/components/SalonCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Salons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      const matchesSearch =
        !searchQuery ||
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        !selectedLocation || salon.location === selectedLocation;
      const matchesService =
        !selectedService ||
        salon.services.some((s) => s.category === selectedService);
      return matchesSearch && matchesLocation && matchesService;
    });
  }, [searchQuery, selectedLocation, selectedService]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 bg-noir">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-body">
              Découvrir
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-light text-cream mb-8">
              Nos <span className="italic font-semibold">Salons</span>
            </h1>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-cream/95 backdrop-blur-sm rounded-sm p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un salon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-3 outline-none font-body"
                />
              </div>
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                Filtres
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-3">Localisation</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedLocation("")}
                      className={`block w-full text-left text-sm py-1.5 px-3 rounded-sm transition-colors font-body ${
                        !selectedLocation ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Toutes
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`block w-full text-left text-sm py-1.5 px-3 rounded-sm transition-colors font-body ${
                          selectedLocation === loc ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold mb-3">Services</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedService("")}
                      className={`block w-full text-left text-sm py-1.5 px-3 rounded-sm transition-colors font-body ${
                        !selectedService ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Tous
                    </button>
                    {serviceCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedService(cat)}
                        className={`block w-full text-left text-sm py-1.5 px-3 rounded-sm transition-colors font-body ${
                          selectedService === cat ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Salon Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground font-body">
                  {filteredSalons.length} salon{filteredSalons.length !== 1 ? "s" : ""} trouvé{filteredSalons.length !== 1 ? "s" : ""}
                </p>
              </div>
              {filteredSalons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredSalons.map((salon, i) => (
                    <SalonCard key={salon.id} salon={salon} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground font-body">
                    Aucun salon ne correspond à vos critères.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Salons;

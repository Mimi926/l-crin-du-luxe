import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Phone, ArrowLeft } from "lucide-react";
import { salons } from "@/data/salons";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import type { Service } from "@/data/salons";

const SalonDetail = () => {
  const { id } = useParams();
  const salon = salons.find((s) => s.id === id);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<Service | undefined>();

  const openBooking = (service?: Service) => {
    setBookingService(service);
    setBookingOpen(true);
  };

  if (!salon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Salon introuvable</h1>
          <Link to="/salons"><Button variant="gold">Retour aux salons</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Gallery */}
      <section className="pt-20">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <motion.img key={selectedPhoto} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} src={salon.photos[selectedPhoto]} alt={salon.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-noir/40" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container mx-auto">
              <div className="flex gap-2">
                {salon.photos.map((photo, i) => (
                  <button key={i} onClick={() => setSelectedPhoto(i)} className={`w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border-2 transition-all ${i === selectedPhoto ? "border-gold" : "border-cream/30"}`}>
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Link to="/salons" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-body mb-8">
            <ArrowLeft size={16} /> Retour aux salons
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(salon.rating) ? "fill-gold text-gold" : "text-muted-foreground"} />
                  ))}
                  <span className="text-sm text-muted-foreground font-body ml-1">{salon.rating} ({salon.reviewCount} avis)</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">{salon.name}</h1>
                <p className="text-muted-foreground font-body leading-relaxed">{salon.description}</p>
              </motion.div>

              {/* Services */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-display text-2xl font-semibold mb-6 gold-underline pb-2">Services & Tarifs</h2>
                <div className="space-y-3">
                  {salon.services.map((service) => (
                    <div key={service.id} className="bg-card rounded-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-card hover:shadow-elevated transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-display text-lg font-semibold">{service.name}</h3>
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm font-body">{service.category}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-body">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-4 md:text-right">
                        <div>
                          <p className="font-display text-xl font-semibold text-gold">{service.price.toLocaleString()} Ar</p>
                          <p className="text-xs text-muted-foreground font-body">{service.duration} min</p>
                        </div>
                        <Button variant="gold" size="sm" onClick={() => openBooking(service)}>Réserver</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Reviews */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="font-display text-2xl font-semibold mb-6 gold-underline pb-2">Avis Clients</h2>
                <div className="space-y-4">
                  {salon.reviews.map((review) => (
                    <div key={review.id} className="bg-card rounded-sm p-5 shadow-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                            <span className="text-sm font-display font-semibold text-gold">{review.author[0]}</span>
                          </div>
                          <span className="font-body font-medium text-sm">{review.author}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? "fill-gold text-gold" : "text-muted-foreground"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-body">{review.comment}</p>
                      <p className="text-xs text-muted-foreground/60 mt-2 font-body">{review.date}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-sm p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold mb-4">Informations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-body">
                      <MapPin size={16} className="text-gold shrink-0" />
                      <span className="text-muted-foreground">{salon.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body">
                      <Clock size={16} className="text-gold shrink-0" />
                      <span className="text-muted-foreground">{salon.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body">
                      <Phone size={16} className="text-gold shrink-0" />
                      <span className="text-muted-foreground">{salon.phone}</span>
                    </div>
                  </div>
                </div>
                <Button variant="gold" size="lg" className="w-full font-body tracking-wider" onClick={() => openBooking()}>
                  Réserver maintenant
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        services={salon.services}
        employees={salon.employees}
        salonName={salon.name}
        initialService={bookingService}
      />
    </div>
  );
};

export default SalonDetail;

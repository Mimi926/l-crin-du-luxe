import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Star, Heart, Bell, LogOut, User, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockBookings } from "@/data/salons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusColors: Record<string, string> = {
  confirmed: "bg-gold/10 text-gold",
  pending: "bg-secondary text-secondary-foreground",
  completed: "bg-accent/20 text-accent-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmé",
  pending: "En attente",
  completed: "Terminé",
  cancelled: "Annulé",
};

type Tab = "reservations" | "profile" | "loyalty";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("reservations");

  const tabs = [
    { id: "reservations" as Tab, label: "Mes réservations", icon: Calendar },
    { id: "profile" as Tab, label: "Mon profil", icon: User },
    { id: "loyalty" as Tab, label: "Fidélité", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-2">Espace client</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">Bonjour, Nirina 👋</h1>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-body transition-all ${
                      activeTab === tab.id
                        ? "bg-card shadow-card text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <tab.icon size={16} className={activeTab === tab.id ? "text-gold" : ""} />
                    {tab.label}
                  </button>
                ))}
                <Link
                  to="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-body text-muted-foreground hover:text-foreground transition-all"
                >
                  <LogOut size={16} />
                  Déconnexion
                </Link>
              </nav>
            </aside>

            {/* Content */}
            <main className="flex-1">
              {activeTab === "reservations" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-display text-2xl font-semibold mb-6">Mes réservations</h2>
                  <div className="space-y-3">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-card rounded-sm p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-display text-lg font-semibold">{booking.salonName}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-sm font-body ${statusColors[booking.status]}`}>
                              {statusLabels[booking.status]}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body">{booking.serviceName} — {booking.employeeName}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-body">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {booking.time}</span>
                            <span className="flex items-center gap-1"><CreditCard size={12} /> {booking.price.toLocaleString()} Ar</span>
                          </div>
                        </div>
                        {booking.status === "confirmed" && (
                          <Button variant="outline" size="sm" className="font-body text-xs">
                            Annuler
                          </Button>
                        )}
                        {booking.status === "completed" && (
                          <Button variant="outline" size="sm" className="font-body text-xs">
                            <Star size={12} /> Laisser un avis
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-display text-2xl font-semibold mb-6">Mon profil</h2>
                  <div className="bg-card rounded-sm p-6 shadow-card max-w-lg space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground font-body block mb-1">Nom</label>
                      <input
                        type="text"
                        defaultValue="Nirina Rakoto"
                        className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-body block mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue="nirina@example.com"
                        className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-body block mb-1">Téléphone</label>
                      <input
                        type="tel"
                        defaultValue="+261 34 00 000 00"
                        className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <Button variant="gold" className="font-body">Sauvegarder</Button>
                  </div>
                </motion.div>
              )}

              {activeTab === "loyalty" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-display text-2xl font-semibold mb-6">Programme fidélité</h2>
                  <div className="bg-noir rounded-sm p-8 shadow-elevated text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/20 mb-4">
                      <Heart size={32} className="text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-cream font-semibold mb-2">350 points</h3>
                    <p className="text-cream/60 text-sm font-body mb-4">
                      Niveau Gold — Plus que 150 points pour le niveau Platine
                    </p>
                    <div className="w-full bg-noir-light rounded-full h-2 mb-6">
                      <div className="bg-gold h-2 rounded-full" style={{ width: "70%" }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-gold font-display text-xl font-semibold">7</p>
                        <p className="text-cream/50 text-xs font-body">Réservations</p>
                      </div>
                      <div>
                        <p className="text-gold font-display text-xl font-semibold">3</p>
                        <p className="text-cream/50 text-xs font-body">Salons visités</p>
                      </div>
                      <div>
                        <p className="text-gold font-display text-xl font-semibold">5</p>
                        <p className="text-cream/50 text-xs font-body">Avis laissés</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientDashboard;

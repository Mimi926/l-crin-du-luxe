import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Calendar, Scissors, Users, Package, BarChart3,
  Settings, Plus, Edit, Trash2, Check, X, Clock, TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { salons } from "@/data/salons";

type Tab = "overview" | "reservations" | "services" | "employees" | "products" | "analytics" | "settings";

const salonData = salons[0]; // Mock: using first salon

const mockSalonBookings = [
  { id: "sb1", client: "Nirina R.", service: "Coupe & Brushing", employee: "Nomena H.", date: "2026-03-05", time: "10:00", status: "confirmed" },
  { id: "sb2", client: "Fanja M.", service: "Coloration Premium", employee: "Rivo A.", date: "2026-03-05", time: "11:00", status: "pending" },
  { id: "sb3", client: "Sandra T.", service: "Soin Kératine", employee: "Lova T.", date: "2026-03-05", time: "14:00", status: "confirmed" },
  { id: "sb4", client: "Haja V.", service: "Balayage", employee: "Rivo A.", date: "2026-03-06", time: "09:30", status: "confirmed" },
];

const SalonDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs = [
    { id: "overview" as Tab, label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "reservations" as Tab, label: "Réservations", icon: Calendar },
    { id: "services" as Tab, label: "Services", icon: Scissors },
    { id: "employees" as Tab, label: "Employés", icon: Users },
    { id: "products" as Tab, label: "Produits", icon: Package },
    { id: "analytics" as Tab, label: "Statistiques", icon: BarChart3 },
    { id: "settings" as Tab, label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-noir min-h-screen p-6">
        <Link to="/" className="mb-10">
          <span className="font-display text-xl text-cream font-semibold tracking-wider">Ravaka</span>
          <span className="text-gold text-[10px] font-body uppercase tracking-[0.2em] ml-2">Salon</span>
        </Link>
        <nav className="space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-body transition-all ${
                activeTab === tab.id
                  ? "bg-noir-light text-cream"
                  : "text-cream/50 hover:text-cream hover:bg-noir-light/50"
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? "text-gold" : ""} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="pt-4 border-t border-cream/10">
          <p className="text-cream/50 text-xs font-body">{salonData.name}</p>
          <Link to="/" className="text-gold text-xs font-body hover:underline mt-1 block">
            Retour au site →
          </Link>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-noir px-4 py-3 flex items-center justify-between">
        <span className="font-display text-lg text-cream">Ravaka <span className="text-gold text-xs">Salon</span></span>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as Tab)}
          className="bg-noir-light text-cream text-sm font-body rounded-sm px-3 py-1.5 border border-cream/10"
        >
          {tabs.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 pt-16 lg:pt-10 overflow-auto">
        {/* Overview */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Vue d'ensemble</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Réservations aujourd'hui", value: "8", icon: Calendar, change: "+12%" },
                { label: "Revenus du mois", value: "2.4M Ar", icon: TrendingUp, change: "+8%" },
                { label: "Taux d'occupation", value: "78%", icon: Clock, change: "+5%" },
                { label: "Note moyenne", value: "4.9", icon: BarChart3, change: "+0.1" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-sm p-5 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon size={18} className="text-gold" />
                    <span className="text-xs text-gold font-body">{stat.change}</span>
                  </div>
                  <p className="font-display text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Today's bookings */}
            <h2 className="font-display text-xl font-semibold mb-4">Réservations du jour</h2>
            <div className="space-y-2">
              {mockSalonBookings.slice(0, 3).map((b) => (
                <div key={b.id} className="bg-card rounded-sm p-4 shadow-card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <span className="text-sm font-display font-semibold text-gold">{b.client[0]}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium">{b.client}</p>
                      <p className="text-xs text-muted-foreground font-body">{b.service} — {b.employee}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body">{b.time}</p>
                    <span className={`text-xs font-body ${b.status === "confirmed" ? "text-gold" : "text-muted-foreground"}`}>
                      {b.status === "confirmed" ? "Confirmé" : "En attente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reservations */}
        {activeTab === "reservations" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-display text-3xl font-semibold">Réservations</h1>
            </div>
            <div className="bg-card rounded-sm shadow-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium">Client</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium hidden md:table-cell">Service</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium hidden md:table-cell">Employé</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium">Date</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium">Statut</th>
                    <th className="text-right p-4 text-xs text-muted-foreground font-body font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalonBookings.map((b) => (
                    <tr key={b.id} className="border-b border-border/50 last:border-0">
                      <td className="p-4 text-sm font-body">{b.client}</td>
                      <td className="p-4 text-sm font-body text-muted-foreground hidden md:table-cell">{b.service}</td>
                      <td className="p-4 text-sm font-body text-muted-foreground hidden md:table-cell">{b.employee}</td>
                      <td className="p-4 text-sm font-body">{b.date} {b.time}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-0.5 rounded-sm font-body ${
                          b.status === "confirmed" ? "bg-gold/10 text-gold" : "bg-secondary text-secondary-foreground"
                        }`}>
                          {b.status === "confirmed" ? "Confirmé" : "En attente"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button className="p-1.5 rounded-sm hover:bg-accent transition-colors">
                            <Check size={14} className="text-gold" />
                          </button>
                          <button className="p-1.5 rounded-sm hover:bg-accent transition-colors">
                            <X size={14} className="text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Services */}
        {activeTab === "services" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-display text-3xl font-semibold">Services</h1>
              <Button variant="gold" size="sm"><Plus size={14} /> Ajouter</Button>
            </div>
            <div className="space-y-3">
              {salonData.services.map((service) => (
                <div key={service.id} className="bg-card rounded-sm p-5 shadow-card flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground font-body">{service.category} — {service.duration} min</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-display text-lg font-semibold text-gold">{service.price.toLocaleString()} Ar</p>
                    <div className="flex gap-1">
                      <button className="p-2 rounded-sm hover:bg-accent"><Edit size={14} /></button>
                      <button className="p-2 rounded-sm hover:bg-accent"><Trash2 size={14} className="text-destructive" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Employees */}
        {activeTab === "employees" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-display text-3xl font-semibold">Employés</h1>
              <Button variant="gold" size="sm"><Plus size={14} /> Ajouter</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {salonData.employees.map((emp) => (
                <div key={emp.id} className="bg-card rounded-sm p-6 shadow-card text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-xl font-semibold text-gold">{emp.avatar}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{emp.name}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-4">{emp.role}</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" className="text-xs font-body">Planning</Button>
                    <Button variant="outline" size="sm" className="text-xs font-body">Modifier</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products */}
        {activeTab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-display text-3xl font-semibold">Produits</h1>
              <Button variant="gold" size="sm"><Plus size={14} /> Ajouter</Button>
            </div>
            <div className="bg-card rounded-sm p-12 shadow-card text-center">
              <Package size={40} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">Boutique en ligne</h3>
              <p className="text-sm text-muted-foreground font-body max-w-md mx-auto mb-6">
                Ajoutez vos produits de beauté premium et commencez à vendre en ligne directement depuis votre espace salon.
              </p>
              <Button variant="gold" className="font-body"><Plus size={14} /> Ajouter un produit</Button>
            </div>
          </motion.div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Statistiques</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-sm p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold mb-4">Revenus mensuels</h3>
                <div className="space-y-3">
                  {["Jan", "Fév", "Mar"].map((month, i) => (
                    <div key={month} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-body w-8">{month}</span>
                      <div className="flex-1 bg-secondary rounded-full h-3">
                        <div className="bg-gold h-3 rounded-full" style={{ width: `${60 + i * 15}%` }} />
                      </div>
                      <span className="text-sm font-body font-medium">{(1.8 + i * 0.3).toFixed(1)}M</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-sm p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold mb-4">Services populaires</h3>
                <div className="space-y-3">
                  {salonData.services.map((service, i) => (
                    <div key={service.id} className="flex items-center justify-between">
                      <span className="text-sm font-body">{service.name}</span>
                      <span className="text-sm font-body text-gold">{30 - i * 5} réservations</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Paramètres du salon</h1>
            <div className="max-w-lg space-y-4">
              <div className="bg-card rounded-sm p-6 shadow-card space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground font-body block mb-1">Nom du salon</label>
                  <input defaultValue={salonData.name} className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-body block mb-1">Description</label>
                  <textarea defaultValue={salonData.description} rows={3} className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50 resize-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-body block mb-1">Horaires</label>
                  <input defaultValue={salonData.hours} className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-body block mb-1">Téléphone</label>
                  <input defaultValue={salonData.phone} className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-gold/50" />
                </div>
                <Button variant="gold" className="font-body">Sauvegarder</Button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default SalonDashboard;

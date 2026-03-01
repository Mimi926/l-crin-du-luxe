import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Building2, Users, CreditCard, BarChart3, Shield,
  Check, X, Eye, TrendingUp, DollarSign, AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { salons } from "@/data/salons";

type Tab = "overview" | "salons" | "users" | "revenue" | "stats" | "disputes";

const pendingSalons = [
  { id: "ps1", name: "Beauty Lounge Tana", location: "Isoraka, Antananarivo", date: "2026-02-28", status: "pending" },
  { id: "ps2", name: "Zen Spa Premium", location: "Ivandry, Antananarivo", date: "2026-02-27", status: "pending" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs = [
    { id: "overview" as Tab, label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "salons" as Tab, label: "Salons", icon: Building2 },
    { id: "users" as Tab, label: "Utilisateurs", icon: Users },
    { id: "revenue" as Tab, label: "Revenus", icon: CreditCard },
    { id: "stats" as Tab, label: "Statistiques", icon: BarChart3 },
    { id: "disputes" as Tab, label: "Litiges", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-noir min-h-screen p-6">
        <Link to="/" className="mb-10">
          <span className="font-display text-xl text-cream font-semibold tracking-wider">Ravaka</span>
          <span className="text-gold text-[10px] font-body uppercase tracking-[0.2em] ml-2">Admin</span>
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
          <p className="text-cream/50 text-xs font-body">Super Admin</p>
          <Link to="/" className="text-gold text-xs font-body hover:underline mt-1 block">
            Retour au site →
          </Link>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-noir px-4 py-3 flex items-center justify-between">
        <span className="font-display text-lg text-cream">Ravaka <span className="text-gold text-xs">Admin</span></span>
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
            <h1 className="font-display text-3xl font-semibold mb-8">Administration</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Salons actifs", value: "12", icon: Building2, change: "+2" },
                { label: "Utilisateurs", value: "1,247", icon: Users, change: "+89" },
                { label: "Revenus plateforme", value: "8.2M Ar", icon: TrendingUp, change: "+15%" },
                { label: "Commission totale", value: "1.2M Ar", icon: DollarSign, change: "+12%" },
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

            {/* Pending salons */}
            <h2 className="font-display text-xl font-semibold mb-4">Salons en attente de validation</h2>
            <div className="space-y-2">
              {pendingSalons.map((s) => (
                <div key={s.id} className="bg-card rounded-sm p-4 shadow-card flex items-center justify-between">
                  <div>
                    <h3 className="font-body text-sm font-medium">{s.name}</h3>
                    <p className="text-xs text-muted-foreground font-body">{s.location} — Soumis le {s.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="gold" size="sm" className="text-xs"><Check size={14} /> Valider</Button>
                    <Button variant="outline" size="sm" className="text-xs"><X size={14} /> Refuser</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Salons */}
        {activeTab === "salons" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Gestion des salons</h1>
            <div className="bg-card rounded-sm shadow-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium">Salon</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium hidden md:table-cell">Localisation</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium hidden md:table-cell">Note</th>
                    <th className="text-left p-4 text-xs text-muted-foreground font-body font-medium">Abonnement</th>
                    <th className="text-right p-4 text-xs text-muted-foreground font-body font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salons.map((salon) => (
                    <tr key={salon.id} className="border-b border-border/50 last:border-0">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={salon.image} alt="" className="w-10 h-10 rounded-sm object-cover" />
                          <span className="font-body text-sm font-medium">{salon.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-body text-muted-foreground hidden md:table-cell">{salon.location}</td>
                      <td className="p-4 text-sm font-body text-gold hidden md:table-cell">{salon.rating} ★</td>
                      <td className="p-4">
                        <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-sm font-body">Premium</span>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm" className="text-xs font-body"><Eye size={12} /> Voir</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Utilisateurs</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-sm p-5 shadow-card text-center">
                <p className="font-display text-3xl font-semibold text-gold">1,247</p>
                <p className="text-xs text-muted-foreground font-body">Clients inscrits</p>
              </div>
              <div className="bg-card rounded-sm p-5 shadow-card text-center">
                <p className="font-display text-3xl font-semibold text-gold">12</p>
                <p className="text-xs text-muted-foreground font-body">Salons partenaires</p>
              </div>
              <div className="bg-card rounded-sm p-5 shadow-card text-center">
                <p className="font-display text-3xl font-semibold text-gold">45</p>
                <p className="text-xs text-muted-foreground font-body">Professionnels</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Revenue */}
        {activeTab === "revenue" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Revenus & Commissions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-sm p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold mb-4">Revenus plateforme</h3>
                <div className="space-y-3">
                  {["Jan", "Fév", "Mar"].map((month, i) => (
                    <div key={month} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-body w-8">{month}</span>
                      <div className="flex-1 bg-secondary rounded-full h-3">
                        <div className="bg-gold h-3 rounded-full" style={{ width: `${50 + i * 20}%` }} />
                      </div>
                      <span className="text-sm font-body font-medium">{(5.5 + i * 1.3).toFixed(1)}M Ar</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-sm p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold mb-4">Commission par salon</h3>
                <div className="space-y-3">
                  {salons.map((salon) => (
                    <div key={salon.id} className="flex items-center justify-between">
                      <span className="text-sm font-body">{salon.name}</span>
                      <div className="text-right">
                        <p className="text-sm font-body font-semibold text-gold">
                          {(Math.random() * 500000 + 200000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Ar
                        </p>
                        <p className="text-xs text-muted-foreground font-body">10% commission</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        {activeTab === "stats" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Statistiques globales</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Réservations totales", value: "3,456" },
                { label: "Réservations ce mois", value: "342" },
                { label: "Taux de conversion", value: "68%" },
                { label: "Panier moyen", value: "125,000 Ar" },
                { label: "Service le plus demandé", value: "Massage Relaxant" },
                { label: "Salon le plus populaire", value: "Spa Ravinala" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-sm p-6 shadow-card">
                  <p className="text-xs text-muted-foreground font-body mb-2">{stat.label}</p>
                  <p className="font-display text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Disputes */}
        {activeTab === "disputes" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-semibold mb-8">Litiges</h1>
            <div className="bg-card rounded-sm p-12 shadow-card text-center">
              <Shield size={40} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">Aucun litige en cours</h3>
              <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
                Tous les litiges ont été résolus. La plateforme fonctionne sans incident.
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

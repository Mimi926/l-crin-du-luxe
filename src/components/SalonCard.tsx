import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Salon } from "@/data/salons";

interface SalonCardProps {
  salon: Salon;
  index?: number;
}

const SalonCard = ({ salon, index = 0 }: SalonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/salon/${salon.id}`}
        className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-noir/80 backdrop-blur-sm text-cream px-3 py-1 rounded-sm text-xs font-body tracking-wider">
            {salon.priceRange}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(salon.rating) ? "fill-gold text-gold" : "text-muted-foreground"}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {salon.rating} ({salon.reviewCount})
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
            {salon.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{salon.shortDescription}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{salon.location}</span>
            <span className="text-xs text-gold font-medium tracking-wide uppercase group-hover:tracking-widest transition-all">
              Voir profil →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SalonCard;

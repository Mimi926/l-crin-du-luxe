import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";

export interface Salon {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  priceRange: string;
  services: Service[];
  employees: Employee[];
  hours: string;
  phone: string;
  photos: string[];
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  salonName: string;
  serviceName: string;
  employeeName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  price: number;
}

export const salons: Salon[] = [
  {
    id: "1",
    name: "L'Atelier Doré",
    shortDescription: "L'excellence capillaire au cœur d'Antananarivo",
    description: "L'Atelier Doré est un salon de coiffure haut de gamme niché au cœur d'Antananarivo. Notre équipe de stylistes experts vous offre une expérience beauté unique, alliant techniques modernes et savoir-faire traditionnel.",
    image: salon1,
    rating: 4.9,
    reviewCount: 127,
    location: "Analakely, Antananarivo",
    priceRange: "€€€",
    hours: "Lun-Sam: 9h-19h",
    phone: "+261 34 00 000 01",
    photos: [salon1, salon2, salon3],
    employees: [
      { id: "e1", name: "Nomena H.", role: "Styliste Senior", avatar: "N" },
      { id: "e2", name: "Rivo A.", role: "Coloriste", avatar: "R" },
      { id: "e3", name: "Lova T.", role: "Styliste", avatar: "L" },
    ],
    services: [
      { id: "s1", name: "Coupe & Brushing", category: "Coiffure", price: 80000, duration: 60, description: "Coupe sur mesure avec brushing professionnel" },
      { id: "s2", name: "Coloration Premium", category: "Coiffure", price: 150000, duration: 120, description: "Coloration avec produits haut de gamme importés" },
      { id: "s3", name: "Soin Kératine", category: "Soins", price: 200000, duration: 90, description: "Traitement kératine pour cheveux lisses et brillants" },
      { id: "s4", name: "Balayage", category: "Coiffure", price: 180000, duration: 150, description: "Balayage naturel avec technique californienne" },
    ],
    reviews: [
      { id: "r1", author: "Nirina R.", rating: 5, comment: "Service exceptionnel ! Mon salon préféré à Tana.", date: "2026-02-15" },
      { id: "r2", author: "Fanja M.", rating: 5, comment: "Ambiance luxueuse et résultat parfait. Je recommande.", date: "2026-02-10" },
      { id: "r3", author: "Sandra T.", rating: 4, comment: "Très bon salon, un peu cher mais la qualité est au rendez-vous.", date: "2026-01-28" },
    ],
  },
  {
    id: "2",
    name: "Spa Ravinala",
    shortDescription: "Votre oasis de détente et de beauté",
    description: "Le Spa Ravinala vous invite à un voyage sensoriel unique. Nos soins exclusifs, inspirés des rituels malgaches ancestraux et des techniques internationales.",
    image: salon2,
    rating: 4.8,
    reviewCount: 89,
    location: "Ivandry, Antananarivo",
    priceRange: "€€€€",
    hours: "Lun-Dim: 8h-20h",
    phone: "+261 34 00 000 02",
    photos: [salon2, salon1, salon3],
    employees: [
      { id: "e4", name: "Mialy R.", role: "Masseuse Senior", avatar: "M" },
      { id: "e5", name: "Tiana S.", role: "Esthéticienne", avatar: "T" },
    ],
    services: [
      { id: "s5", name: "Massage Relaxant", category: "Massage", price: 120000, duration: 60, description: "Massage corps complet aux huiles essentielles" },
      { id: "s6", name: "Soin Visage Premium", category: "Soins visage", price: 100000, duration: 75, description: "Soin du visage avec produits bio de luxe" },
      { id: "s7", name: "Rituel Ravinala", category: "Rituel", price: 350000, duration: 180, description: "Notre soin signature : gommage, massage et enveloppement" },
      { id: "s8", name: "Manucure Prestige", category: "Ongles", price: 60000, duration: 45, description: "Manucure complète avec vernis semi-permanent" },
    ],
    reviews: [
      { id: "r4", author: "Haja V.", rating: 5, comment: "Un moment hors du temps. Le rituel Ravinala est divin.", date: "2026-02-20" },
      { id: "r5", author: "Marie L.", rating: 5, comment: "Le meilleur spa de Madagascar, sans hésitation.", date: "2026-02-05" },
    ],
  },
  {
    id: "3",
    name: "Maison Élégance",
    shortDescription: "L'art de la beauté au féminin",
    description: "Maison Élégance est la destination beauté par excellence pour les femmes exigeantes. Notre salon offre une gamme complète de services dans un environnement raffiné.",
    image: salon3,
    rating: 4.7,
    reviewCount: 156,
    location: "Ankorondrano, Antananarivo",
    priceRange: "€€€",
    hours: "Mar-Sam: 9h-18h30",
    phone: "+261 34 00 000 03",
    photos: [salon3, salon1, salon2],
    employees: [
      { id: "e6", name: "Hasina M.", role: "Nail Artist", avatar: "H" },
      { id: "e7", name: "Fara N.", role: "Maquilleuse", avatar: "F" },
      { id: "e8", name: "Zo R.", role: "Esthéticienne", avatar: "Z" },
    ],
    services: [
      { id: "s9", name: "Pose Gel UV", category: "Ongles", price: 90000, duration: 90, description: "Pose complète gel UV avec nail art" },
      { id: "s10", name: "Maquillage Événementiel", category: "Maquillage", price: 150000, duration: 90, description: "Maquillage professionnel pour événements spéciaux" },
      { id: "s11", name: "Extension Cils", category: "Regard", price: 130000, duration: 120, description: "Extensions de cils volume russe" },
      { id: "s12", name: "Épilation Complète", category: "Esthétique", price: 100000, duration: 60, description: "Épilation à la cire orientale, corps complet" },
    ],
    reviews: [
      { id: "r6", author: "Ketsia A.", rating: 5, comment: "Nail art superbe ! Les filles sont très talentueuses.", date: "2026-02-18" },
      { id: "r7", author: "Voahirana P.", rating: 4, comment: "Très satisfaite du maquillage pour mon mariage.", date: "2026-01-30" },
    ],
  },
];

export const serviceCategories = [
  "Coiffure", "Massage", "Soins visage", "Ongles", "Maquillage", "Esthétique", "Rituel", "Regard",
];

export const locations = [
  "Analakely, Antananarivo",
  "Ivandry, Antananarivo",
  "Ankorondrano, Antananarivo",
  "Isoraka, Antananarivo",
];

// Mock bookings for client dashboard
export const mockBookings: Booking[] = [
  { id: "b1", salonName: "L'Atelier Doré", serviceName: "Coupe & Brushing", employeeName: "Nomena H.", date: "2026-03-05", time: "10:00", status: "confirmed", price: 80000 },
  { id: "b2", salonName: "Spa Ravinala", serviceName: "Massage Relaxant", employeeName: "Mialy R.", date: "2026-02-28", time: "14:00", status: "completed", price: 120000 },
  { id: "b3", salonName: "Maison Élégance", serviceName: "Pose Gel UV", employeeName: "Hasina M.", date: "2026-02-20", time: "11:30", status: "completed", price: 90000 },
  { id: "b4", salonName: "L'Atelier Doré", serviceName: "Coloration Premium", employeeName: "Rivo A.", date: "2026-02-10", time: "09:00", status: "cancelled", price: 150000 },
];

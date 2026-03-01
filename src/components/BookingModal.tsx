import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Check, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service, Employee } from "@/data/salons";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  employees: Employee[];
  salonName: string;
  initialService?: Service;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

const BookingModal = ({ isOpen, onClose, services, employees, salonName, initialService }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "onsite">("onsite");

  const totalSteps = 5;

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedService;
      case 2: return !!selectedEmployee;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return !!paymentMethod;
      default: return true;
    }
  };

  const handleConfirm = () => {
    setStep(5);
  };

  const reset = () => {
    setStep(1);
    setSelectedService(initialService || null);
    setSelectedEmployee(null);
    setSelectedDate("");
    setSelectedTime("");
    onClose();
  };

  // Generate dates for the next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-noir/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={reset}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40 }}
          className="bg-background rounded-sm shadow-elevated w-full max-w-lg max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-noir p-6">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-1">{salonName}</p>
            <h2 className="font-display text-2xl text-cream">Réservation</h2>
            {/* Progress */}
            <div className="flex gap-1 mt-4">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    i < step ? "bg-gold" : "bg-cream/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Service */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Check size={16} className="text-gold" />
                  <h3 className="font-display text-lg font-semibold">Choisir un service</h3>
                </div>
                <div className="space-y-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`w-full text-left p-4 rounded-sm border transition-all font-body ${
                        selectedService?.id === service.id
                          ? "border-gold bg-gold/5"
                          : "border-border hover:border-gold/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{service.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{service.duration} min</p>
                        </div>
                        <p className="text-sm font-semibold text-gold">{service.price.toLocaleString()} Ar</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Employee */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <User size={16} className="text-gold" />
                  <h3 className="font-display text-lg font-semibold">Choisir un professionnel</h3>
                </div>
                <div className="space-y-2">
                  {employees.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => setSelectedEmployee(emp)}
                      className={`w-full text-left p-4 rounded-sm border transition-all font-body flex items-center gap-3 ${
                        selectedEmployee?.id === emp.id
                          ? "border-gold bg-gold/5"
                          : "border-border hover:border-gold/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                        <span className="font-display font-semibold text-gold">{emp.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-gold" />
                  <h3 className="font-display text-lg font-semibold">Date & Heure</h3>
                </div>
                <p className="text-sm text-muted-foreground font-body mb-3">Choisir une date</p>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {availableDates.slice(0, 8).map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-2 rounded-sm border text-center transition-all font-body text-xs ${
                        selectedDate === date
                          ? "border-gold bg-gold/5 text-foreground"
                          : "border-border hover:border-gold/50 text-muted-foreground"
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
                {selectedDate && (
                  <>
                    <p className="text-sm text-muted-foreground font-body mb-3">Choisir un créneau</p>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-sm border text-center transition-all font-body text-sm ${
                            selectedTime === time
                              ? "border-gold bg-gold/5"
                              : "border-border hover:border-gold/50 text-muted-foreground"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={16} className="text-gold" />
                  <h3 className="font-display text-lg font-semibold">Mode de paiement</h3>
                </div>

                {/* Summary */}
                <div className="bg-card rounded-sm p-4 mb-6 space-y-2 font-body text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Professionnel</span>
                    <span>{selectedEmployee?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{selectedDate && formatDate(selectedDate)} à {selectedTime}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-gold">{selectedService?.price.toLocaleString()} Ar</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`w-full text-left p-4 rounded-sm border transition-all font-body ${
                      paymentMethod === "online" ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                    }`}
                  >
                    <p className="font-medium text-sm">Paiement en ligne</p>
                    <p className="text-xs text-muted-foreground">Carte bancaire / Mobile Money</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("onsite")}
                    className={`w-full text-left p-4 rounded-sm border transition-all font-body ${
                      paymentMethod === "onsite" ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                    }`}
                  >
                    <p className="font-medium text-sm">Paiement sur place</p>
                    <p className="text-xs text-muted-foreground">Payez directement au salon</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">Réservation confirmée !</h3>
                <p className="text-sm text-muted-foreground font-body mb-6">
                  Vous recevrez un email de confirmation avec les détails de votre rendez-vous.
                </p>
                <div className="bg-card rounded-sm p-4 text-left space-y-2 font-body text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salon</span>
                    <span>{salonName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{selectedDate && formatDate(selectedDate)} à {selectedTime}</span>
                  </div>
                </div>
                <Button variant="gold" onClick={reset} className="w-full">
                  Fermer
                </Button>
              </motion.div>
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 font-body">
                    Retour
                  </Button>
                )}
                <Button
                  variant="gold"
                  disabled={!canProceed()}
                  onClick={() => (step === 4 ? handleConfirm() : setStep(step + 1))}
                  className="flex-1 font-body"
                >
                  {step === 4 ? "Confirmer" : "Continuer"}
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;

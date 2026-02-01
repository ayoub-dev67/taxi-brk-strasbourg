"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ReservationData } from "@/types";

interface Step2DateTimeProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const timeSlots = [
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
];

export function Step2DateTime({ data, updateData, onNext, onPrev }: Step2DateTimeProps) {
  const [errors, setErrors] = useState<{ date?: string; heure?: string }>({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { date?: string; heure?: string } = {};

    if (!data.date) {
      newErrors.date = "La date est requise";
    }
    if (!data.heure) {
      newErrors.heure = "L'heure est requise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  const quickDates = [
    { label: "Aujourd'hui", date: new Date() },
    { label: "Demain", date: addDays(new Date(), 1) },
    { label: "Dans 2 jours", date: addDays(new Date(), 2) },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Quand avez-vous <span className="text-gold-gradient">besoin de nous</span> ?
        </h2>
        <p className="text-gray-400">
          Sélectionnez la date et l&apos;heure de prise en charge
        </p>
      </div>

      {/* Date */}
      <div className="space-y-3">
        <label className="text-white flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gold-400" />
          Date de prise en charge
        </label>

        {/* Quick dates */}
        <div className="flex gap-2 mb-3">
          {quickDates.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                updateData({ date: item.date });
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                data.date &&
                  format(data.date, "yyyy-MM-dd") === format(item.date, "yyyy-MM-dd")
                  ? "bg-gold-400 text-black"
                  : "bg-black-100 text-gray-300 border border-gold-400/20 hover:border-gold-400/50"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Calendar */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "input-premium w-full text-left flex items-center justify-between",
                !data.date && "text-gray-500"
              )}
              aria-label={data.date ? `Date sélectionnée : ${format(data.date, "EEEE d MMMM yyyy", { locale: fr })}` : "Sélectionner une date"}
              aria-expanded={calendarOpen ? "true" : "false"}
              aria-haspopup="dialog"
            >
              {data.date ? (
                format(data.date, "EEEE d MMMM yyyy", { locale: fr })
              ) : (
                "Sélectionner une date"
              )}
              <CalendarIcon className="w-5 h-5 text-gold-400" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-black-50 border-gold-400/20" align="start">
            <Calendar
              mode="single"
              selected={data.date}
              onSelect={(date) => {
                updateData({ date });
                setCalendarOpen(false);
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              locale={fr}
              className="rounded-lg"
            />
          </PopoverContent>
        </Popover>
        {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
      </div>

      {/* Time */}
      <div className="space-y-3">
        <label className="text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold-400" />
          Heure de prise en charge
        </label>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto scrollbar-hide p-1">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                updateData({ heure: time });
                setErrors((prev) => ({ ...prev, heure: undefined }));
              }}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                data.heure === time
                  ? "bg-gold-400 text-black"
                  : "bg-black-100 text-gray-300 border border-gold-400/20 hover:border-gold-400/50"
              )}
            >
              {time}
            </button>
          ))}
        </div>
        {errors.heure && <p className="text-red-400 text-sm">{errors.heure}</p>}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="btn-gold-outline flex-1 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <button
          type="submit"
          className="btn-gold flex-1 flex items-center justify-center gap-2"
        >
          Continuer
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

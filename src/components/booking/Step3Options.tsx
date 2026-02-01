"use client";

import { Users, Briefcase, Dog, Baby, Accessibility, ArrowRight, ArrowLeft, Minus, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ReservationData } from "@/types";

interface Step3OptionsProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step3Options({ data, updateData, onNext, onPrev }: Step3OptionsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const incrementValue = (field: "passagers" | "bagages" | "animaux", max: number) => {
    const current = data[field] || 0;
    if (current < max) {
      updateData({ [field]: current + 1 });
    }
  };

  const decrementValue = (field: "passagers" | "bagages" | "animaux", min: number) => {
    const current = data[field] || 0;
    if (current > min) {
      updateData({ [field]: current - 1 });
    }
  };

  const updateOption = (key: keyof NonNullable<ReservationData["options"]>, value: boolean) => {
    updateData({
      options: {
        ...data.options,
        [key]: value,
      } as ReservationData["options"],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          <span className="text-gold-gradient">Personnalisez</span> votre trajet
        </h2>
        <p className="text-gray-400">
          Adaptez votre course selon vos besoins
        </p>
      </div>

      {/* Counters */}
      <div className="space-y-4">
        {/* Passagers */}
        <div className="card-premium flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-white font-medium">Passagers</p>
              <p className="text-gray-500 text-sm">Nombre de personnes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => decrementValue("passagers", 1)}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                data.passagers === 1
                  ? "bg-black-100 text-gray-600"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20"
              )}
              disabled={data.passagers === 1}
              aria-label="Réduire le nombre de passagers"
              title="Réduire"
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="text-white font-semibold text-lg w-8 text-center" aria-live="polite">
              {data.passagers || 1}
            </span>
            <button
              type="button"
              onClick={() => incrementValue("passagers", 8)}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                data.passagers === 8
                  ? "bg-black-100 text-gray-600"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20"
              )}
              disabled={data.passagers === 8}
              aria-label="Augmenter le nombre de passagers"
              title="Augmenter"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bagages */}
        <div className="card-premium flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-white font-medium">Bagages</p>
              <p className="text-gray-500 text-sm">Valises volumineuses</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => decrementValue("bagages", 0)}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                data.bagages === 0
                  ? "bg-black-100 text-gray-600"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20"
              )}
              disabled={data.bagages === 0}
              aria-label="Réduire le nombre de bagages"
              title="Réduire"
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="text-white font-semibold text-lg w-8 text-center" aria-live="polite">
              {data.bagages || 0}
            </span>
            <button
              type="button"
              onClick={() => incrementValue("bagages", 10)}
              className="w-10 h-10 rounded-lg bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 flex items-center justify-center transition-all"
              aria-label="Augmenter le nombre de bagages"
              title="Augmenter"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Animaux */}
        <div className="card-premium flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
              <Dog className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-white font-medium">Animaux</p>
              <p className="text-gray-500 text-sm">Animaux de compagnie</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => decrementValue("animaux", 0)}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                data.animaux === 0
                  ? "bg-black-100 text-gray-600"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20"
              )}
              disabled={data.animaux === 0}
              aria-label="Réduire le nombre d'animaux"
              title="Réduire"
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="text-white font-semibold text-lg w-8 text-center" aria-live="polite">
              {data.animaux || 0}
            </span>
            <button
              type="button"
              onClick={() => incrementValue("animaux", 3)}
              className="w-10 h-10 rounded-lg bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 flex items-center justify-center transition-all"
              aria-label="Augmenter le nombre d'animaux"
              title="Augmenter"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Options checkboxes */}
      <div className="space-y-3">
        <p className="text-white font-medium">Options supplémentaires</p>

        <label className="flex items-center gap-3 p-4 rounded-lg border border-gold-400/20 hover:border-gold-400/40 transition-colors cursor-pointer">
          <Checkbox
            checked={data.options?.siegeBebe || false}
            onCheckedChange={(checked) => updateOption("siegeBebe", checked as boolean)}
            className="border-gold-400/50 data-[state=checked]:bg-gold-400 data-[state=checked]:border-gold-400"
          />
          <Baby className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-white">Siège bébé / rehausseur</p>
            <p className="text-gray-500 text-sm">Gratuit, sur demande</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 rounded-lg border border-gold-400/20 hover:border-gold-400/40 transition-colors cursor-pointer">
          <Checkbox
            checked={data.options?.fauteuilRoulant || false}
            onCheckedChange={(checked) => updateOption("fauteuilRoulant", checked as boolean)}
            className="border-gold-400/50 data-[state=checked]:bg-gold-400 data-[state=checked]:border-gold-400"
          />
          <Accessibility className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-white">Fauteuil roulant</p>
            <p className="text-gray-500 text-sm">Transport adapté PMR</p>
          </div>
        </label>
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

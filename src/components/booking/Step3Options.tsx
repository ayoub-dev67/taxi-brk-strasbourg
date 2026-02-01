"use client";

import { Users, Briefcase, Dog, Baby, Accessibility, ArrowRight, ArrowLeft, Minus, Plus, ArrowLeftRight, ArrowRightLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ReservationData } from "@/types";

interface Step3OptionsProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step3Options({ data, updateData, onNext, onPrev }: Step3OptionsProps) {
  // Valeurs actuelles avec fallback robuste
  const passagers = typeof data.passagers === "number" ? data.passagers : 1;
  const bagages = typeof data.bagages === "number" ? data.bagages : 0;
  const animaux = typeof data.animaux === "number" ? data.animaux : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Handlers directs et explicites pour les compteurs
  const incrementPassagers = () => {
    if (passagers < 7) {
      updateData({ passagers: passagers + 1 });
    }
  };

  const decrementPassagers = () => {
    if (passagers > 1) {
      updateData({ passagers: passagers - 1 });
    }
  };

  const incrementBagages = () => {
    if (bagages < 10) {
      updateData({ bagages: bagages + 1 });
    }
  };

  const decrementBagages = () => {
    if (bagages > 0) {
      updateData({ bagages: bagages - 1 });
    }
  };

  const incrementAnimaux = () => {
    if (animaux < 3) {
      updateData({ animaux: animaux + 1 });
    }
  };

  const decrementAnimaux = () => {
    if (animaux > 0) {
      updateData({ animaux: animaux - 1 });
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

      {/* Type de trajet */}
      <div className="space-y-3">
        <p className="text-white font-medium flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-gold-400" />
          Type de trajet
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateData({ typeTrajet: "aller-simple" })}
            className={cn(
              "p-4 rounded-lg border transition-all text-left",
              data.typeTrajet === "aller-simple"
                ? "bg-gold-400/10 border-gold-400 ring-2 ring-gold-400/20"
                : "bg-black-100 border-gold-400/20 hover:border-gold-400/50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-5 h-5 text-gold-400" />
              <span className="text-white font-medium">Aller simple</span>
            </div>
            <p className="text-gray-500 text-xs">
              Tarif C/D - Le taxi rentre sans passager
            </p>
          </button>
          <button
            type="button"
            onClick={() => updateData({ typeTrajet: "aller-retour" })}
            className={cn(
              "p-4 rounded-lg border transition-all text-left",
              data.typeTrajet === "aller-retour"
                ? "bg-gold-400/10 border-gold-400 ring-2 ring-gold-400/20"
                : "bg-black-100 border-gold-400/20 hover:border-gold-400/50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeftRight className="w-5 h-5 text-gold-400" />
              <span className="text-white font-medium">Aller-retour</span>
            </div>
            <p className="text-gray-500 text-xs">
              Tarif A/B - Le taxi vous attend ou vous ramène
            </p>
          </button>
        </div>
        <p className="text-gray-500 text-xs">
          💡 L&apos;aller-retour est plus économique car le taxi a un passager au retour.
        </p>
      </div>

      {/* Counters - Boutons 48px pour mobile */}
      <div className="space-y-4">
        {/* Passagers */}
        <div className="card-premium flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-gold-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium">Passagers</p>
              <p className="text-gray-500 text-sm truncate">1-7 personnes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={decrementPassagers}
              disabled={passagers <= 1}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                passagers <= 1
                  ? "bg-black-100 text-gray-600 cursor-not-allowed"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 active:bg-gold-400/30"
              )}
              aria-label="Réduire le nombre de passagers"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-white font-bold text-xl w-8 text-center tabular-nums">
              {passagers}
            </span>
            <button
              type="button"
              onClick={incrementPassagers}
              disabled={passagers >= 7}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                passagers >= 7
                  ? "bg-black-100 text-gray-600 cursor-not-allowed"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 active:bg-gold-400/30"
              )}
              aria-label="Augmenter le nombre de passagers"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bagages */}
        <div className="card-premium flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-gold-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium">Bagages</p>
              <p className="text-gray-500 text-sm truncate">Valises volumineuses</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={decrementBagages}
              disabled={bagages <= 0}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                bagages <= 0
                  ? "bg-black-100 text-gray-600 cursor-not-allowed"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 active:bg-gold-400/30"
              )}
              aria-label="Réduire le nombre de bagages"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-white font-bold text-xl w-8 text-center tabular-nums">
              {bagages}
            </span>
            <button
              type="button"
              onClick={incrementBagages}
              disabled={bagages >= 10}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                bagages >= 10
                  ? "bg-black-100 text-gray-600 cursor-not-allowed"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 active:bg-gold-400/30"
              )}
              aria-label="Augmenter le nombre de bagages"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animaux */}
        <div className="card-premium flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0">
              <Dog className="w-5 h-5 text-gold-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium">Animaux</p>
              <p className="text-gray-500 text-sm truncate">+2€ par animal</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={decrementAnimaux}
              disabled={animaux <= 0}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                animaux <= 0
                  ? "bg-black-100 text-gray-600 cursor-not-allowed"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 active:bg-gold-400/30"
              )}
              aria-label="Réduire le nombre d'animaux"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-white font-bold text-xl w-8 text-center tabular-nums">
              {animaux}
            </span>
            <button
              type="button"
              onClick={incrementAnimaux}
              disabled={animaux >= 3}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-all touch-manipulation",
                animaux >= 3
                  ? "bg-black-100 text-gray-600 cursor-not-allowed"
                  : "bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 active:bg-gold-400/30"
              )}
              aria-label="Augmenter le nombre d'animaux"
            >
              <Plus className="w-5 h-5" />
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

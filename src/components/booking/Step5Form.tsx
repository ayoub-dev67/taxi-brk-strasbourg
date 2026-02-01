"use client";

import { useState } from "react";
import { User, Phone, Mail, MessageSquare, ArrowLeft, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { ReservationData } from "@/types";

interface Step5FormProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export function Step5Form({ data, updateData, onSubmit, onPrev, isLoading }: Step5FormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateClient = (field: string, value: string) => {
    updateData({
      client: {
        ...data.client,
        [field]: value,
      } as ReservationData["client"],
    });
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.client?.nom?.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!data.client?.prenom?.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!data.client?.telephone?.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!/^[0-9+\s]{10,15}$/.test(data.client.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Numéro de téléphone invalide";
    }
    if (!data.client?.email?.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.client.email)) {
      newErrors.email = "Email invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          <span className="text-gold-gradient">Dernière étape</span> avant confirmation
        </h2>
        <p className="text-gray-400">
          Vos coordonnées pour vous contacter
        </p>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nom */}
        <div className="space-y-2">
          <Label htmlFor="nom" className="text-white flex items-center gap-2">
            <User className="w-4 h-4 text-gold-400" />
            Nom
          </Label>
          <Input
            id="nom"
            type="text"
            placeholder="Votre nom"
            value={data.client?.nom || ""}
            onChange={(e) => updateClient("nom", e.target.value)}
            className="input-premium"
          />
          {errors.nom && <p className="text-red-400 text-sm">{errors.nom}</p>}
        </div>

        {/* Prénom */}
        <div className="space-y-2">
          <Label htmlFor="prenom" className="text-white flex items-center gap-2">
            <User className="w-4 h-4 text-gold-400" />
            Prénom
          </Label>
          <Input
            id="prenom"
            type="text"
            placeholder="Votre prénom"
            value={data.client?.prenom || ""}
            onChange={(e) => updateClient("prenom", e.target.value)}
            className="input-premium"
          />
          {errors.prenom && <p className="text-red-400 text-sm">{errors.prenom}</p>}
        </div>
      </div>

      {/* Téléphone */}
      <div className="space-y-2">
        <Label htmlFor="telephone" className="text-white flex items-center gap-2">
          <Phone className="w-4 h-4 text-gold-400" />
          Téléphone
        </Label>
        <Input
          id="telephone"
          type="tel"
          placeholder="06 12 34 56 78"
          value={data.client?.telephone || ""}
          onChange={(e) => updateClient("telephone", e.target.value)}
          className="input-premium"
        />
        {errors.telephone && <p className="text-red-400 text-sm">{errors.telephone}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-gold-400" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={data.client?.email || ""}
          onChange={(e) => updateClient("email", e.target.value)}
          className="input-premium"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
      </div>

      {/* Commentaire */}
      <div className="space-y-2">
        <Label htmlFor="commentaire" className="text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gold-400" />
          Commentaire (optionnel)
        </Label>
        <Textarea
          id="commentaire"
          placeholder="Instructions particulières, code d'entrée, etc."
          value={data.client?.commentaire || ""}
          onChange={(e) => updateClient("commentaire", e.target.value)}
          className="input-premium min-h-[100px] resize-none"
        />
      </div>

      {/* RGPD */}
      <p className="text-gray-500 text-xs">
        En soumettant ce formulaire, vous acceptez que vos données soient utilisées
        pour traiter votre demande de réservation. Voir notre{" "}
        <a href="/confidentialite" className="text-gold-400 hover:underline">
          politique de confidentialité
        </a>
        .
      </p>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={isLoading}
          className="btn-gold-outline flex-1 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-gold flex-1 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Confirmer
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

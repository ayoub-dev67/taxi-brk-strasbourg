"use client";

import { CheckCircle, Clock, MessageSquare } from "lucide-react";

export function UrgencyBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {/* Disponible maintenant */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-green-400 text-sm font-medium">
          Chauffeur disponible
        </span>
      </div>

      {/* Réponse rapide */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-400/10 border border-gold-400/30 rounded-full">
        <Clock className="w-4 h-4 text-gold-400" />
        <span className="text-gold-400 text-sm font-medium">
          Réponse sous 5 min
        </span>
      </div>

      {/* Confirmation SMS */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
        <MessageSquare className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 text-sm font-medium">
          Confirmation SMS
        </span>
      </div>
    </div>
  );
}

export function UrgencyBadgesCompact() {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-400" />
        <span className="text-gray-300">Chauffeur disponible maintenant</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gold-400" />
        <span className="text-gray-300">Réponse garantie sous 5 minutes</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-blue-400" />
        <span className="text-gray-300">Confirmation SMS immédiate</span>
      </div>
    </div>
  );
}

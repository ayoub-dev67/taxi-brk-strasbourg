"use client";

import { createContext, useContext, ReactNode } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

const libraries: Libraries = ["places"];

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
});

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
    libraries,
    language: "fr",
    region: "FR",
  });

  // Si pas de clé API, on rend quand même les children mais avec isLoaded = false
  if (!apiKey) {
    return (
      <GoogleMapsContext.Provider value={{ isLoaded: false, loadError: undefined }}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

// Composant de fallback pour afficher quand Google Maps n'est pas disponible
export function GoogleMapsPlaceholder({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-black-50 border border-gold-400/20 rounded-xl">
      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-3">
        <svg
          className="w-6 h-6 text-gold-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <p className="text-gray-400 text-sm text-center">
        {message || "Configurez NEXT_PUBLIC_GOOGLE_MAPS_API_KEY pour activer la carte"}
      </p>
    </div>
  );
}

// Composant de chargement pour Google Maps
export function GoogleMapsLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black-50 border border-gold-400/20 rounded-xl">
      <Loader2 className="w-8 h-8 text-gold-400 animate-spin mb-3" />
      <p className="text-gray-400 text-sm">Chargement de la carte...</p>
    </div>
  );
}

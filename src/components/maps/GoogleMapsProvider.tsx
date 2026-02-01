"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

// IMPORTANT: Libraries doit être défini en dehors du composant pour éviter les re-renders
const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
  apiKeyMissing: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
  apiKeyMissing: true,
});

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasApiKey = Boolean(apiKey && apiKey.trim().length > 0);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: hasApiKey ? apiKey! : "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: "fr",
    region: "FR",
    // Prévient le chargement si pas de clé API
    preventGoogleFontsLoading: !hasApiKey,
  });

  // Log l'erreur en développement pour le debugging
  if (loadError && process.env.NODE_ENV === "development") {
    console.error("Google Maps Load Error:", loadError.message);
  }

  const contextValue = useMemo(() => ({
    isLoaded: hasApiKey ? isLoaded : false,
    loadError: hasApiKey ? loadError : undefined,
    apiKeyMissing: !hasApiKey,
  }), [hasApiKey, isLoaded, loadError]);

  return (
    <GoogleMapsContext.Provider value={contextValue}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

// Composant de fallback pour afficher quand Google Maps n'est pas disponible
export function GoogleMapsPlaceholder({
  message,
  showError = false,
  errorMessage
}: {
  message?: string;
  showError?: boolean;
  errorMessage?: string;
}) {
  const isError = showError && errorMessage;

  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-black-50 border rounded-xl ${
      isError ? "border-red-400/30" : "border-gold-400/20"
    }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
        isError ? "bg-red-400/10" : "bg-gold-400/10"
      }`}>
        {isError ? (
          <svg
            className="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        ) : (
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
        )}
      </div>
      <p className={`text-sm text-center ${isError ? "text-red-400" : "text-gray-400"}`}>
        {isError
          ? errorMessage
          : (message || "Configurez NEXT_PUBLIC_GOOGLE_MAPS_API_KEY pour activer la carte")
        }
      </p>
      {isError && (
        <p className="text-gray-500 text-xs text-center mt-2">
          Vérifiez que l&apos;API key Google Maps est valide et que les APIs requises sont activées.
        </p>
      )}
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

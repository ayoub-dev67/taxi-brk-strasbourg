"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";
import { useGoogleMaps } from "./GoogleMapsProvider";
import { cn } from "@/lib/utils";

interface AddressData {
  adresse: string;
  lat?: number;
  lng?: number;
  placeId?: string;
}

interface AddressAutocompleteProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (data: AddressData) => void;
  iconColor?: "gold" | "green";
  error?: string;
  showGeolocation?: boolean;
}

export function AddressAutocomplete({
  id,
  label,
  placeholder,
  value,
  onChange,
  iconColor = "gold",
  error,
  showGeolocation = false,
}: AddressAutocompleteProps) {
  const { isLoaded, loadError, apiKeyMissing } = useGoogleMaps();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(value);
  const [isGeolocating, setIsGeolocating] = useState(false);

  // Sync inputValue with value prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place && place.formatted_address) {
        const addressData: AddressData = {
          adresse: place.formatted_address,
          placeId: place.place_id,
        };

        if (place.geometry?.location) {
          addressData.lat = place.geometry.location.lat();
          addressData.lng = place.geometry.location.lng();
        }

        setInputValue(place.formatted_address);
        onChange(addressData);
      }
    }
  }, [onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Update only the address text when typing (before selecting)
    onChange({ adresse: newValue });
  };

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      return;
    }

    setIsGeolocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // If Google Maps is loaded, try to reverse geocode
        if (isLoaded && window.google) {
          const geocoder = new google.maps.Geocoder();
          try {
            const response = await geocoder.geocode({
              location: { lat: latitude, lng: longitude },
            });

            if (response.results && response.results[0]) {
              const result = response.results[0];
              const addressData: AddressData = {
                adresse: result.formatted_address,
                lat: latitude,
                lng: longitude,
                placeId: result.place_id,
              };
              setInputValue(result.formatted_address);
              onChange(addressData);
            }
          } catch {
            // Fallback to coordinates only
            const coordsAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            setInputValue(coordsAddress);
            onChange({
              adresse: coordsAddress,
              lat: latitude,
              lng: longitude,
            });
          }
        } else {
          // Fallback without Google Maps
          const coordsAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setInputValue(coordsAddress);
          onChange({
            adresse: coordsAddress,
            lat: latitude,
            lng: longitude,
          });
        }

        setIsGeolocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsGeolocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const iconColorClass = iconColor === "green" ? "text-green-400" : "text-gold-400";

  // Log l'erreur en développement
  if (loadError && process.env.NODE_ENV === "development") {
    console.warn("AddressAutocomplete: Google Maps failed to load:", loadError.message);
  }

  // If Google Maps is not loaded or failed to load, render a simple input
  if (!isLoaded || loadError || apiKeyMissing) {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-white flex items-center gap-2 text-sm font-medium">
          <MapPin className={cn("w-4 h-4", iconColorClass)} aria-hidden="true" />
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            className={cn(
              "w-full bg-black-50 border rounded-lg px-4 py-3 text-white placeholder-gray-500",
              "transition-all duration-300 outline-none min-h-[48px] text-base",
              "focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20",
              error ? "border-red-400" : "border-gold-400/20",
              showGeolocation && "pr-12"
            )}
          />
          {showGeolocation && (
            <button
              type="button"
              onClick={handleGeolocation}
              disabled={isGeolocating}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300 transition-colors disabled:opacity-50"
              aria-label="Utiliser ma position actuelle"
              title="Utiliser ma position"
            >
              {isGeolocating ? (
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              ) : (
                <LocateFixed className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-white flex items-center gap-2 text-sm font-medium">
        <MapPin className={cn("w-4 h-4", iconColorClass)} aria-hidden="true" />
        {label}
      </label>
      <div className="relative">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            // Pas de componentRestrictions pour autoriser tous les pays
            // (France, Allemagne, Suisse, etc.)
            types: ["address"],
            fields: ["formatted_address", "geometry", "place_id"],
            // Préférence pour la région Strasbourg/Alsace sans bloquer les autres
            bounds: {
              north: 49.5,  // Nord Alsace
              south: 47.5,  // Sud Alsace
              east: 9.0,    // Frontière allemande
              west: 6.5,    // Ouest Lorraine
            },
            strictBounds: false, // IMPORTANT: permet les adresses hors zone
          }}
        >
          <input
            ref={inputRef}
            id={id}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            className={cn(
              "w-full bg-black-50 border rounded-lg px-4 py-3 text-white placeholder-gray-500",
              "transition-all duration-300 outline-none min-h-[48px] text-base",
              "focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20",
              error ? "border-red-400" : "border-gold-400/20",
              showGeolocation && "pr-12"
            )}
          />
        </Autocomplete>
        {showGeolocation && (
          <button
            type="button"
            onClick={handleGeolocation}
            disabled={isGeolocating}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300 transition-colors disabled:opacity-50 z-10"
            aria-label="Utiliser ma position actuelle"
            title="Utiliser ma position"
          >
            {isGeolocating ? (
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : (
              <LocateFixed className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect, memo } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { useGoogleMaps, GoogleMapsPlaceholder, GoogleMapsLoader } from "./GoogleMapsProvider";

// Dark map style for premium look
const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1A1A1A" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1A1A1A" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#D4AF37" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2D2D2D" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#A3A3A3" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#D4AF37" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#A3A3A3" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1A1A1A" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6B6B6B" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2D2D2D" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1A1A1A" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3D3D3D" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#2D2D2D" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#D4AF37" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#A3A3A3" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#6B6B6B" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2D2D2D" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#D4AF37" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0A0A0A" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4D4D4D" }] },
];

// Route polyline style
const directionsOptions: google.maps.DirectionsRendererOptions = {
  suppressMarkers: true,
  polylineOptions: {
    strokeColor: "#D4AF37",
    strokeWeight: 4,
    strokeOpacity: 0.9,
  },
};

// Map container styles
const containerStyle = {
  width: "100%",
  height: "100%",
};

// Strasbourg center as default
const defaultCenter = {
  lat: 48.5734,
  lng: 7.7521,
};

interface RouteMapProps {
  origin?: {
    adresse: string;
    lat?: number;
    lng?: number;
  };
  destination?: {
    adresse: string;
    lat?: number;
    lng?: number;
  };
  className?: string;
}

function RouteMapComponent({ origin, destination, className }: RouteMapProps) {
  const { isLoaded, loadError, apiKeyMissing } = useGoogleMaps();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  // Calculate route when origin and destination change
  useEffect(() => {
    if (!isLoaded || !origin?.adresse || !destination?.adresse) {
      setDirections(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    setIsCalculating(true);

    // Use coordinates if available, otherwise use address
    const originLocation = origin.lat && origin.lng
      ? { lat: origin.lat, lng: origin.lng }
      : origin.adresse;

    const destinationLocation = destination.lat && destination.lng
      ? { lat: destination.lat, lng: destination.lng }
      : destination.adresse;

    directionsService.route(
      {
        origin: originLocation,
        destination: destinationLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        setIsCalculating(false);
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);

          // Fit bounds to show entire route
          if (mapRef && result.routes[0]?.bounds) {
            mapRef.fitBounds(result.routes[0].bounds, {
              top: 40,
              right: 40,
              bottom: 40,
              left: 40,
            });
          }
        } else {
          console.error("Directions request failed:", status);
          setDirections(null);
        }
      }
    );
  }, [isLoaded, origin?.adresse, origin?.lat, origin?.lng, destination?.adresse, destination?.lat, destination?.lng, mapRef]);

  // Show placeholder if Google Maps is not configured
  if (apiKeyMissing) {
    return (
      <div className={className}>
        <GoogleMapsPlaceholder message="La carte sera disponible une fois Google Maps configuré" />
      </div>
    );
  }

  // Show error if loading failed
  if (loadError) {
    return (
      <div className={className}>
        <GoogleMapsPlaceholder
          showError
          errorMessage="Impossible de charger Google Maps"
        />
      </div>
    );
  }

  // Show loader while Google Maps is loading
  if (!isLoaded) {
    return (
      <div className={className}>
        <GoogleMapsLoader />
      </div>
    );
  }

  // Calculate center and markers
  const originMarkerPosition = origin?.lat && origin?.lng
    ? { lat: origin.lat, lng: origin.lng }
    : null;

  const destinationMarkerPosition = destination?.lat && destination?.lng
    ? { lat: destination.lat, lng: destination.lng }
    : null;

  // Determine map center
  let mapCenter = defaultCenter;
  if (originMarkerPosition && destinationMarkerPosition) {
    mapCenter = {
      lat: (originMarkerPosition.lat + destinationMarkerPosition.lat) / 2,
      lng: (originMarkerPosition.lng + destinationMarkerPosition.lng) / 2,
    };
  } else if (originMarkerPosition) {
    mapCenter = originMarkerPosition;
  } else if (destinationMarkerPosition) {
    mapCenter = destinationMarkerPosition;
  }

  return (
    <div className={className}>
      <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gold-400/30">
        {isCalculating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <GoogleMapsLoader />
          </div>
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
          onLoad={onMapLoad}
          options={{
            styles: darkMapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            gestureHandling: "cooperative",
            backgroundColor: "#0A0A0A",
          }}
        >
          {/* Show route if available */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={directionsOptions}
            />
          )}

          {/* Origin marker (green/gold) */}
          {(originMarkerPosition || (directions && directions.routes[0]?.legs[0]?.start_location)) && (
            <Marker
              position={originMarkerPosition || directions!.routes[0].legs[0].start_location}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#22C55E",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
              }}
              title="Départ"
            />
          )}

          {/* Destination marker (red/gold) */}
          {(destinationMarkerPosition || (directions && directions.routes[0]?.legs[0]?.end_location)) && (
            <Marker
              position={destinationMarkerPosition || directions!.routes[0].legs[0].end_location}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#EF4444",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
              }}
              title="Arrivée"
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const RouteMap = memo(RouteMapComponent);

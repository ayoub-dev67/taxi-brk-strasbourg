// Types pour TAXI BRK

// Réservation
export interface ReservationData {
  // Étape 1: Adresses
  depart: {
    adresse: string;
    lat?: number;
    lng?: number;
    placeId?: string;
  };
  arrivee: {
    adresse: string;
    lat?: number;
    lng?: number;
    placeId?: string;
  };

  // Étape 2: Date/Heure
  date: Date;
  heure: string;

  // Étape 3: Options
  passagers: number;
  bagages: number;
  animaux: number;
  options: {
    siegeBebe: boolean;
    fauteuilRoulant: boolean;
    retourVide: boolean;
  };

  // Étape 4: Prix (calculé)
  distance?: number;
  duree?: number;
  prixEstime?: number;

  // Étape 5: Coordonnées
  client: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    commentaire?: string;
  };

  // Métadonnées
  id?: string;
  createdAt?: Date;
  status?: ReservationStatus;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

// Services
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
}

// Témoignages
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service?: string;
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// Contact Form
export interface ContactFormData {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
}

// Google Maps
export interface Location {
  lat: number;
  lng: number;
}

export interface RouteInfo {
  distance: {
    text: string;
    value: number; // mètres
  };
  duration: {
    text: string;
    value: number; // secondes
  };
  polyline: string;
}

// API Responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PriceCalculationResponse {
  success: boolean;
  data?: {
    tarifApplique: string;
    priseEnCharge: number;
    prixKm: number;
    distanceKm: number;
    montantDistance: number;
    supplements: {
      passagers: number;
      bagages: number;
      animaux: number;
      total: number;
    };
    sousTotal: number;
    total: number;
    estMinimum: boolean;
    details: string[];
  };
  error?: string;
}

// Navigation
export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavLink[];
}

// Booking Wizard
export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface BookingWizardState {
  currentStep: BookingStep;
  data: Partial<ReservationData>;
  isLoading: boolean;
  error?: string;
}

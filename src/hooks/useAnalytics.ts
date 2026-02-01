"use client";

import { useCallback } from "react";

// Types pour les événements
export type AnalyticsEvent =
  | "reservation_started"
  | "reservation_step_1"
  | "reservation_step_2"
  | "reservation_step_3"
  | "reservation_step_4"
  | "reservation_step_5"
  | "reservation_step_6"
  | "reservation_completed"
  | "phone_click"
  | "whatsapp_click"
  | "contact_form_submitted"
  | "cta_click"
  | "service_viewed"
  | "price_calculated";

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// Déclarations globales pour TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

// Fonction utilitaire pour tracker les événements GA4
export function trackEvent(eventName: AnalyticsEvent, params?: EventParams) {
  // Google Analytics 4 / GTM
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }

  // DataLayer pour GTM
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    // Mapper les événements aux événements Facebook standard
    const fbEventMap: Record<string, string> = {
      reservation_completed: "Lead",
      contact_form_submitted: "Contact",
      reservation_started: "InitiateCheckout",
      phone_click: "Contact",
      whatsapp_click: "Contact",
    };

    const fbEvent = fbEventMap[eventName];
    if (fbEvent) {
      window.fbq("track", fbEvent, params);
    } else {
      window.fbq("trackCustom", eventName, params);
    }
  }

  // Microsoft Clarity - tag l'événement
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("set", eventName, JSON.stringify(params || {}));
  }

  // Log en développement
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, params);
  }

  // Stocker en localStorage pour la page admin
  storeEventLocally(eventName, params);
}

// Stocker les événements en local pour la démo admin
function storeEventLocally(eventName: AnalyticsEvent, params?: EventParams) {
  if (typeof window === "undefined") return;

  try {
    const events = JSON.parse(localStorage.getItem("taxi_brk_events") || "[]");
    events.push({
      event: eventName,
      params,
      timestamp: new Date().toISOString(),
    });

    // Garder seulement les 100 derniers événements
    if (events.length > 100) {
      events.shift();
    }

    localStorage.setItem("taxi_brk_events", JSON.stringify(events));

    // Compteur spécifique pour les réservations
    if (eventName === "reservation_completed") {
      const reservations = JSON.parse(
        localStorage.getItem("taxi_brk_reservations") || "[]"
      );
      reservations.push({
        ...params,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("taxi_brk_reservations", JSON.stringify(reservations));
    }

    // Compteur spécifique pour les contacts
    if (eventName === "contact_form_submitted") {
      const contacts = JSON.parse(
        localStorage.getItem("taxi_brk_contacts") || "[]"
      );
      contacts.push({
        ...params,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("taxi_brk_contacts", JSON.stringify(contacts));
    }
  } catch {
    // Ignorer les erreurs de localStorage
  }
}

// Hook React pour utiliser les analytics
export function useAnalytics() {
  const track = useCallback(
    (eventName: AnalyticsEvent, params?: EventParams) => {
      trackEvent(eventName, params);
    },
    []
  );

  // Fonctions spécifiques pour les événements courants
  const trackReservationStarted = useCallback(() => {
    track("reservation_started");
  }, [track]);

  const trackReservationStep = useCallback(
    (step: number, stepName?: string) => {
      track(`reservation_step_${step}` as AnalyticsEvent, {
        step,
        step_name: stepName,
      });
    },
    [track]
  );

  const trackReservationCompleted = useCallback(
    (params?: { price?: number; distance?: string; service_type?: string }) => {
      track("reservation_completed", params);
    },
    [track]
  );

  const trackPhoneClick = useCallback(
    (location?: string) => {
      track("phone_click", { location });
    },
    [track]
  );

  const trackWhatsAppClick = useCallback(
    (location?: string) => {
      track("whatsapp_click", { location });
    },
    [track]
  );

  const trackContactFormSubmitted = useCallback(
    (params?: { subject?: string }) => {
      track("contact_form_submitted", params);
    },
    [track]
  );

  const trackCTAClick = useCallback(
    (ctaName: string, location?: string) => {
      track("cta_click", { cta_name: ctaName, location });
    },
    [track]
  );

  const trackServiceViewed = useCallback(
    (serviceName: string) => {
      track("service_viewed", { service_name: serviceName });
    },
    [track]
  );

  const trackPriceCalculated = useCallback(
    (params: { price: number; distance: string; duration: string }) => {
      track("price_calculated", params);
    },
    [track]
  );

  return {
    track,
    trackReservationStarted,
    trackReservationStep,
    trackReservationCompleted,
    trackPhoneClick,
    trackWhatsAppClick,
    trackContactFormSubmitted,
    trackCTAClick,
    trackServiceViewed,
    trackPriceCalculated,
  };
}

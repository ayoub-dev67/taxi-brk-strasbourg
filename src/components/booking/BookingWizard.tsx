"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingProgress } from "./BookingProgress";
import { Step1Address } from "./Step1Address";
import { Step2DateTime } from "./Step2DateTime";
import { Step3Options } from "./Step3Options";
import { Step4Price } from "./Step4Price";
import { Step5Form } from "./Step5Form";
import { Step6Confirm } from "./Step6Confirm";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { ReservationData, BookingStep } from "@/types";

const initialData: Partial<ReservationData> = {
  depart: { adresse: "" },
  arrivee: { adresse: "" },
  date: new Date(),
  heure: "09:00",
  passagers: 1,
  bagages: 0,
  animaux: 0,
  options: {
    siegeBebe: false,
    fauteuilRoulant: false,
    retourVide: false,
  },
  client: {
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    commentaire: "",
  },
};

const stepNames = ["Adresses", "Date/Heure", "Options", "Prix", "Coordonnées", "Confirmation"];

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [data, setData] = useState<Partial<ReservationData>>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { trackReservationStarted, trackReservationStep, trackReservationCompleted } = useAnalytics();
  const hasTrackedStart = useRef(false);

  // Track reservation started on mount
  useEffect(() => {
    if (!hasTrackedStart.current) {
      trackReservationStarted();
      hasTrackedStart.current = true;
    }
  }, [trackReservationStarted]);

  const updateData = (newData: Partial<ReservationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      const nextStepNum = currentStep + 1;
      trackReservationStep(nextStepNum, stepNames[nextStepNum - 1]);
      setCurrentStep(nextStepNum as BookingStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const goToStep = (step: BookingStep) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Envoyer la réservation
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la réservation");
      }

      // Track completed reservation
      trackReservationCompleted({
        price: data.prixEstime,
        distance: data.distance ? `${data.distance} km` : undefined,
        service_type: data.options?.siegeBebe ? "avec_siege_bebe" : "standard",
      });

      setIsComplete(true);
      setCurrentStep(6);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stepComponents = {
    1: (
      <Step1Address
        data={data}
        updateData={updateData}
        onNext={nextStep}
      />
    ),
    2: (
      <Step2DateTime
        data={data}
        updateData={updateData}
        onNext={nextStep}
        onPrev={prevStep}
      />
    ),
    3: (
      <Step3Options
        data={data}
        updateData={updateData}
        onNext={nextStep}
        onPrev={prevStep}
      />
    ),
    4: (
      <Step4Price
        data={data}
        updateData={updateData}
        onNext={nextStep}
        onPrev={prevStep}
      />
    ),
    5: (
      <Step5Form
        data={data}
        updateData={updateData}
        onSubmit={handleSubmit}
        onPrev={prevStep}
        isLoading={isLoading}
      />
    ),
    6: <Step6Confirm data={data} />,
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      {!isComplete && (
        <BookingProgress
          currentStep={currentStep}
          onStepClick={goToStep}
        />
      )}

      {/* Step Content */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

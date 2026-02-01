"use client";

import { Check, MapPin, Calendar, Settings, CreditCard, User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingStep } from "@/types";

const steps = [
  { number: 1, label: "Trajet", icon: MapPin },
  { number: 2, label: "Date", icon: Calendar },
  { number: 3, label: "Options", icon: Settings },
  { number: 4, label: "Prix", icon: CreditCard },
  { number: 5, label: "Infos", icon: User },
  { number: 6, label: "Confirmation", icon: CheckCircle },
];

interface BookingProgressProps {
  currentStep: BookingStep;
  onStepClick: (step: BookingStep) => void;
}

export function BookingProgress({ currentStep, onStepClick }: BookingProgressProps) {
  return (
    <div className="relative">
      {/* Mobile: Simple text indicator */}
      <div className="sm:hidden text-center mb-4">
        <span className="text-gold-400 font-medium">
          Étape {currentStep} sur 5
        </span>
        <p className="text-white text-lg font-semibold mt-1">
          {steps[currentStep - 1].label}
        </p>
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-black-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Full progress steps */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.slice(0, 5).map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isClickable = step.number < currentStep;
            const Icon = step.icon;

            return (
              <div key={step.number} className="flex items-center">
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && onStepClick(step.number as BookingStep)}
                  disabled={!isClickable}
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    isCompleted && "bg-gold-400 text-black cursor-pointer",
                    isCurrent && "bg-gold-400/20 border-2 border-gold-400 text-gold-400",
                    !isCompleted && !isCurrent && "bg-black-100 text-gray-500",
                    isClickable && "hover:scale-110"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </button>

                {/* Connector Line */}
                {index < 4 && (
                  <div className="flex-1 h-0.5 mx-2 min-w-[40px]">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        currentStep > step.number
                          ? "bg-gold-400"
                          : "bg-black-100"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Labels */}
        <div className="flex items-center justify-between mt-2">
          {steps.slice(0, 5).map((step) => {
            const isCurrent = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div
                key={step.number}
                className={cn(
                  "text-xs font-medium text-center min-w-[60px]",
                  isCurrent && "text-gold-400",
                  isCompleted && "text-white",
                  !isCurrent && !isCompleted && "text-gray-500"
                )}
              >
                {step.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

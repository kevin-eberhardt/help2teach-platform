import { SeatingPlanElementType } from "@/lib/types/seating-plan";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SeatingPlanContextType {
  selectedElement: SeatingPlanElementType | undefined;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<SeatingPlanElementType | undefined>
  >;
  elementToDelete: SeatingPlanElementType | undefined;
  setElementToDelete: React.Dispatch<
    React.SetStateAction<SeatingPlanElementType | undefined>
  >;
}

export const SeatingPlanContext = createContext<SeatingPlanContextType | null>(
  null
);

interface SeatingPlanProviderProps {
  children: ReactNode;
}

function SeatingPlanProvider({ children }: SeatingPlanProviderProps) {
  const [selectedElement, setSelectedElement] =
    useState<SeatingPlanElementType>();
  const [elementToDelete, setElementToDelete] =
    useState<SeatingPlanElementType>();
  return (
    <SeatingPlanContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        elementToDelete,
        setElementToDelete,
      }}
    >
      {children}
    </SeatingPlanContext.Provider>
  );
}

const useSeatingPlan = (): SeatingPlanContextType => {
  const context = useContext(SeatingPlanContext);
  if (!context) {
    throw new Error("useSeatingPlan must be used within a SeatingPlanProvider");
  }
  return context;
};

export { SeatingPlanProvider, useSeatingPlan };

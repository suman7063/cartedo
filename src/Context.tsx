// ButtonContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ButtonContextType {
  visibleButtonIndices: string[];
  setVisibleButtonIndices: (index: string) => void;
}

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with indices from local storage or default to an empty array
  const [visibleButtonIndices, setVisibleButtonIndices] = useState<string[]>(() => {
    if (typeof window !== "undefined" && window.localStorage){
    const savedIndices = localStorage.getItem('visibleButtonIndices');
    return savedIndices ? JSON.parse(savedIndices) : [];
    }
  });

  // Update state with the new index
  const updateVisibleButtonIndices = (index: string) => {
    setVisibleButtonIndices(prevIndices => {
      const newIndices = prevIndices.includes(index) 
        ? prevIndices.filter(i => i !== index) 
        : [...prevIndices, index];
        
      localStorage.setItem('visibleButtonIndices', JSON.stringify(newIndices));
      return newIndices;
    });
  };

  return (
    <ButtonContext.Provider value={{ visibleButtonIndices, setVisibleButtonIndices: updateVisibleButtonIndices }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (context === undefined) {
    throw new Error('useButtonContext must be used within a ButtonProvider');
  }
  return context;
};

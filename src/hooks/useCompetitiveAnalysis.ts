/**
 * Hook personalizado para análisis competitivo de precios
 * Centraliza toda la lógica de cálculo y análisis que estaba duplicada
 */

import { useMemo } from 'react';
import type { ComparisonTableRow } from '../interfaces';
import {
  PriceData,
  CompetitiveAnalysis,
  performCompetitiveAnalysis,
  calculatePriceStatistics,
  formatPrice,
  formatPercentage,
  formatPercentageWithIndicator
} from '../utils/priceCalculations';

export interface UseCompetitiveAnalysisReturn {
  myBrand: string;
  myPrice: number;
  allPrices: PriceData[];
  analysis: CompetitiveAnalysis;
  statistics: {
    average: number;
    min: number;
    max: number;
    count: number;
  };
  formatPrice: (price: number | null) => string;
  formatPercentage: (percentage: number) => string;
  formatPercentageWithIndicator: (percentage: number) => string;
}

export const useCompetitiveAnalysis = (
  item: ComparisonTableRow,
  competidores: string[]
): UseCompetitiveAnalysisReturn => {
  const basicData = useMemo(() => {
    const myBrand = competidores[0];
    const myPrice = item.precios?.[myBrand] ?? 0;
    const allPrices = competidores.map(comp => ({
      label: comp,
      value: item.precios?.[comp] ?? null
    }));
    return { myBrand, myPrice, allPrices };
  }, [item, competidores]);

  const analysis = useMemo(() => {
    return performCompetitiveAnalysis(basicData.allPrices, basicData.myBrand);
  }, [basicData.allPrices, basicData.myBrand]);

  const statistics = useMemo(() => {
    return calculatePriceStatistics(basicData.allPrices);
  }, [basicData.allPrices]);

  return {
    ...basicData,
    analysis,
    statistics,
    formatPrice,
    formatPercentage,
    formatPercentageWithIndicator
  };
};
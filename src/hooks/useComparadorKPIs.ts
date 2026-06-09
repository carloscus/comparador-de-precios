import { useMemo } from 'react';
import type { ComparisonTableRow } from '../interfaces';

interface DashboardKPIs {
  cheapestProduct: ComparisonTableRow;
  mostExpensiveProduct: ComparisonTableRow;
  cheapestBrand: { brand: string; avg: number; stdDev: number; cv: number };
  mostExpensiveBrand: { brand: string; avg: number; stdDev: number; cv: number };
  mostVariableBrand: { brand: string; avg: number; stdDev: number; cv: number };
  brandRanking: { brand: string; avg: number; stdDev: number; cv: number }[];
  averageRanking: number;
  priceWins: number;
  priceWinRate: number;
}

const calculateStdDev = (values: number[]) => {
  if (values.length < 2) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
};

export const useComparadorKPIs = (
  dataConPorcentajes: ComparisonTableRow[],
  competidores: string[]
): DashboardKPIs | null => {
  return useMemo(() => {
    const dataWithRank = dataConPorcentajes.map(p => {
      const prices = competidores
        .map(c => p.precios?.[c] ?? 0)
        .filter(price => price > 0)
        .sort((a, b) => a - b);
      const basePrice = p.precios?.[competidores[0]] ?? 0;
      if (basePrice <= 0) return { ...p, rank: undefined };
      const rank = prices.indexOf(basePrice) + 1;
      return { ...p, rank: rank > 0 ? rank : undefined };
    });

    if (dataWithRank.length === 0) return null;

    const productsWithAvg = dataWithRank.filter(p => (p.precio_promedio ?? 0) > 0);
    if (productsWithAvg.length === 0) return null;

    const cheapestProduct = productsWithAvg.reduce((min, p) => (p.precio_promedio ?? 0) < (min.precio_promedio ?? 0) ? p : min);
    const mostExpensiveProduct = productsWithAvg.reduce((max, p) => (p.precio_promedio ?? 0) > (max.precio_promedio ?? 0) ? p : max);

    const brandAverages: { [key: string]: number[] } = {};
    competidores.forEach(brand => {
      brandAverages[brand] = dataWithRank.map(p => p.precios?.[brand] || 0).filter(price => price > 0);
    });

    const brandAvgPrices = competidores.map(brand => {
      const prices = brandAverages[brand];
      const avg = prices.length > 0 ? prices.reduce((sum, p) => sum + p, 0) / prices.length : 0;
      const stdDev = calculateStdDev(prices);
      const cv = avg > 0 ? (stdDev / avg) * 100 : 0;
      return { brand, avg, stdDev, cv };
    }).filter(b => b.avg > 0).sort((a, b) => a.avg - b.avg);

    const cheapestBrand = brandAvgPrices.length > 0 ? brandAvgPrices[0] : { brand: 'N/A', avg: 0, stdDev: 0, cv: 0 };
    const mostExpensiveBrand = brandAvgPrices.length > 0 ? brandAvgPrices[brandAvgPrices.length - 1] : { brand: 'N/A', avg: 0, stdDev: 0, cv: 0 };
    const mostVariableBrand = brandAvgPrices.length > 0 ? brandAvgPrices.reduce((max, b) => b.cv > max.cv ? b : max) : { brand: 'N/A', avg: 0, stdDev: 0, cv: 0 };

    const baseBrandRanks = dataWithRank.map(p => p.rank).filter((r): r is number => r !== undefined);
    const averageRanking = baseBrandRanks.length > 0 ? baseBrandRanks.reduce((sum, r) => sum + r, 0) / baseBrandRanks.length : 0;

    const priceWins = dataWithRank.filter(p => p.rank === 1).length;
    const priceWinRate = dataWithRank.length > 0 ? (priceWins / dataWithRank.length) * 100 : 0;

    return {
      cheapestProduct,
      mostExpensiveProduct,
      cheapestBrand,
      mostExpensiveBrand,
      mostVariableBrand,
      brandRanking: brandAvgPrices,
      averageRanking,
      priceWins,
      priceWinRate
    };
  }, [dataConPorcentajes, competidores]);
};

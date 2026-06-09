// src/utils/calculationUtils.ts

/**
 * @file calculationUtils.ts
 * @description Utilidades centralizadas para cálculos de márgenes y ranking.
 * @author Carlos Cusi
 * @date 2026-06-05
 */

export const calculateMargin = (costo: number | null, precio: number | null): number | null => {
  if (costo === null || precio === null || precio === 0) return null;
  return ((precio - costo) / precio) * 100;
};

export const calculateRanking = (miPrecio: number | null, preciosCompetencia: Record<string, number | null>): number | null => {
  if (miPrecio === null) return null;
  const prices: number[] = [miPrecio];
  Object.values(preciosCompetencia).forEach(p => {
    if (p !== null && p !== undefined) prices.push(p);
  });
  prices.sort((a, b) => a - b);
  const rank = prices.indexOf(miPrecio) + 1;
  return rank > 0 ? rank : null; // Retorna null si miPrecio no se encuentra o es inválido
};

// Función para calcular todos los datos derivados de márgenes
export const calculateDerivedMarginData = (
  costo: number | null,
  precioTienda: number | null,
  preciosCompetencia: Record<string, number | null>,
  prop1Precio: number | null,
  prop2Costo: number | null,
  prop2Precio: number | null,
) => {
  const margenActual = calculateMargin(costo, precioTienda);
  const gananciaActual = costo !== null && precioTienda !== null ? precioTienda - costo : null;
  const rankingActual = calculateRanking(precioTienda, preciosCompetencia);

  const prop1Margen = calculateMargin(costo, prop1Precio);
  const prop1Ganancia = costo !== null && prop1Precio !== null ? prop1Precio - costo : null;
  const prop1Ranking = calculateRanking(prop1Precio, preciosCompetencia);

  const prop2Margen = calculateMargin(prop2Costo, prop2Precio);
  const prop2Ganancia = prop2Costo !== null && prop2Precio !== null ? prop2Precio - prop2Costo : null;
  const prop2DifCosto = prop2Costo !== null && costo !== null ? prop2Costo - costo : null;
  const prop2DifCostoPct = prop2Costo !== null && costo !== null && costo !== 0
    ? ((prop2Costo - costo) / costo) * 100 : null;
  const prop2Ranking = calculateRanking(prop2Precio, preciosCompetencia);

  return {
    margenActual, gananciaActual, rankingActual,
    prop1Margen, prop1Ganancia, prop1Ranking,
    prop2Margen, prop2Ganancia, prop2DifCosto, prop2DifCostoPct, prop2Ranking,
  };
};
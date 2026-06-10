import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IProducto } from '../interfaces';

import { calculateDerivedMarginData } from '../utils/calculationUtils'; // Import the new centralized function
export interface PropuestaP2 {
  p2Costo: number;
  p2Precio: number;
  cantidadMinima: number; // <-- NUEVO: Campo obligatorio para reforzar la propuesta
}

export interface SkuSimulation {
  codigo: string;
  p1Precio: number;
  p2: PropuestaP2; // Estructura actualizada
}

export interface MarginProduct {
  codigo: string;
  nombre: string;
  linea: string;
  costo: number | null;
  precioTienda: number | null;
  preciosCompetencia: Record<string, number | null>;
  margenActual: number | null;
  gananciaActual: number | null;
  rankingActual: number | null;
  prop1Precio: number | null;
  prop1Margen: number | null;
  prop1Ganancia: number | null;
  prop1Ranking: number | null;
  prop2Costo: number | null;
  prop2Precio: number | null;
  prop2CantidadMinima: number | null; // <-- NUEVO: Campo de cantidad mínima
  prop2Margen: number | null;
  prop2Ganancia: number | null;
  prop2DifCosto: number | null;
  prop2DifCostoPct: number | null;
  prop2Ranking: number | null;
}

export interface MarginClient {
  nombre: string;
  documento: string;
  ruc?: string;
  codigoCliente?: string;
}

type CampoEditable = 'costo' | 'precioTienda' | 'prop1Precio' | 'prop2Costo' | 'prop2Precio' | 'prop2CantidadMinima';

interface MarginState {
  productos: MarginProduct[];
  cliente: MarginClient;
  agregarProducto: (producto: IProducto) => void;
  agregarProductoConCosto: (
    producto: IProducto,
    costo: number | null,
    precioTienda?: number | null,
    preciosCompetencia?: Record<string, number | null>,
    prop1Precio?: number | null,
    prop2Costo?: number | null,
    prop2Precio?: number | null,
    prop2CantidadMinima?: number | null,
  ) => void;
  actualizarOAgregar: (
    producto: IProducto,
    costo: number | null,
    precioTienda?: number | null,
    preciosCompetencia?: Record<string, number | null>,
    prop1Precio?: number | null,
    prop2Costo?: number | null,
    prop2Precio?: number | null,
    prop2CantidadMinima?: number | null,
  ) => void;
  actualizarCampo: (codigo: string, campo: CampoEditable, valor: number | null) => void;
  eliminarProducto: (codigo: string) => void;
  limpiarTodo: () => void;
  setCliente: (cliente: MarginClient) => void;
  limpiarCliente: () => void;
}

const crearProductoBase = (
  producto: IProducto,
  costo: number | null,
  precioTienda: number | null,
  preciosCompetencia: Record<string, number | null>,
  prop1Precio: number | null,
  prop2Costo: number | null,
  prop2Precio: number | null,
  prop2CantidadMinima: number | null,
): MarginProduct => { // Use the centralized function
  const derivados = calculateDerivedMarginData(costo, precioTienda, preciosCompetencia, prop1Precio, prop2Costo, prop2Precio);
  return {
    codigo: producto.codigo,
    nombre: producto.nombre,
    linea: producto.linea ?? '',
    costo,
    precioTienda,
    preciosCompetencia,
    prop1Precio,
    prop2Costo,
    prop2Precio,
    prop2CantidadMinima,
    ...derivados,
  };
};

function migrateLegacyProduct(p: Record<string, unknown>): MarginProduct {
  const costo = (p.costo as number | null) ?? null;
  const precioTienda = (p.precio as number | null) ?? (p.precioTienda as number | null) ?? null;
  const preciosCompetencia = (p.preciosCompetencia as Record<string, number | null>) ?? {};
  const prop1Precio = (p.prop1Precio as number | null) ?? (p.precioSugerido as number | null) ?? null;
  const prop2Costo = (p.prop2Costo as number | null) ?? (p.costoSugerido as number | null) ?? null;
  const prop2Precio = (p.prop2Precio as number | null) ?? null;
  const prop2CantidadMinima = (p.prop2CantidadMinima as number | null) ?? null;
  const derivados = calculateDerivedMarginData(costo, precioTienda, preciosCompetencia, prop1Precio, prop2Costo, prop2Precio);
  return {
    codigo: (p.codigo as string) ?? '',
    nombre: (p.nombre as string) ?? '',
    linea: (p.linea as string) ?? '',
    costo,
    precioTienda,
    preciosCompetencia,
    prop1Precio,
    prop2Costo,
    prop2Precio,
    prop2CantidadMinima,
    ...derivados,
  };
}

const migrateLegacyProducts = (productos: unknown[]): MarginProduct[] => {
  return productos.map((p) => {
    const raw = p as Record<string, unknown>;
    if ('prop1Precio' in raw && 'prop2CantidadMinima' in raw) return raw as unknown as MarginProduct;
    return migrateLegacyProduct(raw);
  });
};

const initialClient: MarginClient = {
  nombre: '',
  documento: '',
  ruc: '',
};

export const useMarginStore = create<MarginState>()(
  persist(
    (set, get) => ({
      productos: [],
      cliente: initialClient,

      agregarProducto: (producto: IProducto) => {
        const productosActuales = get().productos;
        const existe = productosActuales.find((p) => p.codigo === producto.codigo);
        if (existe) return;

        const nuevoProducto = crearProductoBase(
          producto,
          producto.precio_referencial ?? null,
          null,
          {},
          null,
          null,
          null,
          null,
        );

        set((state) => ({ productos: [...state.productos, nuevoProducto] }));
      },

      agregarProductoConCosto: (
        producto: IProducto,
        costo: number | null,
        precioTienda?: number | null,
        preciosCompetencia?: Record<string, number | null>,
        prop1Precio?: number | null,
        prop2Costo?: number | null,
        prop2Precio?: number | null,
        prop2CantidadMinima?: number | null,
      ) => {
        const productosActuales = get().productos;
        const existe = productosActuales.find((p) => p.codigo === producto.codigo);
        if (existe) return;

        const nuevoProducto = crearProductoBase(
          producto,
          costo,
          precioTienda ?? null,
          preciosCompetencia ?? {},
          prop1Precio ?? null,
          prop2Costo ?? null,
          prop2Precio ?? null,
          prop2CantidadMinima ?? null,
        );

        set((state) => ({ productos: [...state.productos, nuevoProducto] }));
      },

      actualizarOAgregar: (
        producto: IProducto,
        costo: number | null,
        precioTienda?: number | null,
        preciosCompetencia?: Record<string, number | null>,
        prop1Precio?: number | null,
        prop2Costo?: number | null,
        prop2Precio?: number | null,
        prop2CantidadMinima?: number | null,
      ) => {
        const pt = precioTienda ?? null;
        const pc = preciosCompetencia ?? {};
        const p1 = prop1Precio ?? null;
        const p2c = prop2Costo ?? null;
        const p2p = prop2Precio ?? null;
        const p2cm = prop2CantidadMinima ?? null;
        const productosActuales = get().productos;
        const existe = productosActuales.find((p) => p.codigo === producto.codigo);

        if (existe) {
          const actualizado: MarginProduct = {
            ...existe,
            nombre: producto.nombre,
            linea: producto.linea ?? existe.linea,
            costo,
            precioTienda: pt,
            preciosCompetencia: pc,
            prop1Precio: p1,
            prop2Costo: p2c,
            prop2Precio: p2p,
            prop2CantidadMinima: p2cm,
            ...calculateDerivedMarginData(costo, pt, pc, p1, p2c, p2p), // Use the centralized function
          };
          set((state) => ({
            productos: state.productos.map((p) => p.codigo === producto.codigo ? actualizado : p),
          }));
        } else {
          const nuevoProducto = crearProductoBase(producto, costo, pt, pc, p1, p2c, p2p, p2cm);
          set((state) => ({ productos: [...state.productos, nuevoProducto] }));
        }
      },

      actualizarCampo: (codigo, campo, valor) => {
        set((state) => ({
          productos: state.productos.map((p) => {
            if (p.codigo !== codigo) return p;
            const actualizado = { ...p, [campo]: valor }; // Update the field first
            const derivados = calculateDerivedMarginData( // Then recalculate derived data
              actualizado.costo,
              actualizado.precioTienda,
              actualizado.preciosCompetencia,
              actualizado.prop1Precio,
              actualizado.prop2Costo,
              actualizado.prop2Precio,
            );
            return { ...actualizado, ...derivados };
          }),
        }));
      },

      eliminarProducto: (codigo) => {
        set((state) => ({ productos: state.productos.filter((p) => p.codigo !== codigo) }));
      },

      limpiarTodo: () => {
        set({ productos: [] });
      },

      setCliente: (cliente) => {
        set({ cliente });
      },

      limpiarCliente: () => {
        set({ cliente: initialClient });
      },
    }),
    {
      name: 'margin-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        productos: state.productos,
        cliente: state.cliente,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<MarginState>;
        return {
          ...currentState,
          ...persisted,
          productos: persisted.productos
            ? migrateLegacyProducts(persisted.productos as unknown[])
            : currentState.productos,
        };
      },
    },
  ),
);

import React from 'react';
import type { ComparisonTableRow } from '../../interfaces';
import { Modal } from '../ui';
import PricePieChart from './PricePieChart';

interface ProductPieChartModalProps {
  product: ComparisonTableRow | null;
  competidores: string[];
  onClose: () => void;
}

export const ProductPieChartModal: React.FC<ProductPieChartModalProps> = ({ product, competidores, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={!!product}
      onClose={onClose}
      title={`Gráfico de Precios - ${product.nombre || ''}`}
      size="lg"
      aria-describedby="pie-chart-instruction"
    >
      <div id="pie-chart-instruction" className="sr-only">
        Gráfico circular interactivo de distribución de precios. Use las teclas de flecha para navegar por las porciones.
      </div>
      <PricePieChart
        data={competidores.map(comp => ({
          name: comp,
          value: product.precios?.[comp] ?? 0
        })).filter(item => item.value > 0)}
        title={`Distribución de Precios para ${product.nombre}`}
        aria-label={`Gráfico circular de distribución de precios para ${product.nombre}`}
      />
    </Modal>
  );
};

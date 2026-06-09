import React, { useState, useCallback, useRef } from 'react';
import type { ComparisonTableRow } from '../../interfaces';
import { PrintReport } from './PrintReport';
import { Button } from '../ui/Button';

interface PrintButtonProps {
  products: ComparisonTableRow[];
  competidores: string[];
  datosGenerales: {
    fecha: string;
    usuario: string;
    tienda: string;
    supervisor: string;
    supervisor2: string;
    supervisor3: string;
  };
  className?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  products,
  competidores,
  datosGenerales,
  className
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const handlePrint = useCallback(() => {
    if (!products || products.length === 0) return;
    if (!competidores || competidores.length === 0) return;
    setIsPrinting(true);
  }, [products, competidores]);

  const handleAfterPrint = useCallback(() => {
    document.body.classList.remove('print-mode');
    const container = document.getElementById('print-container');
    if (container) container.remove();
    setIsPrinting(false);
  }, []);

  React.useEffect(() => {
    if (!isPrinting) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'print-styles';
    styleEl.textContent = `
      @media print {
        body * { visibility: hidden; }
        #print-container, #print-container * { visibility: visible; }
        #print-container { position: absolute; top: 0; left: 0; width: 100%; }
        .print-controls { display: none !important; }
      }
      .spinner { display: inline-block; animation: spin 1s linear infinite; }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(styleEl);
    styleRef.current = styleEl;

    const container = document.createElement('div');
    container.id = 'print-container';
    document.body.appendChild(container);

    document.body.classList.add('print-mode');

    const timer = setTimeout(() => {
      window.print();
      handleAfterPrint();
    }, 200);

    return () => {
      clearTimeout(timer);
      handleAfterPrint();
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [isPrinting, handleAfterPrint]);

  React.useEffect(() => {
    const onAfterPrint = () => handleAfterPrint();
    window.addEventListener('afterprint', onAfterPrint);
    return () => window.removeEventListener('afterprint', onAfterPrint);
  }, [handleAfterPrint]);

  return (
    <>
      <div className={`print-controls ${className || ''}`}>
        <Button
          onClick={handlePrint}
          disabled={isPrinting}
          size="md"
        >
          {isPrinting ? (
            <>
              <span className="spinner" style={{ marginRight: 8 }}>&#10227;</span>
              Preparando...
            </>
          ) : (
            'Imprimir Reporte'
          )}
        </Button>
      </div>

      {isPrinting && (
        <div>
          <PrintReport
            products={products}
            competidores={competidores}
            datosGenerales={datosGenerales}
          />
        </div>
      )}
    </>
  );
};

export default PrintButton;
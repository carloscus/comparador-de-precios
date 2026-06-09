import React from 'react';
import { Package, Plus } from 'lucide-react';

interface NoSearchResultsProps {
  searchTerm: string;
  showAddManual?: boolean;
  onAddManual?: () => void;
}

export const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  searchTerm,
  showAddManual,
  onAddManual,
}) => (
  <div className="absolute z-50 top-full left-0 right-0 mt-2 animate-fade-in">
    <div className="glass-card p-6 text-center">
      <div className="w-14 h-14 mx-auto bg-[var(--bg-tertiary)] rounded-2xl flex items-center justify-center mb-4">
        <Package className="w-7 h-7 text-[var(--text-tertiary)]" />
      </div>
      <p className="text-[var(--text-primary)] font-medium mb-1">
        Sin resultados para <span className="font-bold text-[var(--color-primary-500)]">&ldquo;{searchTerm}&rdquo;</span>
      </p>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        No encontramos productos que coincidan con tu búsqueda.
      </p>
      {showAddManual && onAddManual && (
        <button
          onClick={onAddManual}
          className="btn btn-primary text-sm mx-auto"
        >
          <Plus className="w-4 h-4" />
          Agregar Manualmente
        </button>
      )}
    </div>
  </div>
);

export default NoSearchResults;
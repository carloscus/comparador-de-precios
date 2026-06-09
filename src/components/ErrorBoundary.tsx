import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'var(--bg-primary, #0f172a)',
          color: 'var(--text-primary, #f1f5f9)',
        }}>
          <div style={{
            background: 'var(--surface-elevated, #1e293b)',
            border: '1px solid var(--border-primary, rgba(148,163,184,0.3))',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '480px',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary, #f1f5f9)' }}>
              Error inesperado
            </h2>
            <p style={{ color: 'var(--text-secondary, #cbd5e1)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Ocurrió un error en la aplicación. Por favor, intente recargar la página.
            </p>
            <details style={{ marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.75rem' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--text-secondary, #cbd5e1)' }}>
                Detalles del error
              </summary>
              <pre style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                background: 'var(--bg-tertiary, #334155)',
                borderRadius: '8px',
                overflow: 'auto',
                color: 'var(--color-danger, #f87171)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {this.state.error?.message}
                {this.state.error?.stack}
              </pre>
            </details>
            <button
              onClick={this.handleReset}
              style={{
                background: 'var(--color-primary, #00a86b)',
                color: 'var(--color-btn-primary-text, #ffffff)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.625rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

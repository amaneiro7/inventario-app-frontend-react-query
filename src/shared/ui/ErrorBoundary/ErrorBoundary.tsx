import React, { Component, type ErrorInfo, type ReactNode } from 'react';

// Definimos las props que nuestro ErrorBoundary aceptará
interface Props {
  children?: ReactNode; // Los componentes hijos que este límite protegerá
  fallback?: ReactNode; // La UI que se mostrará si ocurre un error
}

// Definimos el estado interno del componente
interface State {
  hasError: boolean;
}

/**
 * `ErrorBoundary`
 * @class
 * @description Un componente de clase que captura errores de JavaScript en sus componentes hijos,
 * registra esos errores y muestra una UI de fallback en lugar del árbol de componentes que se rompió.
 */
export class ErrorBoundary extends Component<Props, State> {
  // El estado inicial indica que no hay error
  public state: State = {
    hasError: false,
  };

  /**
   * Este método estático se llama después de que un descendiente lanza un error.
   * Su trabajo es actualizar el estado para que el siguiente renderizado muestre la UI de fallback.
   * @param {Error} _ - El error lanzado.
   * @returns {State} Un objeto de estado actualizado.
   */
  public static getDerivedStateFromError(_: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
    return { hasError: true };
  }

  /**
   * Este método se llama después de que un descendiente lanza un error.
   * Es el lugar ideal para efectos secundarios, como registrar el error en un servicio externo.
   * @param {Error} error - El error que fue lanzado.
   * @param {ErrorInfo} errorInfo - Un objeto con información sobre qué componente lanzó el error.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Aquí puedes registrar el error en un servicio como Sentry, LogRocket, etc.
    // Por ahora, lo mostraremos en la consola.
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
  }

  public render() {
    // Si el estado indica que hay un error, renderizamos la UI de fallback.
    if (this.state.hasError) {
      // Puedes pasar un componente de fallback personalizado a través de las props,
      // o tener uno por defecto.
      return this.props.fallback || <h1>Algo salió mal.</h1>;
    }

    // Si no hay error, simplemente renderizamos los componentes hijos.
    return this.props.children;
  }
}

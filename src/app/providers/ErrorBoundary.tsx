import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorPage from '@/pages/500'

/**
 * @interface ErrorBoundaryProps
 * @property {ReactNode} children - Los componentes hijos que serán protegidos por este Error Boundary.
 */
interface Props {
	children?: ReactNode
}

/**
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Indica si se ha capturado un error en el árbol de componentes.
 */
interface State {
	hasError: boolean
}

/**
 * `ErrorBoundary`
 * @class
 * @extends {Component<Props, State>}
 * @description Componente de React que captura errores de JavaScript en cualquier parte de su árbol de componentes hijo,
 * los registra y muestra una UI de fallback en lugar del componente que falló.
 * Implementa el patrón Error Boundary de React.
 */
export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	/**
	 * `getDerivedStateFromError`
	 * @static
	 * @description Método de ciclo de vida que se invoca después de que un componente hijo ha lanzado un error.
	 * Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
	 * @param {Error} _error - El error que ha sido lanzado.
	 * @returns {State} Un objeto para actualizar el estado del componente.
	 */ public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	/**
	 * `componentDidCatch`
	 * @description Método de ciclo de vida que se invoca después de que un componente ha lanzado un error.
	 * Es útil para registrar información de errores en un servicio de análisis.
	 * @param {Error} error - El error que ha sido capturado.
	 * @param {ErrorInfo} errorInfo - Un objeto con información sobre el componente que lanzó el error.
	 */ public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// En un entorno real, enviarías esto a un servicio de logging
		// Ejemplo: logErrorToMyService(error, errorInfo.componentStack);
		console.error('Uncaught error:', error, errorInfo)
	}

	/**
	 * `handleReset`
	 * @private
	 * @description Resetea el estado del ErrorBoundary para intentar renderizar de nuevo.
	 * Se pasa como prop al componente de fallback.
	 */ private readonly handleReset = () => {
		this.setState({ hasError: false })
	}

	/**
	 * `render`
	 * @description Renderiza la UI del componente.
	 * Si `hasError` es `true`, muestra la UI de fallback (`ErrorPage`); de lo contrario, renderiza los componentes hijos.
	 * @returns {ReactNode} La UI a renderizar.
	 */ public render(): ReactNode {
		if (this.state.hasError) {
			// Envuelve el componente lazy-loaded en Suspense
			return <ErrorPage onReset={this.handleReset} />
		}

		return this.props.children
	}
}

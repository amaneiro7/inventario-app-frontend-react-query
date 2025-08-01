import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react'

// Asumimos que ErrorPage ahora acepta una prop `onReset`
const ErrorPage = lazy(async () => import('@/pages/500'))

interface Props {
	children?: ReactNode
}

interface State {
	hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// En un entorno real, enviarías esto a un servicio de logging
		// Ejemplo: logErrorToMyService(error, errorInfo.componentStack);
		console.error('Uncaught error:', error, errorInfo)
	}

	/**
	 * @description Resetea el estado del ErrorBoundary para intentar renderizar de nuevo.
	 * Se pasa como prop al componente de fallback.
	 */
	private readonly handleReset = () => {
		this.setState({ hasError: false })
	}

	public render() {
		if (this.state.hasError) {
			// Envuelve el componente lazy-loaded en Suspense
			return (
				<Suspense fallback={<div>Cargando...</div>}>
					{/* @ts-ignore */}
					<ErrorPage onReset={this.handleReset} />
				</Suspense>
			)
		}

		return this.props.children
	}
}

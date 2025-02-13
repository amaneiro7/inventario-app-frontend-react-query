import { Component, lazy, type ErrorInfo, type ReactNode } from 'react'
const ErrorPage = lazy(async () => import('./pages/500'))

interface Props {
	children?: ReactNode
}
interface State {
	hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// You can also log the error to an error reporting service
		console.error('error: ', error)
		console.error('errorInfo: ', JSON.stringify(errorInfo))
		console.error('componentStack: ', errorInfo.componentStack)
	}

	public render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <ErrorPage />
		}

		return this.props.children
	}
}

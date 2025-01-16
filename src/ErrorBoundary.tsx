import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorPage from './pages/500'


interface Props {
    children: ReactNode
}
interface State {
    hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false }
    // constructor (props: React.ReactPropTypes) {
    //   super(props)
    //   this.state = { hasError: false }
    // }

    public static getDerivedStateFromError(): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can also log the error to an error reporting service
        console.error('error: ', error)
        console.error('errorInfo: ', JSON.stringify(errorInfo))
        console.error('componentStack: ', errorInfo.componentStack)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ErrorPage />
            )
        }

        return this.props.children
    }
}

import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import { EventContextProvider } from './context/EventManager/EventContextProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true
				}}
			>
				<EventContextProvider>
					<AuthContextProvider>
						<AppRoutes />
						<Toaster richColors visibleToasts={3} closeButton />
					</AuthContextProvider>
				</EventContextProvider>
			</BrowserRouter>
		</ErrorBoundary>
	)
}

export default App

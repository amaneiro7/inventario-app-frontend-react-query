import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { AuthContextProvider } from './context/Auth/AuthContextProvider'
import { Loading } from './components/Loading'
const AppRoutes = lazy(async () =>
	import('./routes/AppRoutes').then(m => ({ default: m.AppRoutes }))
)
const Toaster = lazy(() => import('sonner').then(m => ({ default: m.Toaster })))

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true
				}}
			>
				<AuthContextProvider>
					<Suspense fallback={<Loading />}>
						<AppRoutes />
					</Suspense>
					<Suspense>
						<Toaster richColors visibleToasts={3} closeButton />
					</Suspense>
				</AuthContextProvider>
			</BrowserRouter>
		</ErrorBoundary>
	)
}

export default App

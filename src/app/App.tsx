import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { AuthContextProvider } from './providers/AuthContextProvider'
import { Loading } from '@/shared/ui/Loading'
import { TooltipProvider } from '@/shared/ui/Tooltip'

const AppRoutes = lazy(async () =>
	import('./providers/routes/AppRoutes').then(m => ({ default: m.AppRoutes }))
)
const Notification = lazy(() =>
	import('@/shared/ui/Notification').then(m => ({ default: m.Notifacation }))
)

function App() {
	return (
		<ErrorBoundary>
			<TooltipProvider>
				<BrowserRouter>
					<AuthContextProvider>
						<Suspense fallback={<Loading />}>
							<AppRoutes />
						</Suspense>
						<Suspense>
							<Notification />
						</Suspense>
					</AuthContextProvider>
				</BrowserRouter>
			</TooltipProvider>
		</ErrorBoundary>
	)
}

export default App

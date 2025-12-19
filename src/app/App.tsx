import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/lib/queryCliente'
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
				<QueryClientProvider client={queryClient}>
					<BrowserRouter
						future={{
							v7_startTransition: false,
							v7_relativeSplatPath: true
						}}
					>
						<AuthContextProvider>
							<Suspense fallback={<Loading />}>
								<AppRoutes />
							</Suspense>
							<Suspense>
								<Notification />
							</Suspense>
						</AuthContextProvider>
					</BrowserRouter>
				</QueryClientProvider>
			</TooltipProvider>
		</ErrorBoundary>
	)
}

export default App

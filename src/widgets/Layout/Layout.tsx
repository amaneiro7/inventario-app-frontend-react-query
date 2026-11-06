import { Outlet } from 'react-router-dom'
import { lazy, memo, Suspense } from 'react'
import { ProtectedRoute } from '@/app/providers/routes/ProtectedRoute'

const PrivateLayout = lazy(() =>
	import('./PrivateLayout').then(m => ({ default: m.PrivateLayout }))
)

const Layout = memo(() => {
	return (
		<Suspense>
			<PrivateLayout>
				<Outlet />
			</PrivateLayout>
		</Suspense>
	)
})

export default ProtectedRoute(Layout)

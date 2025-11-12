import { Outlet } from 'react-router-dom'
import { lazy, memo, Suspense } from 'react'
import { ProtectedRoute } from '@/app/providers/routes/ProtectedRoute'

const Header = lazy(() => import('./Header').then(m => ({ default: m.Header })))
const Main = lazy(() => import('./Main').then(m => ({ default: m.Main })))
const Footer = lazy(() => import('./Footer').then(m => ({ default: m.Footer })))

const Layout = memo(() => {
	return (
		<>
			<Suspense fallback={<header className="bg-azul min-h-16" />}>
				<Header />
			</Suspense>
			<Suspense fallback={<main className="flex flex-1 bg-gray-100" />}>
				<Main>
					<Outlet />
				</Main>
			</Suspense>
			<Suspense fallback={<footer className="h-8 min-h-8 bg-slate-700" />}>
				<Footer />
			</Suspense>
		</>
	)
})

export default ProtectedRoute(Layout)

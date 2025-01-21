import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Prueba } from '@/pages/Prueba'
// import { ProtectedRoute } from "./ProtectedRoute"

const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('../pages/Home'))
const Profile = lazy(async () => await import('../pages/Profile'))
const Layout = lazy(
	async () =>
		await import('@/ui/Layout/Layout').then(m => ({ default: m.Layout }))
)
const Login = lazy(async () => await import('../pages/Login'))

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/prueba" element={<Prueba />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

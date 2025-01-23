import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Prueba } from '@/pages/Prueba'
import UserManagement from '@/pages/UserManagement'
// import { ProtectedRoute } from "./ProtectedRoute"

const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('../pages/Home'))
const Profile = lazy(async () => await import('../pages/Profile'))
const Layout = lazy(async () => await import('@/ui/Layout/Layout'))
const Login = lazy(async () => await import('../pages/Login'))

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/prueba" element={<Prueba />} />
				<Route
					path="/user-management"
					element={<UserManagement />}
				></Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Prueba = lazy(async () => import('@/pages/Prueba').then(m => ({ default: m.Prueba })))
const ListComputer = lazy(async () => import('@/pages/ListComputer'))
const UserManagement = lazy(async () => import('@/pages/UserManagement'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('@/pages/Home'))
const Profile = lazy(async () => await import('@/pages/Profile'))
const Layout = lazy(async () => await import('@/components/Layout/Layout'))
const Login = lazy(async () => await import('@/pages/Login'))
const FormBrand = lazy(async () => import('@/pages/FormBrand'))

export function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<Suspense>
						<Login />
					</Suspense>
				}
			/>
			<Route
				path="/"
				element={
					<Suspense>
						<Layout />
					</Suspense>
				}
			>
				<Route
					path="/"
					element={
						<Suspense>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="/profile"
					element={
						<Suspense>
							<Profile />
						</Suspense>
					}
				/>
				<Route
					path="/prueba"
					element={
						<Suspense>
							<Prueba />
						</Suspense>
					}
				/>
				<Route
					path="/user-management"
					element={
						<Suspense>
							<UserManagement />
						</Suspense>
					}
				></Route>
				<Route
					path="/computer"
					element={
						<Suspense>
							<ListComputer />
						</Suspense>
					}
				/>
				<Route
					path="/brand/add"
					element={
						<Suspense>
							<FormBrand />
						</Suspense>
					}
				/>
			</Route>
			<Route
				path="*"
				element={
					<Suspense>
						<NotFound />
					</Suspense>
				}
			/>
		</Routes>
	)
}

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Loading = lazy(async () => import('@/components/Loading').then(m => ({ default: m.Loading })))
const ListComputer = lazy(async () => import('@/pages/ListComputer'))
const ListMonitor = lazy(async () => import('@/pages/ListMonitor'))
const ListPrinter = lazy(async () => import('@/pages/ListPrinter'))
const ListParts = lazy(async () => import('@/pages/ListParts'))
const ListFinantialPrinter = lazy(async () => import('@/pages/ListFinantialPrinter'))
const UserManagement = lazy(async () => import('@/pages/UserManagement'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('@/pages/Home'))
const Profile = lazy(async () => await import('@/pages/Profile'))
const Layout = lazy(async () => await import('@/components/Layout/Layout'))
const Login = lazy(async () => await import('@/pages/Login'))
const FormBrand = lazy(async () => import('@/pages/FormBrand'))
const FormProcessor = lazy(async () => import('@/pages/FormProcessor'))

export function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<Suspense fallback={<Loading />}>
						<Login />
					</Suspense>
				}
			/>
			<Route
				path="/"
				element={
					<Suspense fallback={<Loading />}>
						<Layout />
					</Suspense>
				}
			>
				<Route
					path="/"
					element={
						<Suspense fallback={<Loading />}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="/profile"
					element={
						<Suspense fallback={<Loading />}>
							<Profile />
						</Suspense>
					}
				/>
				<Route
					path="/user-management"
					element={
						<Suspense fallback={<Loading />}>
							<UserManagement />
						</Suspense>
					}
				></Route>
				<Route
					path="/computer"
					element={
						<Suspense fallback={<Loading />}>
							<ListComputer />
						</Suspense>
					}
				/>
				<Route
					path="/monitor"
					element={
						<Suspense fallback={<Loading />}>
							<ListMonitor />
						</Suspense>
					}
				/>
				<Route
					path="/printer"
					element={
						<Suspense fallback={<Loading />}>
							<ListPrinter />
						</Suspense>
					}
				/>
				<Route
					path="/finantialprinter"
					element={
						<Suspense fallback={<Loading />}>
							<ListFinantialPrinter />
						</Suspense>
					}
				/>
				<Route
					path="/parts"
					element={
						<Suspense fallback={<Loading />}>
							<ListParts />
						</Suspense>
					}
				/>
				<Route
					path="/brand/add"
					element={
						<Suspense fallback={<Loading />}>
							<FormBrand />
						</Suspense>
					}
				/>
				<Route
					path="/brand/edit/:id"
					element={
						<Suspense fallback={<Loading />}>
							<FormBrand />
						</Suspense>
					}
				/>
				<Route
					path="/processors/add"
					element={
						<Suspense fallback={<Loading />}>
							<FormProcessor />
						</Suspense>
					}
				/>
				<Route
					path="/processors/edit/:id"
					element={
						<Suspense fallback={<Loading />}>
							<FormProcessor />
						</Suspense>
					}
				/>
			</Route>
			<Route
				path="*"
				element={
					<Suspense fallback={<Loading />}>
						<NotFound />
					</Suspense>
				}
			/>
		</Routes>
	)
}

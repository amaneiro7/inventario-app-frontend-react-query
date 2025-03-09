import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const ListComputer = lazy(async () => import('@/pages/ListComputer'))
const ListMonitor = lazy(async () => import('@/pages/ListMonitor'))
const ListPrinter = lazy(async () => import('@/pages/ListPrinter'))
const ListParts = lazy(async () => import('@/pages/ListParts'))
const ListFinantialPrinter = lazy(async () => import('@/pages/ListFinantialPrinter'))
const ListModels = lazy(async () => import('@/pages/ListModel'))
const UserManagement = lazy(async () => import('@/pages/UserManagement'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('@/pages/Home'))
const Profile = lazy(async () => await import('@/pages/Profile'))
const Layout = lazy(async () => await import('@/components/Layout/Layout'))
const Login = lazy(async () => await import('@/pages/Login'))
const FormBrand = lazy(async () => import('@/pages/FormBrand'))
const FormCity = lazy(async () => import('@/pages/FormCity'))
const FormSite = lazy(async () => import('@/pages/FormSite'))
const FormProcessor = lazy(async () => import('@/pages/FormProcessor'))
const FormDevice = lazy(async () => import('@/pages/FormDevice'))

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
					path="/monitor"
					element={
						<Suspense>
							<ListMonitor />
						</Suspense>
					}
				/>
				<Route
					path="/printer"
					element={
						<Suspense>
							<ListPrinter />
						</Suspense>
					}
				/>
				<Route
					path="/finantialprinter"
					element={
						<Suspense>
							<ListFinantialPrinter />
						</Suspense>
					}
				/>
				<Route
					path="/parts"
					element={
						<Suspense>
							<ListParts />
						</Suspense>
					}
				/>
				<Route
					path="/model"
					element={
						<Suspense>
							<ListModels />
						</Suspense>
					}
				/>
				<Route
					path="/device/add"
					element={
						<Suspense>
							<FormDevice />
						</Suspense>
					}
				/>
				<Route
					path="/device/edit/:id"
					element={
						<Suspense>
							<FormDevice />
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
				<Route
					path="/brand/edit/:id"
					element={
						<Suspense>
							<FormBrand />
						</Suspense>
					}
				/>
				<Route
					path="/site/add"
					element={
						<Suspense>
							<FormSite />
						</Suspense>
					}
				/>
				<Route
					path="/site/edit/:id"
					element={
						<Suspense>
							<FormSite />
						</Suspense>
					}
				/>
				<Route
					path="/city/add"
					element={
						<Suspense>
							<FormCity />
						</Suspense>
					}
				/>
				<Route
					path="/city/edit/:id"
					element={
						<Suspense>
							<FormCity />
						</Suspense>
					}
				/>
				<Route
					path="/processors/add"
					element={
						<Suspense>
							<FormProcessor />
						</Suspense>
					}
				/>
				<Route
					path="/processors/edit/:id"
					element={
						<Suspense>
							<FormProcessor />
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

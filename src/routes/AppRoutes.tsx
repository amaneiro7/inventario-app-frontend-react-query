import { Loading } from '@/components/Loading'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const ListComputer = lazy(() => import('@/pages/ListComputer'))
const ListMonitor = lazy(() => import('@/pages/ListMonitor'))
const ListPrinter = lazy(() => import('@/pages/ListPrinter'))
const ListParts = lazy(() => import('@/pages/ListParts'))
const ListFinantialPrinter = lazy(() => import('@/pages/ListFinantialPrinter'))
const ListModels = lazy(() => import('@/pages/ListModel'))
const ListEmployee = lazy(() => import('@/pages/ListEmployee'))
const ListSite = lazy(() => import('@/pages/ListSite'))
const ListHistory = lazy(() => import('@/pages/ListHistory'))
const UserManagement = lazy(() => import('@/pages/UserManagement'))
const NotFound = lazy(() => import('@/pages/404'))
const Home = lazy(() => import('@/pages/Home'))
const Profile = lazy(() => import('@/pages/Profile'))
const Layout = lazy(() => import('@/components/Layout/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const FormBrand = lazy(() => import('@/pages/FormBrand'))
const FormEmployee = lazy(() => import('@/pages/FormEmployee'))
const FormModel = lazy(() => import('@/pages/FormModel'))
const FormCity = lazy(() => import('@/pages/FormCity'))
const FormSite = lazy(() => import('@/pages/FormSite'))
const FormDepartamento = lazy(() => import('@/pages/FormDepartamento'))
const FormCargo = lazy(() => import('@/pages/FormCargo'))
const FormDirectiva = lazy(() => import('@/pages/FormDirectiva'))
const FormVicepresidenciaEjecutivas = lazy(() => import('@/pages/FormVicepresidenciaEjecutiva'))
const FormCentroCosto = lazy(() => import('@/pages/FormCentroCosto'))
const FormCentroTrabajo = lazy(() => import('@/pages/FormCentroTrabajo'))
const FormLocation = lazy(() => import('@/pages/FormLocation'))
const FormProcessor = lazy(() => import('@/pages/FormProcessor'))
const FormDevice = lazy(() => import('@/pages/FormDevice'))
const ListWrapper = lazy(() => import('@/ui/ListWrapper'))

export function AppRoutes() {
	return (
		<Suspense>
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
						path="/list"
						element={
							<Suspense fallback={<Loading />}>
								<ListWrapper />
							</Suspense>
						}
					>
						<Route path="usuarios" element={<ListEmployee />} />
						<Route path="computer" element={<ListComputer />} />
						<Route path="monitor" element={<ListMonitor />} />
						<Route path="printer" element={<ListPrinter />} />
						<Route path="finantialprinter" element={<ListFinantialPrinter />} />
						<Route path="parts" element={<ListParts />} />
						<Route path="model" element={<ListModels />} />
						<Route path="location" element={<ListSite />} />
						<Route path="history" element={<ListHistory />} />
					</Route>
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
						path="/device/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormDevice />
							</Suspense>
						}
					/>
					<Route
						path="/device/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormDevice />
							</Suspense>
						}
					/>
					<Route
						path="/employee/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormEmployee />
							</Suspense>
						}
					/>
					<Route
						path="/employee/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormEmployee />
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
						path="/directiva/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormDirectiva />
							</Suspense>
						}
					/>
					<Route
						path="/directiva/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormDirectiva />
							</Suspense>
						}
					/>
					<Route
						path="/vicepresidenciaEjecutivas/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormVicepresidenciaEjecutivas />
							</Suspense>
						}
					/>
					<Route
						path="/vicepresidenciaEjecutivas/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormVicepresidenciaEjecutivas />
							</Suspense>
						}
					/>
					<Route
						path="/model/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormModel />
							</Suspense>
						}
					/>
					<Route
						path="/model/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormModel />
							</Suspense>
						}
					/>
					<Route
						path="/site/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormSite />
							</Suspense>
						}
					/>
					<Route
						path="/site/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormSite />
							</Suspense>
						}
					/>
					<Route
						path="/location/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormLocation />
							</Suspense>
						}
					/>
					<Route
						path="/location/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormLocation />
							</Suspense>
						}
					/>
					<Route
						path="/city/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormCity />
							</Suspense>
						}
					/>
					<Route
						path="/city/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormCity />
							</Suspense>
						}
					/>
					<Route
						path="/centrocosto/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormCentroCosto />
							</Suspense>
						}
					/>
					<Route
						path="/centrocosto/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormCentroCosto />
							</Suspense>
						}
					/>
					<Route
						path="/centrotrabajo/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormCentroTrabajo />
							</Suspense>
						}
					/>
					<Route
						path="/centrotrabajo/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormCentroTrabajo />
							</Suspense>
						}
					/>
					<Route
						path="/departamento/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormDepartamento />
							</Suspense>
						}
					/>
					<Route
						path="/departamento/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormDepartamento />
							</Suspense>
						}
					/>
					<Route
						path="/cargo/add"
						element={
							<Suspense fallback={<Loading />}>
								<FormCargo />
							</Suspense>
						}
					/>
					<Route
						path="/cargo/edit/:id"
						element={
							<Suspense fallback={<Loading />}>
								<FormCargo />
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
		</Suspense>
	)
}

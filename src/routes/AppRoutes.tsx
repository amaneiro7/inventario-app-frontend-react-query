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
const DashboardWrapper = lazy(() => import('@/ui/Wrappers/DashBoardWrapper'))
const DashboardComputer = lazy(() => import('@/pages/DashboardComputer'))
const UserManagement = lazy(() => import('@/pages/UserManagement'))
const ManagementProfile = lazy(() => import('@/pages/UserManagementProfile'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const NotFound = lazy(() => import('@/pages/404'))
const Home = lazy(() => import('@/pages/Home'))
const Profile = lazy(() => import('@/pages/Profile'))
const Layout = lazy(() => import('@/components/Layout/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const FormBrand = lazy(() => import('@/pages/FormBrand'))
const FormEmployee = lazy(() => import('@/pages/FormEmployee'))
const FormModel = lazy(() => import('@/pages/FormModel'))
const FormRegion = lazy(() => import('@/pages/FormRegion'))
const FormCity = lazy(() => import('@/pages/FormCity'))
const FormSite = lazy(() => import('@/pages/FormSite'))
const FormDepartamento = lazy(() => import('@/pages/FormDepartamento'))
const FormCargo = lazy(() => import('@/pages/FormCargo'))
const FormDirectiva = lazy(() => import('@/pages/FormDirectiva'))
const FormVicepresidenciaEjecutivas = lazy(() => import('@/pages/FormVicepresidenciaEjecutiva'))
const FormVicepresidencia = lazy(() => import('@/pages/FormVicepresidencia'))
// const FormCentroCosto = lazy(() => import('@/pages/FormCentroCosto'))
// const FormCentroTrabajo = lazy(() => import('@/pages/FormCentroTrabajo'))
const FormLocation = lazy(() => import('@/pages/FormLocation'))
const FormProcessor = lazy(() => import('@/pages/FormProcessor'))
const FormDevice = lazy(() => import('@/pages/FormDevice'))
const PaymentSchedules = lazy(() => import('@/pages/PaymentSchedules'))
const ListWrapper = lazy(() => import('@/ui/Wrappers/ListWrapper'))
const FormWrapper = lazy(() => import('@/ui/Wrappers/FormWrapper'))
const Dashboards = lazy(() => import('@/pages/Dashboard'))
const List = lazy(() => import('@/pages/List'))
const Form = lazy(() => import('@/pages/Form'))

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
					>
						<Route
							path="register"
							element={
								<Suspense>
									<RegisterPage />
								</Suspense>
							}
						/>
						<Route
							path="edit/:id"
							element={
								<Suspense>
									<RegisterPage />
								</Suspense>
							}
						/>
						<Route
							path="profile/:id"
							element={
								<Suspense>
									<ManagementProfile />
								</Suspense>
							}
						/>
					</Route>
					<Route path="/payment-schedules" element={<PaymentSchedules />} />
					<Route
						path="/list"
						element={
							<Suspense fallback={<Loading />}>
								<ListWrapper />
							</Suspense>
						}
					>
						<Route path="" element={<List />} />
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
						path="/dashboard"
						element={
							<Suspense>
								<DashboardWrapper />
							</Suspense>
						}
					>
						<Route path="" element={<Dashboards />} />
						<Route path="computer" element={<DashboardComputer />} />
					</Route>

					<Route
						path="/form"
						element={
							<Suspense fallback={<Loading />}>
								<FormWrapper />
							</Suspense>
						}
					>
						<Route path="" element={<Form />} />
						<Route path="device/add" element={<FormDevice />} />
						<Route path="device/edit/:id" element={<FormDevice />} />
						<Route path="employee/add" element={<FormEmployee />} />
						<Route path="employee/edit/:id" element={<FormEmployee />} />
						<Route path="brand/add" element={<FormBrand />} />
						<Route path="brand/edit/:id" element={<FormBrand />} />
						<Route path="directiva/add" element={<FormDirectiva />} />
						<Route path="directiva/edit/:id" element={<FormDirectiva />} />
						<Route
							path="vicepresidenciaEjecutiva/add"
							element={<FormVicepresidenciaEjecutivas />}
						/>
						<Route
							path="vicepresidenciaEjecutiva/edit/:id"
							element={<FormVicepresidenciaEjecutivas />}
						/>
						<Route path="vicepresidencia/add" element={<FormVicepresidencia />} />
						<Route path="vicepresidencia/edit/:id" element={<FormVicepresidencia />} />
						<Route path="model/add" element={<FormModel />} />
						<Route path="model/edit/:id" element={<FormModel />} />
						<Route path="region/" element={<FormRegion />} />
						<Route path="region/edit/:id" element={<FormRegion />} />
						<Route path="site/add" element={<FormSite />} />
						<Route path="site/edit/:id" element={<FormSite />} />
						<Route path="location/add" element={<FormLocation />} />
						<Route path="location/edit/:id" element={<FormLocation />} />
						<Route path="city/add" element={<FormCity />} />
						<Route path="city/edit/:id" element={<FormCity />} />
						{/* <Route path="centrocosto/add" element={<FormCentroCosto />} />
							<Route path="centrocosto/edit/:id" element={<FormCentroCosto />} />
							<Route path="centrotrabajo/add" element={<FormCentroTrabajo />} />
							<Route path="centrotrabajo/edit/:id" element={<FormCentroTrabajo />} /> */}
						<Route path="departamento/add" element={<FormDepartamento />} />
						<Route path="departamento/edit/:id" element={<FormDepartamento />} />
						<Route path="cargo/add" element={<FormCargo />} />
						<Route path="cargo/edit/:id" element={<FormCargo />} />
						<Route path="processors/add" element={<FormProcessor />} />
						<Route path="processors/edit/:id" element={<FormProcessor />} />
					</Route>
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

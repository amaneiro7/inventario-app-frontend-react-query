import { type JSX, lazy, Suspense } from 'react'
import { Loading } from '@/shared/ui/Loading'
import { Routes, Route } from 'react-router-dom'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'
import { PERMISSIONS } from '@/shared/config/permissions'
import UnauthorizedPage from '@/pages/403'
import NotFound from '@/pages/404'
import ErrorPage from '@/pages/500'

const ListComputer = lazy(() => import('@/pages/ListComputer'))
const ListMonitor = lazy(() => import('@/pages/ListMonitor'))
const ListPrinter = lazy(() => import('@/pages/ListPrinter'))
const ListParts = lazy(() => import('@/pages/ListParts'))
const ListFinantialPrinter = lazy(() => import('@/pages/ListFinantialPrinter'))
const ListModels = lazy(() => import('@/pages/ListModel'))
const ListEmployee = lazy(() => import('@/pages/ListEmployee'))
const ListSite = lazy(() => import('@/pages/ListSite'))
const ListHistory = lazy(() => import('@/pages/ListHistory'))
const ListShipment = lazy(() => import('@/pages/ListShipment'))
const ListAccessControl = lazy(() => import('@/pages/ListAccessControl'))
const MonitoringDevice = lazy(() => import('@/pages/MonitoringDevice'))
const MonitoringLocation = lazy(() => import('@/pages/MonitoringLocation'))
const DashboardWrapper = lazy(() => import('@/app/layouts/DashBoardWrapper'))
const DashboardComputer = lazy(() => import('@/pages/DashboardComputer'))
const UserManagement = lazy(() => import('@/pages/UserManagement'))
const ManagementProfile = lazy(() => import('@/pages/UserManagementProfile'))
const UserManagementRegister = lazy(() => import('@/pages/UserManagementRegister'))
const Home = lazy(() => import('@/pages/Home'))
const Profile = lazy(() => import('@/pages/Profile'))
const Layout = lazy(() => import('@/widgets/Layout/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const NoPermissionsPage = lazy(() => import('@/pages/NoPermissionsPage'))
const FormBrand = lazy(() => import('@/pages/FormBrand'))
const FormPermission = lazy(() => import('@/pages/FormPermission'))
const FormPermissionGroup = lazy(() => import('@/pages/FormPermissionGroup'))
const FormAccessPolicy = lazy(() => import('@/pages/FormAccessPolicy'))
const FormShipment = lazy(() => import('@/pages/FormShipment'))
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
const ListWrapper = lazy(() => import('@/app/layouts/ListWrapper'))
const FormWrapper = lazy(() => import('@/app/layouts/FormWrapper'))
const MonitoringWrapper = lazy(() => import('@/app/layouts/MonitoringWrapper'))
const AgencyMapPage = lazy(() => import('@/pages/MonitoringAgencyMapChart'))
const AdministrativeSiteMapPage = lazy(() => import('@/pages/MonitoringSiteMapChart'))

const Dashboards = lazy(() => import('@/pages/Dashboard'))
const List = lazy(() => import('@/pages/List'))
const Settings = lazy(() => import('@/pages/Settings'))
const Form = lazy(() => import('@/pages/Form'))
const Monitoring = lazy(() => import('@/pages/Monitoring'))

const suspended = (Component: React.ElementType) => (
	<Suspense fallback={<Loading />}>
		<Component />
	</Suspense>
)

/**
 * `AppRoutes`
 * @component
 * @description Componente que define todas las rutas de la aplicación utilizando `react-router-dom`.
 * Implementa lazy loading para los componentes de página para optimizar el rendimiento inicial.
 * @returns {JSX.Element} Las rutas configuradas de la aplicación.
 */
export function AppRoutes(): JSX.Element {
	return (
		<Suspense fallback={<Loading />}>
			{/* Suspense global para todas las rutas */}
			<Routes>
				<Route path="/403" element={<UnauthorizedPage />} />
				<Route path="/500" element={<ErrorPage onReset={() => {}} />} />
				<Route path="/error" element={<ErrorPage onReset={() => {}} />} />
				<Route path="/login" element={suspended(Login)} />
				<Route path="/no-permissions" element={suspended(NoPermissionsPage)} />
				<Route path="/" element={suspended(Layout)}>
					<Route index element={suspended(Home)} /> {/* Ruta index para / */}
					<Route path="profile" element={suspended(Profile)} />
					<Route
						element={
							<ProtectedByPermissionRoute permission={PERMISSIONS.SETTINGS.UPDATE} />
						}
					>
						<Route path="settings" element={suspended(Settings)} />
					</Route>
					<Route
						element={
							<ProtectedByPermissionRoute permission={PERMISSIONS.USERS.READ_LIST} />
						}
					>
						<Route path="user-management" element={suspended(UserManagement)}>
							<Route
								element={
									<ProtectedByPermissionRoute
										permission={PERMISSIONS.USERS.CREATE}
									/>
								}
							>
								<Route
									path="register"
									element={suspended(UserManagementRegister)}
								/>
							</Route>
							<Route
								element={
									<ProtectedByPermissionRoute
										permission={PERMISSIONS.USERS.READ}
									/>
								}
							>
								<Route path="profile/:id" element={suspended(ManagementProfile)} />
							</Route>
						</Route>
					</Route>
					<Route path="payment-schedules" element={suspended(PaymentSchedules)} />
					<Route path="list" element={suspended(ListWrapper)}>
						<Route index element={suspended(List)} />
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.EMPLOYEES.READ_LIST}
								/>
							}
						>
							<Route path="usuarios" element={suspended(ListEmployee)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DEVICES.READ_LIST}
								/>
							}
						>
							<Route path="computer" element={suspended(ListComputer)} />
							<Route path="monitor" element={suspended(ListMonitor)} />
							<Route path="printer" element={suspended(ListPrinter)} />
							<Route
								path="finantialprinter"
								element={suspended(ListFinantialPrinter)}
							/>
							<Route path="parts" element={suspended(ListParts)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.MODELS.READ_LIST}
								/>
							}
						>
							<Route path="model" element={suspended(ListModels)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.LOCATIONS.READ_LIST}
								/>
							}
						>
							<Route path="location" element={suspended(ListSite)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.HISTORY.READ_LIST}
								/>
							}
						>
							<Route path="history" element={suspended(ListHistory)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.SHIPMENTS.READ_LIST}
								/>
							}
						>
							<Route path="shipment" element={suspended(ListShipment)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.ACCESS_POLICIES.READ_LIST}
								/>
							}
						>
							<Route path="access-control" element={suspended(ListAccessControl)} />
						</Route>
					</Route>
					<Route path="monitoring" element={suspended(MonitoringWrapper)}>
						<Route index element={suspended(Monitoring)} />
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DEVICES.READ_MONITORING_DASHBOARD}
								/>
							}
						>
							<Route path="device" element={suspended(MonitoringDevice)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.LOCATIONS.READ_MONITORING_DASHBOARD}
								/>
							}
						>
							<Route path="location" element={suspended(MonitoringLocation)} />
							<Route path="agencymap" element={suspended(AgencyMapPage)} />
							<Route
								path="administrativesitemap"
								element={suspended(AdministrativeSiteMapPage)}
							/>
						</Route>
					</Route>
					<Route path="dashboard" element={suspended(DashboardWrapper)}>
						<Route index element={suspended(Dashboards)} />
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DASHBOARD.READ}
								/>
							}
						>
							<Route path="computer" element={suspended(DashboardComputer)} />
						</Route>
					</Route>
					{/* Seccion de Formularios */}
					<Route path="form" element={suspended(FormWrapper)}>
						<Route index element={suspended(Form)} />
						{/* Ruta para actualizacion de envios */}
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.SHIPMENTS.CREATE}
								/>
							}
						>
							<Route path="shipment/add" element={suspended(FormShipment)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.SHIPMENTS.READ}
								/>
							}
						>
							<Route path="shipment/edit/:id" element={suspended(FormShipment)} />
						</Route>

						{/* Ruta para actualizacion de dispositivos */}
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DEVICES.CREATE}
								/>
							}
						>
							<Route path="device/add" element={suspended(FormDevice)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.DEVICES.READ} />
							}
						>
							<Route path="device/edit/:id" element={suspended(FormDevice)} />
						</Route>

						{/* Ruta para actualizacion de empleados */}
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.EMPLOYEES.CREATE}
								/>
							}
						>
							<Route path="employee/add" element={suspended(FormEmployee)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.EMPLOYEES.READ}
								/>
							}
						>
							<Route path="employee/edit/:id" element={suspended(FormEmployee)} />
						</Route>

						{/* Ruta para actualizacion de Marca */}
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.BRANDS.CREATE}
								/>
							}
						>
							<Route path="brand/add" element={suspended(FormBrand)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.BRANDS.READ} />
							}
						>
							<Route path="brand/edit/:id" element={suspended(FormBrand)} />
						</Route>

						{/* Rutas para Access Control */}
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.ACCESS_POLICIES.CREATE}
								/>
							}
						>
							<Route path="access-policy/add" element={suspended(FormAccessPolicy)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.ACCESS_POLICIES.READ}
								/>
							}
						>
							<Route
								path="access-policy/edit/:id"
								element={suspended(FormAccessPolicy)}
							/>
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.PERMISSIONS.CREATE}
								/>
							}
						>
							<Route path="permission/add" element={suspended(FormPermission)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.PERMISSIONS.READ}
								/>
							}
						>
							<Route path="permission/edit/:id" element={suspended(FormPermission)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.PERMISSION_GROUPS.CREATE}
								/>
							}
						>
							<Route
								path="permission-groups/add"
								element={suspended(FormPermissionGroup)}
							/>
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.PERMISSION_GROUPS.READ}
								/>
							}
						>
							<Route
								path="permission-groups/edit/:id"
								element={suspended(FormPermissionGroup)}
							/>
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DIRECTIVAS.CREATE}
								/>
							}
						>
							<Route path="directiva/add" element={suspended(FormDirectiva)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DIRECTIVAS.READ}
								/>
							}
						>
							<Route path="directiva/edit/:id" element={suspended(FormDirectiva)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.VICEPRESIDENCIA_EJECUTIVAS.CREATE}
								/>
							}
						>
							<Route
								path="vicepresidenciaEjecutiva/add"
								element={suspended(FormVicepresidenciaEjecutivas)}
							/>
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.VICEPRESIDENCIA_EJECUTIVAS.READ}
								/>
							}
						>
							<Route
								path="vicepresidenciaEjecutiva/edit/:id"
								element={suspended(FormVicepresidenciaEjecutivas)}
							/>
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.VICEPRESIDENCIAS.CREATE}
								/>
							}
						>
							<Route
								path="vicepresidencia/add"
								element={suspended(FormVicepresidencia)}
							/>
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.VICEPRESIDENCIAS.READ}
								/>
							}
						>
							<Route
								path="vicepresidencia/edit/:id"
								element={suspended(FormVicepresidencia)}
							/>
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.MODELS.CREATE}
								/>
							}
						>
							<Route path="model/add" element={suspended(FormModel)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.MODELS.READ} />
							}
						>
							<Route path="model/edit/:id" element={suspended(FormModel)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.REGIONS.READ} />
							}
						>
							<Route path="region" element={suspended(FormRegion)} />
							<Route path="region/edit/:id" element={suspended(FormRegion)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.SITES.CREATE} />
							}
						>
							<Route path="site/add" element={suspended(FormSite)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.SITES.READ} />
							}
						>
							<Route path="site/edit/:id" element={suspended(FormSite)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.LOCATIONS.CREATE}
								/>
							}
						>
							<Route path="location/add" element={suspended(FormLocation)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.LOCATIONS.READ}
								/>
							}
						>
							<Route path="location/edit/:id" element={suspended(FormLocation)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.CITIES.CREATE}
								/>
							}
						>
							<Route path="city/add" element={suspended(FormCity)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.CITIES.READ} />
							}
						>
							<Route path="city/edit/:id" element={suspended(FormCity)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DEPARTAMENTOS.CREATE}
								/>
							}
						>
							<Route path="departamento/add" element={suspended(FormDepartamento)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.DEPARTAMENTOS.READ}
								/>
							}
						>
							<Route
								path="departamento/edit/:id"
								element={suspended(FormDepartamento)}
							/>
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.CARGOS.CREATE}
								/>
							}
						>
							<Route path="cargo/add" element={suspended(FormCargo)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute permission={PERMISSIONS.CARGOS.READ} />
							}
						>
							<Route path="cargo/edit/:id" element={suspended(FormCargo)} />
						</Route>

						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.PROCESSORS.CREATE}
								/>
							}
						>
							<Route path="processor/add" element={suspended(FormProcessor)} />
						</Route>
						<Route
							element={
								<ProtectedByPermissionRoute
									permission={PERMISSIONS.PROCESSORS.READ}
								/>
							}
						>
							<Route path="processor/edit/:id" element={suspended(FormProcessor)} />
						</Route>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

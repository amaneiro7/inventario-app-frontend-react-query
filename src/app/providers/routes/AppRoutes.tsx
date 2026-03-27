import { type JSX, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'
import { suspended } from './suspendedComponent'
import { PERMISSIONS } from '@/shared/config/permissions'
import { Loading } from '@/shared/ui/Loading'

import UnauthorizedPage from '@/pages/403'
import NotFound from '@/pages/404'
import ErrorPage from '@/pages/500'

const ListRoutes = lazy(() => import('./ListRoutes'))
const FormRoutes = lazy(() => import('./FormRoutes'))
const MonitoringRoutes = lazy(() => import('./MonitoringRoutes'))
const DashboardRoutes = lazy(() => import('./DashboardRoutes'))
const UserManagementRoutes = lazy(() => import('./UserManagementRoutes'))

const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/widgets/Layout/Layout'))
const Home = lazy(() => import('@/pages/Home'))
const NoPermissionsPage = lazy(() => import('@/pages/NoPermissionsPage'))
const Profile = lazy(() => import('@/pages/Profile'))
const Settings = lazy(() => import('@/pages/Settings'))
const PaymentSchedules = lazy(() => import('@/pages/PaymentSchedules'))
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
					<Route index element={suspended(Home)} />
					<Route path="profile" element={suspended(Profile)} />
					<Route
						element={
							<ProtectedByPermissionRoute permission={PERMISSIONS.SETTINGS.UPDATE} />
						}
					>
						<Route path="settings" element={suspended(Settings)} />
					</Route>

					<Route path="payment-schedules" element={suspended(PaymentSchedules)} />
					<Route path="list/*" element={suspended(ListRoutes)} />
					<Route path="form/*" element={suspended(FormRoutes)} />
					<Route path="monitoring/*" element={suspended(MonitoringRoutes)} />
					<Route path="dashboard/*" element={suspended(DashboardRoutes)} />
					<Route path="user-management/*" element={suspended(UserManagementRoutes)} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

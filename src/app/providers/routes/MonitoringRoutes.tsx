import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { suspended } from './suspendedComponent'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'
import { PERMISSIONS } from '@/shared/config/permissions'

const MonitoringWrapper = lazy(() => import('@/app/layouts/MonitoringWrapper'))
const AgencyMapPage = lazy(() => import('@/pages/MonitoringAgencyMapChart'))
const AdministrativeSiteMapPage = lazy(() => import('@/pages/MonitoringSiteMapChart'))
const Monitoring = lazy(() => import('@/pages/Monitoring'))
const MonitoringDevice = lazy(() => import('@/pages/MonitoringDevice'))
const MonitoringLocation = lazy(() => import('@/pages/MonitoringLocation'))

export default function MonitoringRoutes() {
	return (
		<Routes>
			<Route element={suspended(MonitoringWrapper)}>
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
		</Routes>
	)
}

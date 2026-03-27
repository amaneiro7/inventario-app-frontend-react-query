import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { suspended } from './suspendedComponent'
import { PERMISSIONS } from '@/shared/config/permissions'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'

const Dashboards = lazy(() => import('@/pages/Dashboard'))
const DashboardWrapper = lazy(() => import('@/app/layouts/DashBoardWrapper'))
const DashboardComputer = lazy(() => import('@/pages/DashboardComputer'))

export default function DashboardRoutes() {
	return (
		<Routes>
			<Route element={suspended(DashboardWrapper)}>
				<Route index element={suspended(Dashboards)} />
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.DASHBOARD.READ} />}
				>
					<Route path="computer" element={suspended(DashboardComputer)} />
				</Route>
			</Route>
		</Routes>
	)
}

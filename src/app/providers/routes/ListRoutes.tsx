import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { suspended } from './suspendedComponent'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'
import { PERMISSIONS } from '@/shared/config/permissions'

const ListWrapper = lazy(() => import('@/app/layouts/ListWrapper'))
const List = lazy(() => import('@/pages/List'))
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

export default function ListRoutes() {
	return (
		<Routes>
			<Route element={suspended(ListWrapper)}>
				<Route index element={suspended(List)} />
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.EMPLOYEES.READ_LIST} />
					}
				>
					<Route path="usuarios" element={suspended(ListEmployee)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.DEVICES.READ_LIST} />
					}
				>
					<Route path="computer" element={suspended(ListComputer)} />
					<Route path="monitor" element={suspended(ListMonitor)} />
					<Route path="printer" element={suspended(ListPrinter)} />
					<Route path="finantialprinter" element={suspended(ListFinantialPrinter)} />
					<Route path="parts" element={suspended(ListParts)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.MODELS.READ_LIST} />
					}
				>
					<Route path="model" element={suspended(ListModels)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.LOCATIONS.READ_LIST} />
					}
				>
					<Route path="location" element={suspended(ListSite)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.HISTORY.READ_LIST} />
					}
				>
					<Route path="history" element={suspended(ListHistory)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.SHIPMENTS.READ_LIST} />
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
		</Routes>
	)
}

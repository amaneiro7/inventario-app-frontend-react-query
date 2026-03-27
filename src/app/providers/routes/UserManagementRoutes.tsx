import { lazy } from 'react'
import { PERMISSIONS } from '@/shared/config/permissions'
import { Route, Routes } from 'react-router-dom'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'
import { suspended } from './suspendedComponent'

const UserManagement = lazy(() => import('@/pages/UserManagement'))
const ManagementProfile = lazy(() => import('@/pages/UserManagementProfile'))
const UserManagementRegister = lazy(() => import('@/pages/UserManagementRegister'))

export default function UserManagementRoutes() {
	return (
		<Routes>
			<Route
				element={<ProtectedByPermissionRoute permission={PERMISSIONS.USERS.READ_LIST} />}
			>
				<Route index element={suspended(UserManagement)} />
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.USERS.CREATE} />}
				>
					<Route path="register" element={suspended(UserManagementRegister)} />
				</Route>
				<Route element={<ProtectedByPermissionRoute permission={PERMISSIONS.USERS.READ} />}>
					<Route path="profile/:id" element={suspended(ManagementProfile)} />
				</Route>
			</Route>
		</Routes>
	)
}

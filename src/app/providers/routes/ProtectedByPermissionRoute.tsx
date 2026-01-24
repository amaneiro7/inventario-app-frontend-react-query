import { Navigate, Outlet } from 'react-router-dom'
import { usePermissionCheck } from '@/features/auth/hook/usePermissionCheck'
import { type Permission } from '@/shared/config/permissions'

interface Props {
	permission: Permission
	redirectTo?: string
}

export const ProtectedByPermissionRoute = ({ permission, redirectTo = '/403' }: Props) => {
	const { hasPermission } = usePermissionCheck()

	// 1. Una vez que la carga ha terminado, verificar el permiso.
	if (!hasPermission(permission)) {
		// Si está logueado pero no tiene el permiso, a la página de no autorizado
		return <Navigate to={redirectTo} replace />
	}

	// Si tiene permiso, renderizamos el contenido de la ruta
	return <Outlet />
}

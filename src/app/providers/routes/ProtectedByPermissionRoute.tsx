// src/app/providers/router/ProtectedRoute.tsx (o una ruta similar)
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/entities/user/infra/hooks/useAuth'
import { type Permission } from '@/shared/config/permissions'

interface Props {
	permission: Permission
	redirectTo?: string
}

export const ProtectedByPermissionRoute = ({ permission, redirectTo = '/403' }: Props) => {
	const { hasPermission } = useAuth()

	if (!hasPermission(permission)) {
		// Si está logueado pero no tiene el permiso, a la página de no autorizado
		return <Navigate to={redirectTo} replace />
	}

	// Si tiene permiso, renderizamos el contenido de la ruta
	return <Outlet />
}

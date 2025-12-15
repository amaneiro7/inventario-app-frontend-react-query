import { useMemo } from 'react'
import { usePermissionCheck } from '@/features/auth/hook/usePermissionCheck'
import { type RouterMetadata } from '../types/metaData'

export const usePermittedSubRoutes = ({
	routerMetada,
	indexPath
}: {
	routerMetada: Record<string, RouterMetadata>
	indexPath: string
}) => {
	const { hasPermission, isLoadingPermissions } = usePermissionCheck()

	const permittedSubRoutes = useMemo(() => {
		return Object.entries(routerMetada)
			.filter(([path]) => path !== indexPath) // Excluir la ruta índice
			.map(([, metadata]) => metadata)
			.filter(metadata => hasPermission(metadata?.permission))
	}, [hasPermission])

	return { permittedSubRoutes, isLoadingPermissions }
}

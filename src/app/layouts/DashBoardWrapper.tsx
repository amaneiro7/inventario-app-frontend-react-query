import { memo } from 'react'
import { Navigate, useLocation, useOutletContext } from 'react-router-dom'
import { dashboardIndexPath } from './constants/DASHBOARD_ROUTES_METADATA'
import { DashboardRender } from './DashboardRender'
import { type RouterMetadata } from './types/metaData'

/**
 * @component DashBoardWrapper
 * @description Layout principal que aplica control de acceso y pasa el contexto de rutas permitidas.
 */
const DashboardWrapper = memo(() => {
	const { pathname } = useLocation()
	const isDashboardIndex = pathname === dashboardIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()
	// 2. Lógica de Redirección/Acceso Denegado
	// Si está en /dashboard (índice) Y no tiene permisos para ninguna sub-ruta.
	if (isDashboardIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}
	return <DashboardRender isDashboardIndex={isDashboardIndex} pathname={pathname} />
})

export default DashboardWrapper

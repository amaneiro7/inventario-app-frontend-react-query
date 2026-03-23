import { lazy, memo } from 'react'
import { Navigate, useLocation, useOutletContext } from 'react-router-dom'
import { monitoringIndexPath } from './constants/MONITORING_ROUTES_METADATA'
import type { RouterMetadata } from './types/metaData'

const MonitoringWrapperRender = lazy(() =>
	import('./MonitoringWrapperRender').then(m => ({ default: m.MonitoringWrapperRender }))
)

/**
 * `MonitoringWrapper`
 * @component
 * @description Componente de layout que envuelve las páginas de monitoreo.
 * Proporciona un título de página dinámico, breadcrumbs, optimización SEO y un contenedor de estilo (`DetailsWrapper`).
 * @returns {JSX.Element} El layout de monitoreo con el contenido de la ruta anidada.
 */
const MonitoringWrapper = memo(() => {
	const { pathname } = useLocation()
	const isMonitoringBaseIndex = location.pathname === monitoringIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	// 2. Lógica de Redirección/Acceso Denegado
	// Si está en /dashboard (índice) Y no tiene permisos para ninguna sub-ruta.
	if (isMonitoringBaseIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}

	return (
		<MonitoringWrapperRender
			isMonitoringBaseIndex={isMonitoringBaseIndex}
			pathname={pathname}
		/>
	)
})

MonitoringWrapper.displayName = 'MonitoringWrapper'

export default MonitoringWrapper

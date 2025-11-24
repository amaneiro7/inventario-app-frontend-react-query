import { memo, Suspense, useMemo } from 'react'
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import {
	MONITORING_ROUTES_METADATA,
	monitoringIndexPath
} from './constants/MONITORING_ROUTES_METADATA'
import { RouterMetadata } from './types/metaData'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'

/**
 * `MonitoringWrapper`
 * @component
 * @description Componente de layout que envuelve las páginas de monitoreo.
 * Proporciona un título de página dinámico, breadcrumbs, optimización SEO y un contenedor de estilo (`DetailsWrapper`).
 * @returns {JSX.Element} El layout de monitoreo con el contenido de la ruta anidada.
 */
const MonitoringWrapper = memo(() => {
	const location = useLocation()
	const isMonitoringBaseIndex = location.pathname === monitoringIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	// 1. Calcular las rutas de sub-dashboard a las que el usuario tiene acceso
	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: MONITORING_ROUTES_METADATA,
		indexPath: monitoringIndexPath
	})

	// 2. Lógica de Redirección/Acceso Denegado
	// Si está en /dashboard (índice) Y no tiene permisos para ninguna sub-ruta.
	if (isMonitoringBaseIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}

	const currentMetadata = useMemo(
		() =>
			MONITORING_ROUTES_METADATA[location.pathname] ||
			MONITORING_ROUTES_METADATA[monitoringIndexPath],
		[location.pathname]
	)

	const title = currentMetadata?.title
	const description = currentMetadata?.description

	const breadcrumbSegments = useMemo(() => {
		if (isMonitoringBaseIndex) {
			return ['Monitoreo']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Monitoreo', href: monitoringIndexPath },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title // Toma la parte antes del '|' si existe, o el título completo
		]
		return segments
	}, [isMonitoringBaseIndex, currentMetadata.title])

	return (
		<>
			<Seo title={title} description={description} />
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<Suspense>
					<Outlet context={permittedSubRoutes} />
				</Suspense>
			</DetailsWrapper>
		</>
	)
})

export default MonitoringWrapper

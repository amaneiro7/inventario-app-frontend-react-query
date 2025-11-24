import { memo, Suspense, useMemo } from 'react'
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Seo } from '@/shared/ui/Seo'
import {
	DASHBOARD_ROUTES_METADATA,
	dashboardIndexPath
} from './constants/DASHBOARD_ROUTES_METADATA'
import { type RouterMetadata } from './types/metaData'

/**
 * @component DashBoardWrapper
 * @description Layout principal que aplica control de acceso y pasa el contexto de rutas permitidas.
 */
const DashboardWrapper = memo(() => {
	const location = useLocation()
	const isDashboardIndex = location.pathname === dashboardIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	// 1. Calcular las rutas de sub-dashboard a las que el usuario tiene acceso
	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: DASHBOARD_ROUTES_METADATA,
		indexPath: dashboardIndexPath
	})

	// 2. Lógica de Redirección/Acceso Denegado
	// Si está en /dashboard (índice) Y no tiene permisos para ninguna sub-ruta.
	if (isDashboardIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}
	// 3. Determinar Metadatos para SEO y Título de Página
	const currentMetadata = useMemo(
		() =>
			DASHBOARD_ROUTES_METADATA[location.pathname] ||
			DASHBOARD_ROUTES_METADATA[dashboardIndexPath],
		[location.pathname]
	)

	const title = currentMetadata?.title
	const description = currentMetadata?.description

	// 4. Construir Breadcrumbs
	const breadcrumbSegments = useMemo(() => {
		if (isDashboardIndex) {
			return ['Dashboard']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Dashboard', href: dashboardIndexPath },
			// Tomamos la primera parte del título ('Equipos de Computación')
			currentMetadata.title.split(' | ')[0] || currentMetadata.title
		]
		return segments
	}, [isDashboardIndex, currentMetadata?.title])
	// 5. Renderizar Layout y Contenido Anidado
	return (
		<>
			<Seo title={title} description={description} />
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<Suspense fallback={<div>Cargando...</div>}>
				<Outlet context={permittedSubRoutes} />
			</Suspense>
		</>
	)
})

export default DashboardWrapper

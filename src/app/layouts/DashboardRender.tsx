import { memo, Suspense, useMemo } from 'react'
import { Outlet, type Location } from 'react-router-dom'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Seo } from '@/shared/ui/Seo'
import {
	DASHBOARD_ROUTES_METADATA,
	dashboardIndexPath
} from './constants/DASHBOARD_ROUTES_METADATA'

export const DashboardRender = memo(
	({
		isDashboardIndex,
		pathname
	}: {
		isDashboardIndex: boolean
		pathname: Location['pathname']
	}) => {
		// 1. Calcular las rutas de sub-dashboard a las que el usuario tiene acceso
		const { permittedSubRoutes } = usePermittedSubRoutes({
			routerMetada: DASHBOARD_ROUTES_METADATA,
			indexPath: dashboardIndexPath
		})
		// 3. Determinar Metadatos para SEO y Título de Página
		const currentMetadata = useMemo(
			() =>
				DASHBOARD_ROUTES_METADATA[pathname] ||
				DASHBOARD_ROUTES_METADATA[dashboardIndexPath],
			[pathname]
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
				title.split(' | ')[0] || title
			]
			return segments
		}, [isDashboardIndex, title])
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
	}
)

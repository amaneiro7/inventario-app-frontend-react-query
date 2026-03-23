import { memo, Suspense } from 'react'
import { Outlet, type Location } from 'react-router-dom'
import {
	DASHBOARD_ROUTES_METADATA,
	dashboardIndexPath
} from './constants/DASHBOARD_ROUTES_METADATA'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Seo } from '@/shared/ui/Seo'

export const DashboardWrapperRender = memo(
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
		const currentMetadata =
			DASHBOARD_ROUTES_METADATA[pathname] || DASHBOARD_ROUTES_METADATA[dashboardIndexPath]

		const title = currentMetadata?.title
		const description = currentMetadata?.description

		// 4. Construir Breadcrumbs
		const breadcrumbSegments = (() => {
			if (isDashboardIndex) {
				return ['Dashboard']
			}
			return [
				{ label: 'Dashboard', href: dashboardIndexPath },
				title.split(' | ')[0] || title
			]
		})()

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

DashboardWrapperRender.displayName = 'DashboardWrapperRender'

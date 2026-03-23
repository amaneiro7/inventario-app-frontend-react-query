import { Suspense } from 'react'
import { Outlet, type Location } from 'react-router-dom'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import {
	MONITORING_ROUTES_METADATA,
	monitoringIndexPath
} from './constants/MONITORING_ROUTES_METADATA'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'

export const MonitoringWrapperRender = ({
	isMonitoringBaseIndex,
	pathname
}: {
	isMonitoringBaseIndex: boolean
	pathname: Location['pathname']
}) => {
	// 1. Calcular las rutas de sub-dashboard a las que el usuario tiene acceso
	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: MONITORING_ROUTES_METADATA,
		indexPath: monitoringIndexPath
	})

	const currentMetadata =
		MONITORING_ROUTES_METADATA[pathname] || MONITORING_ROUTES_METADATA[monitoringIndexPath]

	const title = currentMetadata?.title
	const description = currentMetadata?.description

	const breadcrumbSegments = (() => {
		if (isMonitoringBaseIndex) {
			return ['Monitoreo']
		}
		return [
			{ label: 'Monitoreo', href: monitoringIndexPath },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title // Toma la parte antes del '|' si existe, o el título completo
		]
	})()

	return (
		<>
			<Seo title={title} description={description} />
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<ErrorBoundary>
					<Suspense>
						<Outlet context={permittedSubRoutes} />
					</Suspense>
				</ErrorBoundary>
			</DetailsWrapper>
		</>
	)
}

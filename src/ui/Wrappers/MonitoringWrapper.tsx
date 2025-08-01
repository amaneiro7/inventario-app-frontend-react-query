import { memo, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '../PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'

const MonitoringWrapper = memo(() => {
	const location = useLocation()
	const isMonitoringBaseIndex = location.pathname === '/monitoring'
	const outletTitle = useOutletContext<string>()

	const routeMetadata = useMemo(
		(): Record<string, { title: string; description: string }> => ({
			'/monitoring': {
				title: 'Panel de Monitoreo de Red',
				description:
					'Visualiza el estado general de la red y la conectividad de tus dispositivos.'
			},
			'/monitoring/location': {
				title: 'Monitoreo de Ubicaciones Individuales',
				description:
					'Consulta el estado en tiempo real, histórico de pings y detalles de cada ubicación.'
			},
			'/monitoring/device': {
				title: 'Monitoreo de Dispositivos Individuales',
				description:
					'Consulta el estado en tiempo real, histórico de pings y detalles de cada dispositivo.'
			},
			'/monitoring/agencymap': {
				title: 'Mapa de Conectividad de Agencias',
				description:
					'Visualiza el estado de los enlaces y la conectividad de las agencias a nivel nacional.'
			},
			'/monitoring/administrativesitemap': {
				title: 'Mapa de Conectividad de Torres Administrativas',
				description:
					'Visualiza el estado de los equipos de red activos en las torres administrativas a nivel nacional.'
			}
		}),
		[]
	)

	const currentMetadata = routeMetadata[location.pathname] || {
		// Fallback for paths not explicitly defined in routeMetadata
		title: 'Monitoreo del Sistema',
		description: 'Explora el estado y la información de monitoreo de los activos del sistema.'
	}
	// Prioritize outletTitle if available, otherwise use metadata title
	const title = outletTitle || currentMetadata.title
	// If outletTitle exists, generate a dynamic description.
	// Otherwise, use the description from currentMetadata.
	const description = outletTitle
		? `Información detallada y monitoreo en tiempo real de ${outletTitle.toLowerCase()}.`
		: currentMetadata.description

	const breadcrumbSegments = useMemo(() => {
		if (isMonitoringBaseIndex) {
			return ['Monitoreo']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Monitoreo', href: '/monitoring' },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title // Toma la parte antes del '|' si existe, o el título completo
		]
		return segments
	}, [isMonitoringBaseIndex, currentMetadata.title])

	return (
		<>
			{/* SEO component updated with dynamic title and description */}
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			{/* Page Title */}
			<PageTitle title={title} />
			{/* Outlet for nested routes, with title passed as context */}
			<DetailsWrapper>
				<Suspense>
					<Outlet context={title} />
				</Suspense>
			</DetailsWrapper>
		</>
	)
})

export default MonitoringWrapper

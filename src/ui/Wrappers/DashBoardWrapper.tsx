import { memo, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '../PageTitle'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Seo } from '@/shared/ui/Seo'

const DashboardWrapper = memo(() => {
	const location = useLocation()
	const isDashboardIndex = location.pathname === '/dashboard'
	const outletTitle = useOutletContext<string>()

	const routeMetadata = useMemo(
		(): Record<string, { title: string; description: string }> => ({
			'/dashboard': {
				title: 'Dashboards | Visión General',
				description:
					'Selecciona el dashboard que necesitas para obtener una visión general del sistema. Accede a paneles de control de computadoras, monitores y más.'
			},
			'/dashboard/computer': {
				title: 'Equipos de Computación | Dashboard',
				description:
					'Panel de control dedicado a los equipos de computación. Visualiza métricas clave, estado y tendencias de los equipos.'
			},
			'/dashboard/monitor': {
				title: 'Monitores | Dashboard',
				description:
					'Dashboard para la visualización de información de monitores. Obtén detalles sobre el inventario y el estado.'
			},
			'/dashboard/printer': {
				title: 'Impresoras | Dashboard',
				description:
					'Panel de control para la gestión de impresoras. Visualiza el estado y la información relevante.'
			},
			'/dashboard/parts': {
				title: 'Partes | Dashboard',
				description:
					'Dashboard que ofrece una visión general de las partes y componentes del sistema de inventario.'
			},
			'/dashboard/finantialprinter': {
				title: 'Impresoras Financieras | Dashboard',
				description:
					'Panel de control específico para la gestión de impresoras financieras. Visualiza información relevante.'
			},
			'/dashboard/usuarios': {
				title: 'Gestión de Empleados | Dashboard',
				description:
					'Dashboard para la gestión de empleados. Visualiza información clave del personal y accede a herramientas de administración.'
			}
		}),
		[]
	)

	const currentMetadata = routeMetadata[location.pathname] || routeMetadata['/dashboard']
	const title = outletTitle || currentMetadata.title
	const description = outletTitle
		? `Panel principal que ofrece una visión general y acceso a las funcionalidades de ${outletTitle.toLowerCase()}. Explora la información clave y las herramientas de gestión.`
		: currentMetadata.description

	const breadcrumbSegments = useMemo(() => {
		if (isDashboardIndex) {
			return ['Dashboard']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Dashboard', href: '/dashboard' },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title
		]
		return segments
	}, [isDashboardIndex, currentMetadata.title])
	return (
		<>
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<Suspense>
				<Outlet context={title} />
			</Suspense>
		</>
	)
})

export default DashboardWrapper

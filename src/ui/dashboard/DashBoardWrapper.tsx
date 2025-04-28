import { memo, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '../PageTitle'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'
import { Seo } from '@/components/Seo'

const DashboardWrapper = memo(() => {
	const location = useLocation()
	const isDashboardIndex = location.pathname === '/dashboard'

	const routeTitles = useMemo(
		(): Record<string, string> => ({
			'/dashboard/computer': 'Dashboard de equipos de computación',
			'/dashboard/monitor': 'Lista de monitores',
			'/dashboard/printer': 'Lista de impresoras',
			'/dashboard/parts': 'Lista de partes',
			'/dashboard/finantialprinter': 'Lista de impresoras financieras',
			'/dashboard/usuarios': 'Gestión de empleados',
			'/dashboard/model': 'Lista de modelos',
			'/dashboard/location': 'Lista de sitios',
			'/dashboard/history': 'Historial de cambios'
		}),
		[]
	)

	const defaultTitle = useMemo(() => {
		for (const route in routeTitles) {
			if (location.pathname.includes(route)) {
				return routeTitles[route]
			}
		}
		return 'Selección de Dashboards | Visión General del Sistema'
	}, [location.pathname, routeTitles])

	const outletTitle = useOutletContext<string>()
	const title = outletTitle || defaultTitle
	const description = useMemo(() => {
		if (isDashboardIndex) {
			return 'Elige el dashboard que deseas visualizar para obtener información específica sobre el sistema, incluyendo el dashboard principal, gestión de computadoras y monitoreo de pantallas.'
		} else {
			return `Panel principal que ofrece una visión general y acceso a las funcionalidades de ${title.toLowerCase()}. Explora la información clave y las herramientas de gestión.`
		}
	}, [isDashboardIndex, title])

	const breadcrumbSegments = useMemo(() => {
		if (isDashboardIndex) {
			return ['Dashboard']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Dashboard', href: '/dashboard' },
			title
		]
		return segments
	}, [title])
	return (
		<>
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />

			<Outlet context={title} />
		</>
	)
})

export default DashboardWrapper

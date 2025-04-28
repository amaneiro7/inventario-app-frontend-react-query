import { memo, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from './PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { Seo } from '@/components/Seo'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'

const ListWrapper = memo(() => {
	const location = useLocation()

	const routeTitles = useMemo(
		(): Record<string, string> => ({
			'/computer': 'Lista de equipos de computación',
			'/monitor': 'Lista de monitores',
			'/printer': 'Lista de impresoras',
			'/parts': 'Lista de partes',
			'/finantialprinter': 'Lista de impresoras financieras',
			'/usuarios': 'Gestión de empleados',
			'/model': 'Lista de modelos',
			'/location': 'Lista de sitios',
			'/history': 'Historial de cambios'
		}),
		[]
	)

	const defaultTitle = useMemo(() => {
		for (const route in routeTitles) {
			if (location.pathname.includes(route)) {
				return routeTitles[route]
			}
		}
		return 'Lista'
	}, [location.pathname, routeTitles])

	const outletTitle = useOutletContext<string>()
	const title = outletTitle || defaultTitle
	const description = `Página con la ${title}. Explora, filtra y gestiona la información de ${title.toLowerCase()}.`

	const breadcrumbSegments = useMemo(() => {
		const segments: (string | { label: string; href?: string })[] = ['Listas', title]
		return segments
	}, [title])

	return (
		<>
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<Outlet context={title} />
			</DetailsWrapper>
		</>
	)
})

export default ListWrapper

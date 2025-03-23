import { memo, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from './PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'

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
			'/location': 'Lista de sitios'
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
	return (
		<>
			<PageTitle title={title} />
			<DetailsWrapper>
				<Outlet context={title} />
			</DetailsWrapper>
		</>
	)
})

export default ListWrapper

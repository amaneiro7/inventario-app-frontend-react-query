import { memo, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { PageTitle } from './PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'

const ListWrapper = memo(() => {
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

	const title = useMemo(() => {
		const path = location.pathname
		for (const route in routeTitles) {
			if (path.includes(route)) {
				return routeTitles[route]
			}
		}
		return 'Lista'
	}, [location.pathname, routeTitles])
	return (
		<>
			<PageTitle title={title} />
			<DetailsWrapper>
				<Outlet />
			</DetailsWrapper>
		</>
	)
})

export default ListWrapper

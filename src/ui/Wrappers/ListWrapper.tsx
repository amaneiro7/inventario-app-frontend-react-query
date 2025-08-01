import { memo, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '../PageTitle'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'

const ListWrapper = memo(() => {
	const location = useLocation()
	const isListIndex = location.pathname === '/list'
	const outletTitle = useOutletContext<string>()

	const routeMetadata = useMemo(
		(): Record<string, { title: string; description: string }> => ({
			'/list': {
				title: 'Listados Generales',
				description:
					'Explora todas las listas de inventario disponibles. Encuentra y accede a la información organizada por categorías.'
			},
			'/list/computer': {
				title: 'Equipos de Computación | Listado',
				description:
					'Consulta el listado completo de equipos de computación disponibles. Filtra, busca y gestiona la información detallada de cada equipo.'
			},
			'/list/monitor': {
				title: 'Monitores | Listado',
				description:
					'Página con la lista de monitores. Explora especificaciones, estado y realiza acciones de gestión.'
			},
			'/list/finantialprinter': {
				title: 'Impresoras Financieras | Listado',
				description:
					'Listado de impresoras financieras disponibles. Revisa detalles y gestiona su información.'
			},
			'/list/printer': {
				title: 'Impresoras | Listado',
				description:
					'Explora la lista de impresoras. Accede a detalles técnicos y opciones de gestión.'
			},
			'/list/parts': {
				title: 'Partes | Listado',
				description:
					'Listado de partes de equipos. Consulta disponibilidad y gestiona su inventario.'
			},
			'/list/usuarios': {
				title: 'Gestión de Empleados',
				description:
					'Administra la información de los empleados. Crea, edita y gestiona los registros de personal de forma eficiente.'
			},
			'/list/model': {
				title: 'Modelos | Listado',
				description:
					'Lista de modelos de equipos. Consulta detalles y gestiona la información de los modelos.'
			},
			'/list/location': {
				title: 'Sitios | Listado',
				description:
					'Listado de sitios o ubicaciones. Gestiona la información de los diferentes sitios.'
			},
			'/list/history': {
				title: 'Historial de Cambios',
				description:
					'Revisa el registro completo del historial de cambios realizados en el sistema. Mantente al tanto de las modificaciones.'
			}
		}),
		[]
	)

	const currentMetadata = routeMetadata[location.pathname] || {
		title: 'Listados Generales',
		description: 'Explora todas las listas de inventario disponibles.'
	}
	const title = outletTitle || currentMetadata.title
	const description = outletTitle
		? `Página con la ${outletTitle}. Explora, filtra y gestiona la información de ${outletTitle.toLowerCase()}.`
		: currentMetadata.description

	const breadcrumbSegments = useMemo(() => {
		if (isListIndex) {
			return ['Listas']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Listas', href: '/list' },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title // Toma la parte antes del '|' si existe, o el título completo
		]
		return segments
	}, [isListIndex, currentMetadata.title])

	return (
		<>
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<Suspense>
					<Outlet context={title} />
				</Suspense>
			</DetailsWrapper>
		</>
	)
})

export default ListWrapper

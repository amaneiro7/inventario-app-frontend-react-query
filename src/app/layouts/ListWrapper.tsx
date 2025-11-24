import { memo, Suspense, useMemo } from 'react'
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { LIST_ROUTES_METADATA, listIndexPath } from './constants/LIST_ROUTES_METADATA'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { PageTitle } from '@/shared/ui/PageTitle'
import { ListWrapperSkeleton } from './ListWrapperSkeleton'
import { type RouterMetadata } from './types/metaData'
/**
 * @component ListWrapper
 * @description Layout principal que aplica control de acceso y pasa el contexto de rutas permitidas.
 */
const ListWrapper = memo(() => {
	const location = useLocation()
	const isListIndex = location.pathname === listIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	// 1. Calcular las rutas de sub-dashboard a las que el usuario tiene acceso
	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: LIST_ROUTES_METADATA,
		indexPath: listIndexPath
	})

	if (isListIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}

	const currentMetadata = useMemo(
		() => LIST_ROUTES_METADATA[location.pathname] ?? LIST_ROUTES_METADATA[listIndexPath],
		[location.pathname]
	)
	const title = currentMetadata?.title
	const description = currentMetadata?.description

	const breadcrumbSegments = useMemo(() => {
		if (isListIndex) {
			return ['Listas']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Listas', href: listIndexPath },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title // Toma la parte antes del '|' si existe, o el título completo
		]
		return segments
	}, [isListIndex, currentMetadata?.title])

	return (
		<>
			<Seo title={title} description={description} />
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<Suspense fallback={<ListWrapperSkeleton />}>
					<Outlet context={permittedSubRoutes} />
				</Suspense>
			</DetailsWrapper>
		</>
	)
})

export default ListWrapper

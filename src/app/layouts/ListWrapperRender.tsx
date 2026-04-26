import { Suspense } from 'react'
import { Outlet, type Location } from 'react-router-dom'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { LIST_ROUTES_METADATA, listIndexPath } from './constants/LIST_ROUTES_METADATA'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { PageTitle } from '@/shared/ui/PageTitle'
import { ListWrapperSkeleton } from './ListWrapperSkeleton'

export const ListWrapperRender = ({
	isListIndex,
	pathname
}: {
	isListIndex: boolean
	pathname: Location['pathname']
}) => {
	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: LIST_ROUTES_METADATA,
		indexPath: listIndexPath
	})
	const currentMetadata = LIST_ROUTES_METADATA[pathname] ?? LIST_ROUTES_METADATA[listIndexPath]

	const title = currentMetadata?.title
	const description = currentMetadata?.description

	const breadcrumbSegments = (() => {
		if (isListIndex) {
			return ['Listas']
		}
		return [{ label: 'Listas', href: listIndexPath }, title.split(' | ')[0] || title]
	})()

	return (
		<>
			<Seo title={title} description={description} />
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<ErrorBoundary>
					<Suspense fallback={<ListWrapperSkeleton />}>
						<Outlet context={permittedSubRoutes} />
					</Suspense>
				</ErrorBoundary>
			</DetailsWrapper>
		</>
	)
}

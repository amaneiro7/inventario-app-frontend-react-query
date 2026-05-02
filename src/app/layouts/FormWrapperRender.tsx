import { Suspense } from 'react'
import { Outlet, type Location } from 'react-router-dom'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { FORM_ROUTES_METADATA, formIndexPath } from './constants/FORM_ROUTES_METADATA'
import { capitalizeFirstLetter } from '@/shared/lib/utils/capitalizeFirstLetter'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Loading } from '@/shared/ui/Loading'

export const FormWrapperRender = ({
	isFormIndex,
	pathname
}: {
	isFormIndex: boolean
	pathname: Location['pathname']
}) => {
	const mode = useGetFormMode()

	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: FORM_ROUTES_METADATA,
		indexPath: formIndexPath
	})
	const currentMetadata = FORM_ROUTES_METADATA[pathname] || FORM_ROUTES_METADATA[formIndexPath]

	const title = (() => {
		const entityName = currentMetadata?.title || ''
		if (mode === 'add') {
			return `Registrar ${capitalizeFirstLetter(entityName)} | Formulario`
		} else if (mode === 'edit') {
			return `Editar ${capitalizeFirstLetter(entityName)} | Formulario`
		} else if (mode === 'unknown') {
			return `Gestión de ${capitalizeFirstLetter(entityName)} | Formulario`
		} else {
			return entityName || 'Formulario'
		}
	})()

	const description = currentMetadata?.description

	const breadcrumbSegments = (() => {
		if (isFormIndex) {
			return ['Formularios']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Formularios', href: formIndexPath }
		]

		const entityLabel = currentMetadata?.title

		if (title.includes('Registrar')) {
			segments.push(`Registrar ${capitalizeFirstLetter(entityLabel)}`)
		} else if (title.includes('Editar')) {
			segments.push(`Editar ${capitalizeFirstLetter(entityLabel)}`)
		} else if (entityLabel) {
			segments.push(`Gestión de ${capitalizeFirstLetter(entityLabel)}`)
		} else {
			segments.push(title.split(' | ')[0] || title)
		}
		return segments
	})()
	return (
		<>
			<Seo title={title} description={description} />
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<Outlet context={permittedSubRoutes} />
					</Suspense>
				</ErrorBoundary>
			</DetailsWrapper>
		</>
	)
}

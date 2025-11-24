import { memo, Suspense, useMemo } from 'react'
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { capitalizeFirstLetter } from '@/shared/lib/utils/capitalizeFirstLetter'
import { FORM_ROUTES_METADATA, formIndexPath } from './constants/FORM_ROUTES_METADATA'
import { type RouterMetadata } from './types/metaData'
import { usePermittedSubRoutes } from './model/usePermittedSubRoutes'
import { Loading } from '@/shared/ui/Loading'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

/**
 * `FormWrapper`
 * @component
 * @description Componente de layout que envuelve las páginas de formularios.
 * Proporciona un título de página dinámico, breadcrumbs, optimización SEO y un contenedor de estilo (`DetailsWrapper`).
 * Determina el modo del formulario (añadir/editar) y ajusta el título y la descripción en consecuencia.
 * @returns {JSX.Element} El layout del formulario con el contenido de la ruta anidada.
 */
const FormWrapper = memo(() => {
	const location = useLocation()
	const isFormIndex = location.pathname === formIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()
	const mode = useGetFormMode()

	const pathname = useMemo(() => {
		const parts = location.pathname.split('/')
		const form = parts[1]
		const entity = parts[2] ? `/${parts[2]}` : ''
		return `/${form}${entity}`
	}, [location.pathname])

	// 1. Calcular las rutas de sub-formularios a las que el usuario tiene acceso
	const { permittedSubRoutes } = usePermittedSubRoutes({
		routerMetada: FORM_ROUTES_METADATA,
		indexPath: formIndexPath
	})

	// 2. Lógica de Redirección/Acceso Denegado
	// Si está en /dashboard (índice) Y no tiene permisos para ninguna sub-ruta.
	if (isFormIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}
	const currentMetadata = useMemo(
		() => FORM_ROUTES_METADATA[pathname] || FORM_ROUTES_METADATA[formIndexPath],

		[pathname]
	)

	const title = useMemo(() => {
		const entityName = currentMetadata?.title || ''
		if (mode === 'add') {
			return `Registrar ${capitalizeFirstLetter(entityName)} | Formulario`
		} else if (mode === 'edit') {
			return `Editar ${capitalizeFirstLetter(entityName)} | Formulario`
		} else if (mode === 'unknown') {
			return `Getsión de ${capitalizeFirstLetter(entityName)} | Formulario`
		} else {
			return entityName || 'Formulario'
		}
	}, [currentMetadata, mode])

	const description = currentMetadata?.description

	const breadcrumbSegments = useMemo(() => {
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
			segments.push(title.split(' | ')[0] || title) // Fallback si no se encuentra la entidad
		}
		return segments
	}, [isFormIndex, title])

	return (
		<>
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
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
})

export default FormWrapper

import { lazy, memo, useMemo } from 'react'
import { Navigate, useLocation, useOutletContext } from 'react-router-dom'
import { formIndexPath } from './constants/FORM_ROUTES_METADATA'
import { type RouterMetadata } from './types/metaData'

const FormWrapperRender = lazy(() =>
	import('./FormWrapperRender').then(m => ({ default: m.FormWrapperRender }))
)

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

	const pathname = useMemo(() => {
		const parts = location.pathname.split('/')
		const form = parts[1]
		const entity = parts[2] ? `/${parts[2]}` : ''
		return `/${form}${entity}`
	}, [location.pathname])

	// 2. Lógica de Redirección/Acceso Denegado
	// Si está en /dashboard (índice) Y no tiene permisos para ninguna sub-ruta.
	if (isFormIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}

	return <FormWrapperRender isFormIndex={isFormIndex} pathname={pathname} />
})

FormWrapper.displayName = 'FormWrapper'

export default FormWrapper

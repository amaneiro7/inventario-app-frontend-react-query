import { memo, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '../PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { Seo } from '@/components/Seo'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

const FormWrapper = memo(() => {
	const location = useLocation()
	const isFormIndex = location.pathname === '/form'
	const outletTitle = useOutletContext<string>()
	const mode = useGetFormMode()

	const routeTitles = useMemo(
		(): Record<string, string> => ({
			'/form/device': 'Dispositivo',
			'/form/model': 'Modelo',
			'/form/brand': 'Marca',
			'/form/processor': 'Procesador',
			'/form/employee': 'Empleado',
			'/form/directvia': 'Directiva',
			'/form/vicepresidenciaejecutiva': 'Vicepresidencia Ejecutiva',
			'/form/vicepresidencia': 'Vicepresidencia',
			'/form/departamento': 'Departamento',
			'/form/cargo': 'Cargo',
			'/form/location': 'Ubicación',
			'/form/site': 'Sitio',
			'/form/city': 'Ciudad',
			'/form/region': 'Región'
		}),
		[]
	)

	const defaultTitle = useMemo(() => {
		if (isFormIndex) {
			return 'Selección de Formularios | Gestión de Sistema'
		}
		for (const route in routeTitles) {
			if (location.pathname.includes(route)) {
				const entityName = routeTitles[route]
				if (mode === 'add') {
					return `Registrar ${capitalizeFirstLetter(entityName)} | Formulario`
				} else if (mode === 'edit') {
					return `Editar ${capitalizeFirstLetter(entityName)} | Formulario`
				} else {
					return `Formulario de ${capitalizeFirstLetter(entityName)}`
				}
			}
		}
		return 'Formulario General' // Fallback
	}, [location.pathname, routeTitles, mode, isFormIndex])

	const title = outletTitle || defaultTitle
	const description = useMemo(() => {
		if (isFormIndex) {
			return 'Elige el formulario que deseas completar para registrar o modificar información del sistema.'
		} else {
			const action =
				mode === 'add' ? 'registrar' : mode === 'edit' ? 'editar o modificar' : 'gestionar'
			return `Página con el formulario para ${action} información relacionada con ${title.toLowerCase()}. Completa los campos requeridos y guarda los cambios.`
		}
	}, [isFormIndex, title, mode])

	const breadcrumbSegments = useMemo(() => {
		if (isFormIndex) {
			return ['Formularios']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Formularios', href: '/form' }
		]

		let entityLabel = ''
		for (const route in routeTitles) {
			if (location.pathname.includes(route)) {
				entityLabel = routeTitles[route]
				break
			}
		}

		if (title.includes('Registrar')) {
			segments.push(`Registrar ${capitalizeFirstLetter(entityLabel)}`)
		} else if (title.includes('Editar')) {
			segments.push(`Editar ${capitalizeFirstLetter(entityLabel)}`)
		} else if (entityLabel) {
			segments.push(`Gestión ${capitalizeFirstLetter(entityLabel)}`)
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
				<Suspense>
					<Outlet context={title} />
				</Suspense>
			</DetailsWrapper>
		</>
	)
})

export default FormWrapper

import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Define los posibles modos en que puede operar un formulario.
 * - 'add': Para crear una nueva entidad.
 * - 'edit': Para modificar una entidad existente.
 * - 'view': Para mostrar los detalles de una entidad en modo de solo lectura (opcional).
 * - 'unknown': Cuando el modo no puede ser determinado.
 */
export type FormMode = 'edit' | 'add' | 'view' | 'unknown'

export function useGetFormMode(): FormMode {
	const location = useLocation()

	const mode: FormMode = useMemo(() => {
		const segments = location.pathname.split('/').filter(Boolean)
		const lastSegment = segments[segments.length - 1]

		if (lastSegment === 'add') return 'add'
		if (segments.includes('edit')) return 'edit' // Mantenemos 'includes' por si la ruta es /form/entity/edit/:id

		// Por defecto, si no es 'add' ni 'edit', podríamos considerarlo 'view' o 'unknown'
		// dependiendo de la lógica de tu aplicación. 'unknown' es más seguro.
		return 'unknown'
	}, [location.pathname])

	return mode
}

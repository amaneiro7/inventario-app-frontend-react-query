import { useState, useCallback, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError' // Asegúrate de tener la ruta correcta
import { type FormMode, useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'

interface FormRoutingContext {
	id: string | undefined
	location: ReturnType<typeof useLocation>
	navigate: ReturnType<typeof useNavigate>
	mode: FormMode
	isNotFound: boolean
	// Funciones para manejar el estado de error 404/Not Found
	setNotFound: (isNotFound: boolean) => void
	checkIsNotFound: (error: Error | null) => void
}

/**
 * @function useFormRoutingContext
 * @description Centraliza la lógica de routing (id, mode, navigate) y el estado de error 404 común en formularios de edición/creación.
 */
export function useFormRoutingContext(): FormRoutingContext {
	const { id } = useParams<{ id: string }>()
	const location = useLocation()
	const navigate = useNavigate()
	const mode = useGetFormMode()
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const setNotFound = useCallback((value: boolean) => {
		setIsNotFound(value)
	}, [])

	/**
	 * @description Verifica si un error es una instancia de NotFoundError (HTTP 404).
	 */
	const checkIsNotFound = useCallback((error: Error | null) => {
		if (error instanceof NotFoundError) {
			// Asumimos que NotFoundError ya tiene el código 404 fijo, pero lo verificamos por robustez
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}
		console.log(error)
	}, [])

	// El id de la ruta siempre será una cadena o undefined
	const routeId = useMemo(() => id, [id])

	return {
		id: routeId,
		location,
		navigate,
		mode,
		isNotFound,
		setNotFound,
		checkIsNotFound
	}
}

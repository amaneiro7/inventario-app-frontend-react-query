import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { VicepresidenciaEjecutivaGetService } from '../service/vicepresidenciaEjecutivaGet.service'
import { VicepresidenciaEjecutivaGetter } from '../../application/VicepresidenciaEjecutivaGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapVicepresidenciaEjecutivaToState } from '../../lib/mapVicepresidenciaEjecutivaToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type DefaultVicepresidenciaEjecutiva } from '../reducers/vicepresidenciaEjecutivaFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const repository = new VicepresidenciaEjecutivaGetService()
const get = new VicepresidenciaEjecutivaGetter(repository)

/**
 * A React hook that manages the initial state for the executive vicepresidencia form.
 * It fetches executive vicepresidencia data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the executive vicepresidencia form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useVicepresidenciaEjecutivaInitialData(
	defaultState: DefaultVicepresidenciaEjecutiva
): {
	initialData: DefaultVicepresidenciaEjecutiva
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	// 1. Datos iniciales del estado de la ruta (si existen)
	const initialDataFromState = location.state?.vicepresidenciaEjecutiva
		? mapVicepresidenciaEjecutivaToState(location.state.vicepresidenciaEjecutiva)
		: undefined
	const [state, setState] = useState<DefaultVicepresidenciaEjecutiva>(defaultState)

	const {
		data: vicepresidenciaEjecutivaData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['vicepresidenciaEjecutiva', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: (failureCount, error: AxiosError) => {
			// No reintentar si es un error 404
			if (error.response?.status === 404) {
				return false
			}
			// No reintentar si es un error 401 (el interceptor ya lo maneja, pero un reintento de RQ no haría daño)
			// O si el interceptor falla, permitir que RQ lo intente de nuevo.
			if (error.response?.status === 401) {
				return failureCount < 2 // Intentar solo una vez más, por ejemplo
			}
			// Para otros errores, usar el comportamiento por defecto (hasta 3 reintentos)
			return failureCount < 3
		},
		select: data => mapVicepresidenciaEjecutivaToState(data)
	})

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('vicepresidenciaEjecutiva')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		if (vicepresidenciaEjecutivaData) {
			setState(vicepresidenciaEjecutivaData)
		}
	}, [mode, vicepresidenciaEjecutivaData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('vicepresidenciaEjecutiva')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialData: state,
		isLoading,
		isError,
		isNotFound,
		refreshInitialData,
		onRetry
	}
}

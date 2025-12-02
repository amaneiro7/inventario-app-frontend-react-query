import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { VicepresidenciaGetService } from '../service/vicepresidenciaGet.service'
import { VicepresidenciaGetter } from '../../application/VicepresidenciaGetter'
import { mapVicepresidenciaToState } from '../../lib/mapVicepresidenciaToState'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultVicepresidencia } from '../reducers/vicepresidenciaFormReducer'

const repository = new VicepresidenciaGetService()
const get = new VicepresidenciaGetter(repository)

/**
 * A React hook that manages the initial state for the vicepresidencia form.
 * It fetches vicepresidencia data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the vicepresidencia form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useVicepresidenciaInitialData(defaultState: DefaultVicepresidencia): {
	initialData: DefaultVicepresidencia
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
	const initialDataFromState = location.state?.vicepresidencia
		? mapVicepresidenciaToState(location.state.vicepresidencia)
		: undefined
	const [state, setState] = useState<DefaultVicepresidencia>(defaultState)

	const {
		data: vicepresidenciaData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['vicepresidencia', id],
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
		select: data => mapVicepresidenciaToState(data)
	})

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('vicepresidencia')) {
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

		if (vicepresidenciaData) {
			setState(vicepresidenciaData)
		}
	}, [mode, vicepresidenciaData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('vicepresidencia')) return

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

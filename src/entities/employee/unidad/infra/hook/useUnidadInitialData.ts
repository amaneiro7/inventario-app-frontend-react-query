import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UnidadGetService } from '../service/unidadGet.service'
import { UnidadGetter } from '../../application/UnidadGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapUnidadToState } from '../../lib/mapUnidadToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultUnidad } from '../reducers/unidadFormReducer'

const repository = new UnidadGetService()
const get = new UnidadGetter(repository)

/**
 * A React hook that manages the initial state for the Unidad form.
 * It fetches Unidad data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the Unidad form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useUnidadInitialData(defaultState: DefaultUnidad): {
	initialData: DefaultUnidad
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.Unidad
		? mapUnidadToState(location.state.Unidad)
		: undefined

	const {
		data: UnidadData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['unidad', id],
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
		select: data => mapUnidadToState(data)
	})

	const [state, setState] = useState<DefaultUnidad>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('unidad')) {
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

		if (UnidadData) {
			setState(UnidadData)
		}
	}, [mode, UnidadData, location.state, defaultState, navigate, id])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the Unidad data to revert changes.
	 */
	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('unidad')) return

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

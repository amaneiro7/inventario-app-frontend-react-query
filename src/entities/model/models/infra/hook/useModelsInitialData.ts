import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ModelGetter } from '../../application/ModelGetter'
import { ModelGetService } from '../service/modelGet.service'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapModelsToState } from '../../lib/mapModelsToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type DefaultModel } from '../reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new ModelGetService()
const get = new ModelGetter(repository)

/**
 * Custom hook for managing the initial state of a model form.
 * It fetches model data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the model form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useModelInitialData(defaultState: DefaultModel): {
	initialData: DefaultModel
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
	const initialDataFromState = location.state?.model
		? mapModelsToState(location.state.model)
		: undefined
	const [state, setState] = useState<DefaultModel>(defaultState) // Local state of the model.

	// Query to get model data if in edit mode and no data is present in the location state.
	const {
		data: modelData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['model', id], // Query key for caching.
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
		select: data => mapModelsToState(data)
	})

	// Side effect to handle initial state and state update when dependencies change.
	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('model')) {
			setState({
				...defaultState,
				id: undefined
			})
			return
		}

		if (mode === 'edit' && !id) {
			navigate('/error', { replace: true })
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		if (modelData) {
			setState(modelData)
		}
	}, [mode, modelData, location.state, defaultState, navigate, id])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the model data to revert changes.
	 */
	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('model')) return

		if (mode === 'add') {
			setState(defaultState)
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

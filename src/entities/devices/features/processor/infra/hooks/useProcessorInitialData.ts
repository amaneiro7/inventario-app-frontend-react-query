import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProcessorGetService } from '../service/processorGet.service'
import { ProcessorGetter } from '../../application/ProcessorGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { adaptProcessorData } from '../../lib/adaptProcessorData'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultProcessor } from '../reducers/processorFormReducer'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new ProcessorGetService()
const get = new ProcessorGetter(repository)

/**
 * `useProcessorInitialData`
 * @function
 * @description Hook personalizado para manejar el estado inicial de una marca en un formulario (creación o edición).
 * Obtiene los datos de la marca desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultProcessor} defaultState - El estado inicial por defecto de la marca.
 * @returns {{ initialData: DefaultProcessor; refreshInitialData: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function useProcessorInitialData(defaultState: DefaultProcessor): {
	initialData: DefaultProcessor
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()
	const initialDataFromState = location.state?.processor
		? adaptProcessorData(location.state.processor)
		: undefined

	const {
		data: processorData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['processor', id],
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
		select: data => adaptProcessorData(data)
	})

	// 💡 OPTIMIZACIÓN 4: Sincronizar el estado local (state) con los datos de RQ
	// Esta es la única razón por la que necesitamos un estado local después de la carga inicial
	const [state, setState] = useState<DefaultProcessor>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('processor')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error', { replace: true })
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		if (processorData) {
			setState(processorData)
		}
	}, [mode, error, processorData, location.state, defaultState, navigate])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('processor')) return
		if (mode === 'add') {
			setState({
				...defaultState,
				id: undefined
			})
		} else if (id) {
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// Aseguramos que isNotFound se resetee cuando se intente recargar
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

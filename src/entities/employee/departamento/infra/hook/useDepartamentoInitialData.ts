import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DepartamentoGetService } from '../service/departamentoGet.service'
import { DepartamentoGetter } from '../../application/DepartamentoGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapDepartamentoToState } from '../../lib/mapDepartamentoToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type DefaultDepartamento } from '../reducers/departamentoFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const repository = new DepartamentoGetService()
const get = new DepartamentoGetter(repository)

/**
 * A React hook that manages the initial state for the departamento form.
 * It fetches departamento data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the departamento form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useDepartamentoInitialData(defaultState: DefaultDepartamento): {
	initialData: DefaultDepartamento
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.departamento
		? location.state.departamento
		: undefined

	const {
		data: departamentoData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['departamento', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapDepartamentoToState(data)
	})
	const [state, setState] = useState<DefaultDepartamento>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('departamento')) {
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

		if (departamentoData) {
			setState(departamentoData)
		}
	}, [mode, departamentoData, location.state, defaultState, navigate, id])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the departamento data to revert changes.
	 */
	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('departamento')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, mapDepartamentoToState, id])

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

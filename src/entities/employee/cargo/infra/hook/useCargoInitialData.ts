import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CargoGetService } from '../service/cargoGet.service'
import { CargoGetter } from '../../application/CargoGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapCargoToState } from '../../lib/mapCargoToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultCargo } from '../reducers/cargoFormReducer'

const repository = new CargoGetService()
const get = new CargoGetter(repository)

/**
 * A React hook that manages the initial state for the cargo form.
 * It fetches cargo data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the cargo form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useCargoInitialData(defaultState: DefaultCargo): {
	initialData: DefaultCargo
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.cargo
		? mapCargoToState(location.state.cargo)
		: undefined

	const {
		data: cargoData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['cargo', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapCargoToState(data)
	})

	const [state, setState] = useState<DefaultCargo>(initialDataFromState || defaultState)
	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('cargo')) {
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
		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.

		if (cargoData) {
			setState(cargoData)
		}
	}, [mode, cargoData, location.state, defaultState, navigate, id])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the cargo data to revert changes.
	 */
	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('cargo')) return

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

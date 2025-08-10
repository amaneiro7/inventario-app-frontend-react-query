import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { CargoGetService } from '../service/cargoGet.service'
import { CargoGetter } from '../../application/CargoGetter'
import { type DefaultCargo } from '../reducers/cargoFormReducer'
import { type CargoDto } from '../../domain/dto/Cargo.dto'

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
export function useCargoInitialState(defaultState: DefaultCargo): {
	initialState: DefaultCargo
	resetState: () => void
	mode: 'edit' | 'add'
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultCargo>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const {
		data: cargoData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['cargo', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.cargo,
		retry: false
	})

	/**
	 * Maps the fetched CargoDto to the DefaultCargo form state.
	 * @param cargo - The CargoDto object fetched from the API.
	 */
	const mapCargoToState = useCallback((cargo: CargoDto): void => {
		setState({
			id: cargo.id,
			name: cargo.name,
			departamentos: cargo?.departamentos?.map(departamento => departamento.id) ?? [],
			updatedAt: cargo.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('cargo')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (error?.message.includes('Recurso no encontrado.')) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		if (location?.state?.cargo) {
			setState(location.state.cargo)
		} else if (cargoData) {
			mapCargoToState(cargoData)
		}
	}, [mode, cargoData, location.state, defaultState, navigate, id, mapCargoToState])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the cargo data to revert changes.
	 */
	const resetState = useCallback(async () => {
		if (!location.pathname.includes('cargo')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mapCargoToState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mapCargoToState, id])

	return {
		mode,
		initialState: state,
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry: refetch
	}
}

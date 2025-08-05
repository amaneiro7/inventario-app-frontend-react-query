import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { DirectivaGetService } from '../service/directivaGet.service'
import { DirectivaGetter } from '../../application/DirectivaGetter'
import { type DefaultDirectiva } from '../reducers/directivaFormReducer'
import { type DirectivaDto } from '../../domain/dto/Directiva.dto'

const repository = new DirectivaGetService()
const get = new DirectivaGetter(repository)

/**
 * A React hook that manages the initial state for the directiva form.
 * It fetches directiva data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the directiva form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useDirectivaInitialState(defaultState: DefaultDirectiva): {
	initialState: DefaultDirectiva
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultDirectiva>(defaultState)

	const { data: directivaData, refetch } = useQuery({
		queryKey: ['directiva', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.directiva,
		retry: false
	})

	/**
	 * Maps the fetched DirectivaDto to the DefaultDirectiva form state.
	 * @param directiva - The DirectivaDto object fetched from the API.
	 */
	const mappedDirectivaState = useCallback((directiva: DirectivaDto): void => {
		setState({
			id: directiva.id,
			name: directiva.name,
			cargos: directiva.cargos.map(cargo => cargo.id),
			updatedAt: directiva.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('directiva')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.directiva) {
			setState(location.state.directiva)
		} else if (directivaData) {
			mappedDirectivaState(directivaData)
		}
	}, [mode, directivaData, location.state, defaultState, navigate, id, mappedDirectivaState])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the directiva data to revert changes.
	 */
	const resetState = useCallback(async () => {
		if (!location.pathname.includes('directiva')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedDirectivaState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedDirectivaState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}
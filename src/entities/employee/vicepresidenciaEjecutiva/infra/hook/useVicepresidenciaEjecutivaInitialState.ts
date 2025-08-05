import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { VicepresidenciaEjecutivaGetService } from '../service/vicepresidenciaEjecutivaGet.service'
import { VicepresidenciaEjecutivaGetter } from '../../application/VicepresidenciaEjecutivaGetter'
import { type DefaultVicepresidenciaEjecutiva } from '../reducers/vicepresidenciaEjecutivaFormReducer'
import { type VicepresidenciaEjecutivaDto } from '../../domain/dto/VicepresidenciaEjecutiva.dto'

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
export function useVicepresidenciaEjecutivaInitialState(
	defaultState: DefaultVicepresidenciaEjecutiva
): {
	initialState: DefaultVicepresidenciaEjecutiva
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultVicepresidenciaEjecutiva>(defaultState)

	const { data: vicepresidenciaEjecutivaData, refetch } = useQuery({
		queryKey: ['vicepresidenciaEjecutiva', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.vicepresidenciaEjecutiva,
		retry: false
	})

	/**
	 * Maps the fetched VicepresidenciaEjecutivaDto to the DefaultVicepresidenciaEjecutiva form state.
	 * @param vicepresidenciaEjecutiva - The VicepresidenciaEjecutivaDto object fetched from the API.
	 */
	const mappedVicepresidenciaEjecutivaState = useCallback(
		(vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto): void => {
			setState({
				id: vicepresidenciaEjecutiva.id,
				name: vicepresidenciaEjecutiva.name,
				directivaId: vicepresidenciaEjecutiva.directivaId,
				cargos: vicepresidenciaEjecutiva.cargos?.map(cargo => cargo.id),
				updatedAt: vicepresidenciaEjecutiva?.updatedAt
			})
		},
		[]
	)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('vicepresidenciaEjecutiva')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.vicepresidenciaEjecutiva) {
			setState(location.state.vicepresidenciaEjecutiva)
		} else if (vicepresidenciaEjecutivaData) {
			mappedVicepresidenciaEjecutivaState(vicepresidenciaEjecutivaData)
		}
	}, [
		mode,
		vicepresidenciaEjecutivaData,
		location.state,
		defaultState,
		navigate,
		id,
		mappedVicepresidenciaEjecutivaState
	])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('vicepresidenciaEjecutiva')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedVicepresidenciaEjecutivaState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedVicepresidenciaEjecutivaState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { DirectivaGetService } from '../service/directivaGet.service'
import { DirectivaGetter } from '../../application/DirectivaGetter'
import { type DefaultDirectiva } from '../reducers/directivaFormReducer'
import { type DirectivaDto } from '../../domain/dto/Directiva.dto'

const repository = new DirectivaGetService()
const get = new DirectivaGetter(repository)
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

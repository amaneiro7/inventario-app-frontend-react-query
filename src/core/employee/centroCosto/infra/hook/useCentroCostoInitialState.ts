import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { CentroCostoGetService } from '../service/centroCostoGet.service'
import { CentroCostoGetter } from '../../application/CentroCostoGetter'
import { type DefaultCentroCosto } from '../reducers/centroCostoFormReducer'
import { type CentroCostoDto } from '../../domain/dto/CentroCosto.dto'

const repository = new CentroCostoGetService()
const get = new CentroCostoGetter(repository)
export function useCentroCostoInitialState(defaultState: DefaultCentroCosto): {
	initialState: DefaultCentroCosto
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultCentroCosto>(defaultState)

	const { data: centroCostoData, refetch } = useQuery({
		queryKey: ['centroCosto', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.centroCosto,
		retry: false
	})

	const mappedCentroCostoState = useCallback((centroCosto: CentroCostoDto): void => {
		setState({
			id: centroCosto.id,
			name: centroCosto.name,
			updatedAt: centroCosto.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('centrocosto')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.centroCosto) {
			setState(location.state.centroCosto)
		} else if (centroCostoData) {
			mappedCentroCostoState(centroCostoData)
		}
	}, [mode, centroCostoData, location.state, defaultState, navigate, id, mappedCentroCostoState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('centrocosto')) return

		if (mode === 'add') {
			setState({ ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedCentroCostoState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedCentroCostoState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}

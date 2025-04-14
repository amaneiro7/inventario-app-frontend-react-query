import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { VicepresidenciaGetService } from '../service/vicepresidenciaGet.service'
import { VicepresidenciaGetter } from '../../application/VicepresidenciaGetter'
import { type DefaultVicepresidencia } from '../reducers/vicepresidenciaFormReducer'
import { type VicepresidenciaDto } from '../../domain/dto/Vicepresidencia.dto'

const repository = new VicepresidenciaGetService()
const get = new VicepresidenciaGetter(repository)
export function useVicepresidenciaInitialState(defaultState: DefaultVicepresidencia): {
	initialState: DefaultVicepresidencia
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultVicepresidencia>(defaultState)

	const { data: vicepresidenciaData, refetch } = useQuery({
		queryKey: ['vicepresidencia', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.vicepresidencia,
		retry: false
	})

	const mappedVicepresidenciaState = useCallback((vicepresidencia: VicepresidenciaDto): void => {
		setState({
			id: vicepresidencia.id,
			name: vicepresidencia.name,
			vicepresidenciaEjecutivaId: vicepresidencia.vicepresidenciaEjecutivaId
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('vicepresidencia')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.vicepresidencia) {
			setState(location.state.vicepresidencia)
		} else if (vicepresidenciaData) {
			mappedVicepresidenciaState(vicepresidenciaData)
		}
	}, [
		mode,
		vicepresidenciaData,
		location.state,
		defaultState,
		navigate,
		id,
		mappedVicepresidenciaState
	])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('vicepresidencia')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedVicepresidenciaState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedVicepresidenciaState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}

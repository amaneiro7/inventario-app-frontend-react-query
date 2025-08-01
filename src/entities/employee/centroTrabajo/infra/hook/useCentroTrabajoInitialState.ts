import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { CentroTrabajoGetService } from '../service/centroTrabajoGet.service'
import { CentroTrabajoGetter } from '../../application/CentroTrabajoGetter'
import { type DefaultCentroTrabajo } from '../reducers/centroTrabajoFormReducer'
import { type CentroTrabajoDto } from '../../domain/dto/CentroTrabajo.dto'

const repository = new CentroTrabajoGetService()
const get = new CentroTrabajoGetter(repository)
export function useCentroTrabajoInitialState(defaultState: DefaultCentroTrabajo): {
	initialState: DefaultCentroTrabajo
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultCentroTrabajo>(defaultState)

	const { data: centroTrabajoData, refetch } = useQuery({
		queryKey: ['centroTrabajo', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.centroTrabajo,
		retry: false
	})

	const mappedCentroTrabajoState = useCallback((centroTrabajo: CentroTrabajoDto): void => {
		setState({
			id: centroTrabajo.id,
			name: centroTrabajo.name,
			centroCostoId: centroTrabajo.centroCostoId,
			updatedAt: centroTrabajo.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('centroTrabajo')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.centroTrabajo) {
			setState(location.state.centroTrabajo)
		} else if (centroTrabajoData) {
			mappedCentroTrabajoState(centroTrabajoData)
		}
	}, [
		mode,
		centroTrabajoData,
		location.state,
		defaultState,
		navigate,
		id,
		mappedCentroTrabajoState
	])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('centroTrabajo')) return

		if (mode === 'add') {
			setState({ ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedCentroTrabajoState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedCentroTrabajoState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}

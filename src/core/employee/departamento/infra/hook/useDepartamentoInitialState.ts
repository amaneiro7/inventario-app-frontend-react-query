import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { DepartamentoGetService } from '../service/departamentoGet.service'
import { DepartamentoGetter } from '../../application/DepartamentoGetter'
import { type DefaultDepartamento } from '../reducers/departamentoFormReducer'
import { type DepartamentoDto } from '../../domain/dto/Departamento.dto'

const repository = new DepartamentoGetService()
const get = new DepartamentoGetter(repository)
export function useDepartamentoInitialState(defaultState: DefaultDepartamento): {
	initialState: DefaultDepartamento
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultDepartamento>(defaultState)

	const { data: departamentoData, refetch } = useQuery({
		queryKey: ['departamento', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.departamento,
		retry: false
	})

	const mapDepartamentoToState = useCallback((departamento: DepartamentoDto): void => {
		setState({
			id: departamento.id,
			name: departamento.name,
			directivaId: departamento.vicepresidencia?.vicepresidenciaEjecutiva?.directivaId,
			vicepresidenciaEjecutivaId: departamento?.vicepresidencia?.vicepresidenciaEjecutivaId,
			vicepresidenciaId: departamento?.vicepresidencia?.id,
			cargos: departamento.cargos.map(cargo => cargo.id),
			updatedAt: departamento.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('departamento')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.departamento) {
			setState(location.state.departamento)
		} else if (departamentoData) {
			mapDepartamentoToState(departamentoData)
		}
	}, [mode, departamentoData, location.state, defaultState, navigate, id, mapDepartamentoToState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('departamento')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mapDepartamentoToState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mapDepartamentoToState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}

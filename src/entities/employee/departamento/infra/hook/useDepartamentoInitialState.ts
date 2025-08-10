import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { DepartamentoGetService } from '../service/departamentoGet.service'
import { DepartamentoGetter } from '../../application/DepartamentoGetter'
import { type DefaultDepartamento } from '../reducers/departamentoFormReducer'
import { type DepartamentoDto } from '../../domain/dto/Departamento.dto'

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
export function useDepartamentoInitialState(defaultState: DefaultDepartamento): {
	initialState: DefaultDepartamento
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
	const [state, setState] = useState<DefaultDepartamento>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const {
		data: departamentoData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['departamento', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.departamento,
		retry: false
	})

	/**
	 * Maps the fetched DepartamentoDto to the DefaultDepartamento form state.
	 * @param departamento - The DepartamentoDto object fetched from the API.
	 */
	const mapDepartamentoToState = useCallback((departamento: DepartamentoDto): void => {
		setState({
			id: departamento.id,
			name: departamento.name,
			directivaId: departamento.vicepresidencia?.vicepresidenciaEjecutiva?.directiva.id,
			vicepresidenciaEjecutivaId: departamento?.vicepresidencia?.vicepresidenciaEjecutiva?.id,
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

		if (error?.message.includes('Recurso no encontrado.')) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		if (location?.state?.departamento) {
			setState(location.state.departamento)
		} else if (departamentoData) {
			mapDepartamentoToState(departamentoData)
		}
	}, [mode, departamentoData, location.state, defaultState, navigate, id, mapDepartamentoToState])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the departamento data to revert changes.
	 */
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
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry: refetch
	}
}

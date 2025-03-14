import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { CargoGetService } from '../service/cargoGet.service'
import { CargoGetter } from '../../application/CargoGetter'
import { type DefaultCargo } from '../reducers/cargoFormReducer'
import { type CargoDto } from '../../domain/dto/Cargo.dto'

const repository = new CargoGetService()
const get = new CargoGetter(repository)
export function useCargoInitialState(defaultState: DefaultCargo): {
	initialState: DefaultCargo
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultCargo>(defaultState)

	const { data: cargoData, refetch } = useQuery({
		queryKey: ['cargo', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.cargo,
		retry: false
	})

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

		if (location?.state?.cargo) {
			setState(location.state.cargo)
		} else if (cargoData) {
			mapCargoToState(cargoData)
		}
	}, [mode, cargoData, location.state, defaultState, navigate, id, mapCargoToState])

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
		resetState
	}
}

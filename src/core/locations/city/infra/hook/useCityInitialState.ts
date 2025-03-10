import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { CityGetService } from '../service/cityGet.service'
import { CityGetter } from '../../application/CityGetter'
import { type DefaultCity } from '../reducers/cityFormReducer'
import { type CityDto } from '../../domain/dto/City.dto'

export function useCityInitialState(defaulState: DefaultCity): {
	initialState: DefaultCity
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultCity>(defaulState)

	const repository = useMemo(() => new CityGetService(), [])
	const get = useMemo(() => new CityGetter(repository), [repository])

	const { data: cityData, refetch } = useQuery({
		queryKey: ['city', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.city,
		retry: false
	})

	const mappedCityState = useCallback((city: CityDto): void => {
		setState({
			id: city.id,
			name: city.name,
			stateId: city.stateId,
			regionId: city.state.regionId
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('city')) {
			setState(defaulState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.city) {
			setState(location.state.city)
		} else if (cityData) {
			mappedCityState(cityData)
		}
	}, [mode, cityData, location.state, defaulState, navigate, id, mappedCityState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('city')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaulState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedCityState(data)
			}
		}
	}, [defaulState, location.pathname, mode, refetch, mappedCityState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}

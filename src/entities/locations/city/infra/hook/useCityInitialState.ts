import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { CityGetService } from '../service/cityGet.service'
import { CityGetter } from '../../application/CityGetter'
import { type DefaultCity } from '../reducers/cityFormReducer'
import { type CityDto } from '../../domain/dto/City.dto'

const repository = new CityGetService()
const get = new CityGetter(repository)

export function useCityInitialState(defaultState: DefaultCity): {
	initialState: DefaultCity
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
	const [state, setState] = useState<DefaultCity>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const {
		data: cityData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
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
			regionId: city.state.regionId,
			administrativeRegionId: city.state.region.administrativeRegionId
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('city')) {
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

		if (location?.state?.city) {
			setState(location.state.city)
		} else if (cityData) {
			mappedCityState(cityData)
		}
	}, [mode, cityData, location.state, defaultState, navigate, id, mappedCityState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('city')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedCityState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedCityState, id])

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

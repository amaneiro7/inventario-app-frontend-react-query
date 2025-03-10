import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { LocationGetService } from '../service/locationGet.service'
import { LocationGetter } from '../../application/LocationGetter'
import { type DefaultLocation } from '../reducers/locationFormReducer'
import { type LocationDto } from '../../domain/dto/Location.dto'

const repository = new LocationGetService()
const get = new LocationGetter(repository)

export function useLocationInitialState(defaulState: DefaultLocation): {
	initialState: DefaultLocation
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultLocation>(defaulState)

	const { data: locationData, refetch } = useQuery({
		queryKey: ['location', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.location,
		retry: false
	})

	const mappedLocationState = useCallback((location: LocationDto): void => {
		setState({
			id: location.id,
			typeOfSiteId: location.typeOfSiteId,
			regionId: location.site?.city.state?.regionId,
			stateId: location.site?.city?.stateId,
			cityId: location.site?.cityId,
			siteId: location.siteId,
			siteName: location.site?.name,
			name: location.name,
			subnet: location.subnet,
			updatedAt: location?.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('location')) {
			console.log('Use effect locarion')
			setState({
				id: undefined,
				...defaulState
			})
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.Location) {
			setState(location.state.location)
		} else if (locationData) {
			mappedLocationState(locationData)
		}
	}, [mode, locationData, location.state, defaulState, navigate, id, mappedLocationState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('location')) return

		if (mode === 'add') {
			setState(defaulState)
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedLocationState(data)
			}
		}
	}, [defaulState, location.pathname, mode, refetch, mappedLocationState, id])
	console.log('inital location state', state)
	return {
		mode,
		initialState: state,
		resetState
	}
}

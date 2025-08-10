import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { RegionGetService } from '../service/regionGet.service'
import { RegionGetter } from '../../application/RegionGetter'
import { type DefaultRegion } from '../reducers/regionFormReducer'
import { type RegionDto } from '../../domain/dto/region.dto'

const repository = new RegionGetService()
const get = new RegionGetter(repository)

export function useRegionInitialState(defaultState: DefaultRegion): {
	initialState: DefaultRegion
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
	const [state, setState] = useState<DefaultRegion>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const {
		data: regionData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['region', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.region,
		retry: false
	})

	const mappedRegionState = useCallback((region: RegionDto): void => {
		setState({
			id: region.id,
			name: region.name,
			administrativeRegionId: region.administrativeRegionId
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('region')) {
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

		if (location?.state?.region) {
			setState(location.state.region)
		} else if (regionData) {
			mappedRegionState(regionData)
		}
	}, [mode, regionData, location.state, defaultState, navigate, id, mappedRegionState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('region')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedRegionState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedRegionState, id])

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

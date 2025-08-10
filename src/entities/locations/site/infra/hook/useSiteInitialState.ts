import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { SiteGetService } from '../service/siteGet.service'
import { SiteGetter } from '../../application/SiteGetter'
import { type DefaultSite } from '../reducers/siteFormReducer'
import { type SiteDto } from '../../domain/dto/Site.dto'

const siteGetService = new SiteGetService()
const siteGetter = new SiteGetter(siteGetService)

export function useSiteInitialState(defaultState: DefaultSite): {
	initialState: DefaultSite
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
	const [state, setState] = useState<DefaultSite>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const {
		data: siteData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['site', id],
		queryFn: () => (id ? siteGetter.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.site,
		retry: false
	})

	const mappedSiteState = useCallback((site: SiteDto): void => {
		setState({
			id: site.id,
			name: site.name,
			address: site.address,
			cityId: site.cityId,
			stateId: site.city?.stateId,
			regionId: site.city?.state?.regionId
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('site')) {
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

		if (location?.state?.Site) {
			setState(location.state.Site)
		} else if (siteData) {
			mappedSiteState(siteData)
		}
	}, [mode, siteData, location.state, defaultState, navigate, id, mappedSiteState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('site')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedSiteState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedSiteState, id])

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

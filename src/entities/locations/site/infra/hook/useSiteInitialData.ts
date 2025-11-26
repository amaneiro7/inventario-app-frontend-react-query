import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SiteGetService } from '../service/siteGet.service'
import { SiteGetter } from '../../application/SiteGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapSiteToState } from '../../lib/mapSiteToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultSite } from '../reducers/siteFormReducer'

const repository = new SiteGetService()
const get = new SiteGetter(repository)

export function useSiteInitialData(defaultState: DefaultSite): {
	initialData: DefaultSite
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()
	const initialDataFromState = location.state?.site
		? mapSiteToState(location.state.site)
		: undefined

	const {
		data: siteData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['site', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapSiteToState(data)
	})

	const [state, setState] = useState<DefaultSite>(defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('site')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}
		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		if (siteData) {
			setState(siteData)
		}
	}, [mode, siteData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('site')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialData: state,
		isLoading,
		isError,
		isNotFound,
		refreshInitialData,
		onRetry
	}
}

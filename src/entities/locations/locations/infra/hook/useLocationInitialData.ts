import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LocationGetService } from '../service/locationGet.service'
import { LocationGetter } from '../../application/LocationGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapLocationFromState } from '../../lib/mapLocationFromState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultLocation } from '../reducers/locationFormReducer'

const repository = new LocationGetService()
const get = new LocationGetter(repository)

export function useLocationInitialData(defaultState: DefaultLocation): {
	initialData: DefaultLocation
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.location ? location.state.location : undefined

	const {
		data: locationData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['location', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapLocationFromState(data)
	})
	const [state, setState] = useState<DefaultLocation>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('location')) {
			setState({
				...defaultState,
				id: undefined
			})
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

		if (locationData) {
			setState(locationData)
		}
	}, [mode, locationData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('location')) return

		if (mode === 'add') {
			setState(defaultState)
		} else if (id) {
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

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

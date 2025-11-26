import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RegionGetService } from '../service/regionGet.service'
import { RegionGetter } from '../../application/RegionGetter'
import { mapRegionToState } from '../../lib/mapRegionToState'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultRegion } from '../reducers/regionFormReducer'

const repository = new RegionGetService()
const get = new RegionGetter(repository)

export function useRegionInitialData(defaultState: DefaultRegion): {
	initialData: DefaultRegion
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	// 1. Datos iniciales del estado de la ruta (si existen)
	const initialDataFromState = location.state?.region
		? mapRegionToState(location.state.region)
		: undefined

	const {
		data: regionData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['region', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapRegionToState(data)
	})

	const [state, setState] = useState<DefaultRegion>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode !== 'edit' || !location.pathname.includes('region')) {
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
		if (regionData) {
			setState(regionData)
		}
	}, [mode, regionData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('region')) return

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

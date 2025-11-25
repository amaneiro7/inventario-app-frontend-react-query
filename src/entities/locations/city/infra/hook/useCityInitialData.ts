import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CityGetService } from '../service/cityGet.service'
import { CityGetter } from '../../application/CityGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapCityToState } from '../../lib/mapCityToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultCity } from '../reducers/cityFormReducer'

const repository = new CityGetService()
const get = new CityGetter(repository)

/**
 * `useCityInitialData`
 * @function
 * @description Hook personalizado para manejar el estado inicial de una marca en un formulario (creación o edición).
 * Obtiene los datos de la marca desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultCity} defaultState - El estado inicial por defecto de la marca.
 * @returns {{ initialData: DefaultCity; refreshInitialData: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function useCityInitialData(defaultState: DefaultCity): {
	initialData: DefaultCity
	refreshInitialData: () => void
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.city
		? mapCityToState(location.state.city)
		: undefined

	const {
		data: cityData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['city', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapCityToState(data)
	})

	const [state, setState] = useState<DefaultCity>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('city')) {
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

		if (cityData) {
			setState(cityData)
		}
	}, [mode, cityData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('city')) return

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

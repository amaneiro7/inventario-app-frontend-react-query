import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ISPLinkGetService } from '../service/ispLinkGet.service'
import { ISPLinkGetter } from '../../application/ISPLinkGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapISPLinkToState } from '../../lib/mapISPLinkToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultISPLink } from '../reducers/ispLinkFormReducer'

const repository = new ISPLinkGetService()
const get = new ISPLinkGetter(repository)

/**
 * `useISPLinkInitialData`
 * @function
 * @description Hook personalizado para manejar el estado inicial de un proveedor de servicio isp en un formulario (creación o edición).
 * Obtiene los datos del proveedor de servicio isp desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultISPLink} defaultState - El estado inicial por defecto del proveedor de servicio isp.
 * @returns {{ initialData: DefaultISPLink; refreshInitialData: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial del proveedor de servicio isp, una función para resetear el estado y el modo actual del formulario.
 */
export function useISPLinkInitialData(defaultState: DefaultISPLink): {
	initialData: DefaultISPLink
	refreshInitialData: () => void
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.ISPLink
		? mapISPLinkToState(location.state.ISPLink)
		: undefined

	const {
		data: ispLinkData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['isp-link', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: (failureCount, error: AxiosError) => {
			// No reintentar si es un error 404
			if (error.response?.status === 404) {
				return false
			}
			// No reintentar si es un error 401 (el interceptor ya lo maneja, pero un reintento de RQ no haría daño)
			// O si el interceptor falla, permitir que RQ lo intente de nuevo.
			if (error.response?.status === 401) {
				return failureCount < 2 // Intentar solo una vez más, por ejemplo
			}
			// Para otros errores, usar el comportamiento por defecto (hasta 3 reintentos)
			return failureCount < 3
		},
		select: data => mapISPLinkToState(data)
	})

	const [state, setState] = useState<DefaultISPLink>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('isp-link')) {
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

		if (ispLinkData) {
			setState(ispLinkData)
		}
	}, [mode, ispLinkData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('isp-link')) return

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

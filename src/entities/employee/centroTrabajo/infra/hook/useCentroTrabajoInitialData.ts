import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CentroTrabajoGetService } from '../service/centroTrabajoGet.service'
import { CentroTrabajoGetter } from '../../application/CentroTrabajoGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapCentroTrabajoToState } from '../../lib/mapCentroTrabajoToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type DefaultCentroTrabajo } from '../reducers/centroTrabajoFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const repository = new CentroTrabajoGetService()
const get = new CentroTrabajoGetter(repository)
export function useCentroTrabajoInitialData(defaultState: DefaultCentroTrabajo): {
	initialData: DefaultCentroTrabajo
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
	const initialDataFromState = location.state?.centroTrabajo
		? mapCentroTrabajoToState(location.state.centroTrabajo)
		: undefined

	const {
		data: centroTrabajoData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['centroTrabajo', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapCentroTrabajoToState(data)
	})
	const [state, setState] = useState<DefaultCentroTrabajo>(initialDataFromState || defaultState)

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('centroTrabajo')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error', { replace: true })
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		if (centroTrabajoData) {
			setState(centroTrabajoData)
		}
	}, [mode, centroTrabajoData, location.state, defaultState, navigate, id])

	const refreshInitialData = useCallback(async () => {
		if (!location.pathname.includes('centroTrabajo')) return

		if (mode === 'add') {
			setState({ ...defaultState })
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

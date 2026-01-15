import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { EmployeeGetService } from '../service/employeeGet.service'
import { EmployeeGetter } from '../../application/EmployeeGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { mapEmployeeToState } from '../../lib/mapEmployeeToState'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultEmployee } from '../reducers/employeeFormReducer'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'

const repository = new EmployeeGetService()
const get = new EmployeeGetter(repository)

/**
 * A React hook that manages the initial state for the employee form.
 * It fetches employee data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the employee form.
 * @returns An object containing the initial state, a reset function, the form mode, and a loading indicator.
 */
export function useEmployeeInitialData(defaultState: DefaultEmployee): {
	initialData: DefaultEmployee
	employeeData: EmployeeDto | undefined
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = useMemo(
		() =>
			location.state?.employee
				? mapEmployeeToState(location.state.employee).mappedData
				: undefined,
		[location.state?.employee, mapEmployeeToState]
	)

	const { data, refetch, error, isError, isLoading } = useQuery({
		queryKey: ['employee', id],
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
		select: data => mapEmployeeToState(data)
	})

	const [initialData, setInitialData] = useState<DefaultEmployee>(
		initialDataFromState || defaultState
	)

	// Efecto para manejar errores y redirecciones
	useEffect(() => {
		if (mode === 'edit' && !id) {
			navigate('/error', { replace: true })
			return
		}
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('employee')) {
			setInitialData({ ...defaultState })
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)
		if (data) {
			setInitialData(data.mappedData)
		}
	}, [mode, id, data, location.pathname, defaultState, navigate, isError, error])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the employee data to revert changes.
	 */
	const refreshInitialData = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('employee')) return
		if (mode === 'add') {
			setInitialData({
				...defaultState,
				id: undefined
			})
			// Si el modo es agregar, resetea el estado al estado por defecto creando un nuevo objeto.
		} else if (id) {
			// Si el modo es editar, vuelve a obtener los datos de la marca de la API y actualiza el estado.
			await refetch()
		}
	}, [])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

	return {
		mode,
		initialData,
		employeeData: data?.originalData,
		isLoading,
		isError,
		isNotFound,
		refreshInitialData,
		onRetry
	}
}

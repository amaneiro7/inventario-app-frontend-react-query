import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AccessPolicyGetter } from '../../application/AccessPolicyGetter'
import { AccessPolicyGetService } from '../service/accessPolicyGet.service'
import { mapAccessPolicyToState } from './mapAccessPolicyToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode, useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultAccessPolicy } from '../reducers/accessPolicyFormReducer'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const get = new AccessPolicyGetter(new AccessPolicyGetService())

/**
 * `useAccessPolicyInitialState`
 * @function
 * @description Hook personalizado para manejar el estado inicial de una marca en un formulario (creación o edición).
 * Obtiene los datos de la marca desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultAccessPolicy} defaultState - El estado inicial por defecto de la marca.
 * @returns {{ initialState: DefaultAccessPolicy; resetState: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function useAccessPolicyInitialState(defaultState: DefaultAccessPolicy): {
	initialState: DefaultAccessPolicy
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	resetState: () => void
	onRetry: () => void
} {
	const { id } = useParams() // Obtiene el ID de la marca de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.
	const mode = useGetFormMode() // Obtiene el modo del formulario (editar o agregar).
	const [isNotFound, setIsNotFound] = useState<boolean>(false)
	const initialDataFromState = location.state?.accessPolicy
		? mapAccessPolicyToState(location.state.processor)
		: undefined

	// Consulta para obtener los datos de la marca si el modo es editar y no hay datos en el estado de la ubicación.
	const {
		data: accessPolicyData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['accessPolicy', id], // Clave de la consulta para la caché.
		queryFn: () => {
			if (!id) {
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id,
		retry: false,
		select: data => mapAccessPolicyToState(data)
	})

	const [state, setState] = useState<DefaultAccessPolicy>(initialDataFromState || defaultState) // Estado local de la marca.

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('access-policy')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error', { replace: true })
			return
		}

		if (error instanceof NotFoundError && error.statusCode === 404) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.

		if (accessPolicyData) {
			// Si hay datos de la API, actualiza el estado con esos datos.
			setState(accessPolicyData)
		}
	}, [mode, error, accessPolicyData, location.state, defaultState, navigate, id])

	/**
	 * Resetea el estado del formulario a su valor inicial o a los datos obtenidos de la API en modo edición.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando el estado ha sido reseteado.
	 */
	const resetState = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('access-policiy')) return
		if (mode === 'add') {
			setState({
				...defaultState,
				id: undefined
			})
			// Si el modo es agregar, resetea el estado al estado por defecto creando un nuevo objeto.
		} else if (id) {
			// Si el modo es editar, vuelve a obtener los datos de la marca de la API y actualiza el estado.
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	const onRetry = useCallback(() => {
		setIsNotFound(false)
		refetch()
	}, [refetch, setIsNotFound])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialState: state,
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry
	}
}

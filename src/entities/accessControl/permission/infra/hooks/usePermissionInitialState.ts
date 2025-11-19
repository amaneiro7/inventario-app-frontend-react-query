import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { PermissionGetter } from '../../application/PermissionGetter'
import { PermissionGetService } from '../service/permissionGet.service'
import { type DefaultPermission } from '../reducers/permissionFormReducer'
import { type PermissionDto } from '../../domain/dto/Permission.dto'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const get = new PermissionGetter(new PermissionGetService())

/**
 * `usePermissionInitialState`
 * @function
 * @description Hook personalizado para manejar el estado inicial de una marca en un formulario (creación o edición).
 * Obtiene los datos de la marca desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultPermission} defaultState - El estado inicial por defecto de la marca.
 * @returns {{ initialState: DefaultPermission; resetState: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function usePermissionInitialState(defaultState: DefaultPermission): {
	initialState: DefaultPermission
	resetState: () => void
	mode: 'edit' | 'add'
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id } = useParams() // Obtiene el ID de la marca de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.
	const [state, setState] = useState<DefaultPermission>(defaultState) // Estado local de la marca.
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const mode = useGetFormMode() // Obtiene el modo del formulario (editar o agregar).

	// Consulta para obtener los datos de la marca si el modo es editar y no hay datos en el estado de la ubicación.
	const {
		data: permissionData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['permission', id], // Clave de la consulta para la caché.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Función para obtener los datos de la marca.
		enabled: !!id && mode === 'edit' && !location?.state?.permission, // Habilita la consulta solo si hay un ID, el modo es editar y no hay datos en el estado de la ubicación.
		retry: false // Deshabilita los reintentos automáticos en caso de error.
	})

	/**
	 * Mapea un objeto `PermissionDto` a la estructura `DefaultPermission` para el estado del formulario.
	 * @param {PermissionDto} permission - El objeto `PermissionDto` a mapear.
	 */
	const mapPermissionToState = useCallback((permission: PermissionDto): void => {
		setState({
			id: permission.id,
			name: permission.name,
			updatedAt: permission?.updatedAt
		})
	}, [])

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('permission')) {
			setState(defaultState)
			return
		}

		if (error?.message.includes('Recurso no encontrado.')) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.

		if (location?.state?.permission) {
			setState(location.state.permission)
		} else if (permissionData) {
			// Si hay datos de la API, actualiza el estado con esos datos.
			mapPermissionToState(permissionData)
		}
	}, [mode, permissionData, location.state, defaultState, navigate, id, error])

	/**
	 * Resetea el estado del formulario a su valor inicial o a los datos obtenidos de la API en modo edición.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando el estado ha sido reseteado.
	 */
	const resetState = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('permission')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaultState
			})
			// Si el modo es agregar, resetea el estado al estado por defecto creando un nuevo objeto.
		} else if (id) {
			// Si el modo es editar, vuelve a obtener los datos de la marca de la API y actualiza el estado.
			const { data } = await refetch()
			if (data) {
				mapPermissionToState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
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

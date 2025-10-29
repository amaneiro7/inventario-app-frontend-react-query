import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { UserGetService } from '../service/userGet.service'
import { UserGetter } from '../../application/UserGetter'
import { type DefaultUsers } from '../reducers/usersFormReducer'
import { type LoginUserDto } from '../../domain/dto/LoginUser.dto'

const repository = new UserGetService()
const get = new UserGetter(repository)

export function useUserInitialState(defaultState: DefaultUsers): {
	initialState: DefaultUsers
	resetState: () => void
	mode: 'edit' | 'register'
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id } = useParams() // Obtiene el ID del usuario de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.

	const mode = location.pathname.includes('register') ? 'register' : 'edit' // Obtiene el modo del formulario (editar o agregar).
	const [state, setState] = useState<DefaultUsers>(defaultState) // Estado local del usuario.
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	// Consulta para obtener los datos del usuario si el modo es editar y no hay datos en el estado de la ubicación.
	const {
		data: userData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['users', id], // Clave de la consulta para la caché.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Función para obtener los datos del usuario.
		enabled: !!id && !location?.state?.user, // Habilita la consulta solo si hay un ID, el modo es editar y no hay datos en el estado de la ubicación.
		retry: false // Deshabilita los reintentos automáticos en caso de error.
	})

	/**
	 * Mapea los datos del usueario obtenidos de la API al estado local.
	 * @param user Datos del user obtenidos de la API.
	 */
	const mappedUserState = useCallback((user: LoginUserDto): void => {
		setState({
			id: user.id,
			userName: user?.employee?.userName,
			email: user?.employee?.email ?? '',
			lastName: user?.employee?.lastName ?? '',
			name: user?.employee?.name ?? '',
			roleId: user.roleId,
			status: user.status,
			role: user.role,
			updatedAt: user.updatedAt
		})
	}, [])

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		if (mode === 'register') {
			setState({
				id: undefined,
				...defaultState
			})
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

		if (location?.state?.user) {
			setState(location.state.user)
		} else if (userData) {
			mappedUserState(userData)
		}
	}, [mode, userData, location.state, defaultState, navigate, id, mappedUserState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('user-management')) return

		if (mode === 'register') {
			setState(defaultState)
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedUserState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedUserState, id])

	return {
		mode,
		initialState: state,
		resetState,
		isLoading,
		isError,
		isNotFound,
		onRetry: refetch
	}
}

import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BrandGetter } from '@/core/brand/application/BrandGetter'
import { BrandGetService } from '@/core/brand/infra/service/brandGet.service'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new BrandGetService()
const get = new BrandGetter(repository)

/**
 * Hook personalizado para manejar el estado inicial de una marca en un formulario.
 * @param defaultState Estado inicial por defecto de la marca.
 * @returns Un objeto con el estado inicial, la función para resetear el estado y el modo del formulario.
 */
export function useBrandInitialState(defaultState: BrandParams): {
	initialState: BrandParams
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams() // Obtiene el ID de la marca de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.
	const [state, setState] = useState<BrandParams>(defaultState) // Estado local de la marca.

	const mode = useGetFormMode() // Obtiene el modo del formulario (editar o agregar).

	// Consulta para obtener los datos de la marca si el modo es editar y no hay datos en el estado de la ubicación.
	const { data: brandData, refetch } = useQuery({
		queryKey: ['brand', id], // Clave de la consulta para la caché.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Función para obtener los datos de la marca.
		enabled: !!id && mode === 'edit' && !location?.state?.brand, // Habilita la consulta solo si hay un ID, el modo es editar y no hay datos en el estado de la ubicación.
		retry: false // Deshabilita los reintentos automáticos en caso de error.
	})

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('brand')) {
			setState(defaultState)
			return
		}

		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.

		if (location?.state?.brand) {
			setState(location.state.brand)
		} else if (brandData) {
			// Si hay datos de la API, actualiza el estado con esos datos.
			setState(brandData)
		}
	}, [mode, brandData, location.state, defaultState, navigate, id])

	const resetState = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('brand')) return
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
				setState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialState: state,
		resetState
	}
}

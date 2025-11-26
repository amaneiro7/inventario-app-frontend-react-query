import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { BrandGetter } from '@/entities/brand/application/BrandGetter'
import { BrandGetService } from '@/entities/brand/infra/service/brandGet.service'
import { mapBrandToState } from '../../lib/mapBrandToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultBrand } from '../reducers/brandFormReducer'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new BrandGetService()
const get = new BrandGetter(repository)

/**
 * `useBrandInitialData`
 * @function
 * @description Hook personalizado para manejar el estado inicial de una marca en un formulario (creación o edición).
 * Obtiene los datos de la marca desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultBrand} defaultState - El estado inicial por defecto de la marca.
 * @returns {{ initialData: DefaultBrand; refreshInitialData: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function useBrandInitialData(defaultState: DefaultBrand): {
	initialData: DefaultBrand
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
	const initialDataFromState = location.state?.brand
		? mapBrandToState(location.state.brand)
		: undefined
	// Consulta para obtener los datos de la marca si el modo es editar y no hay datos en el estado de la ubicación.
	const {
		data: brandData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['brand', id],
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: false,
		select: data => mapBrandToState(data)
	})

	const [initialData, setInitialData] = useState<DefaultBrand>(
		initialDataFromState || defaultState
	)
	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Redireccionar si falta ID en modo edición
		if (mode === 'edit' && !id) {
			navigate('/error', { replace: true })
			return
		}
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('brand')) {
			setInitialData(defaultState)
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		if (brandData) {
			// Si hay datos de la API, actualiza el estado con esos datos.
			setInitialData(brandData)
		}
	}, [mode, id, brandData, location.pathname, defaultState, navigate, isError, error])

	/**
	 * Resetea el estado del formulario a su valor inicial o a los datos obtenidos de la API en modo edición.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando el estado ha sido reseteado.
	 */
	const refreshInitialData = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('brand')) return
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
	}, [defaultState, location.pathname, mode, refetch, id])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialData,
		isLoading,
		isError,
		isNotFound,
		refreshInitialData,
		onRetry
	}
}

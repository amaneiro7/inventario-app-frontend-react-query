import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { ModelGetter } from '../../application/ModelGetter'
import { ModelGetService } from '../service/modelGet.service'
import { ScreenSize } from '../../domain/value-object/ScreenSize'
import { type DefaultModel } from '../reducers/modelFormReducer'
import { type ModelDto } from '../../domain/dto/Model.dto'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new ModelGetService()
const get = new ModelGetter(repository)

/**
 * Hook personalizado para manejar el estado inicial de un modelo.
 * @param defaultState Estado inicial por defecto del modelo.
 * @returns Un objeto con el estado inicial, la función para resetear el estado y el modo del formulario.
 */ export function useModelInitialState(defaultState: DefaultModel): {
	initialState: DefaultModel
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams() // Obtiene el ID del modelo de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.

	const mode = useGetFormMode() // Obtiene el modo del formulario (editar o agregar).
	const [state, setState] = useState<DefaultModel>(defaultState) // Estado local del modelo.

	// Consulta para obtener los datos del modelo si el modo es editar y no hay datos en el estado de la ubicación.
	const { data: modelData, refetch } = useQuery({
		queryKey: ['model', id], // Clave de la consulta para la caché.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Función para obtener los datos del modelo.
		enabled: !!id && mode === 'edit' && !location?.state?.model, // Habilita la consulta solo si hay un ID, el modo es editar y no hay datos en el estado de la ubicación.
		retry: false // Deshabilita los reintentos automáticos en caso de error.
	})

	/**
	 * Mapea los datos del modelo obtenidos de la API al estado local.
	 * @param model Datos del modelo obtenidos de la API.
	 */
	const mappedModelState = useCallback((model: ModelDto): void => {
		const { modelComputer, modelKeyboard, modelLaptop, modelMonitor, modelPrinter } = model
		setState({
			id: model.id,
			mainCategoryId: model.category.mainCategoryId,
			categoryId: model.categoryId,
			brandId: model.brandId,
			name: model.name,
			generic: model.generic,
			updatedAt: model.updatedAt,
			hasBluetooth: modelComputer?.hasBluetooth || modelLaptop?.hasBluetooth || false,
			hasWifiAdapter: modelComputer?.hasWifiAdapter || modelLaptop?.hasWifiAdapter || false,
			hasDVI: modelComputer?.hasDVI || modelLaptop?.hasDVI || modelMonitor?.hasDVI || false,
			hasHDMI:
				modelComputer?.hasHDMI || modelLaptop?.hasHDMI || modelMonitor?.hasHDMI || false,
			hasVGA: modelComputer?.hasVGA || modelLaptop?.hasVGA || modelMonitor?.hasVGA || false,
			memoryRamSlotQuantity:
				modelComputer?.memoryRamSlotQuantity || modelLaptop?.memoryRamSlotQuantity || 0,
			memoryRamTypeId: modelComputer?.memoryRamTypeId || modelLaptop?.memoryRamTypeId || '',
			batteryModel: modelLaptop?.batteryModel ?? '',
			hasFingerPrintReader: modelKeyboard?.hasFingerPrintReader || false,
			screenSize: modelMonitor?.screenSize ?? ScreenSize.MIN,
			cartridgeModel: modelPrinter?.cartridgeModel ?? '',
			inputTypeId: modelKeyboard?.inputTypeId ?? ''
		})
	}, [])

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('model')) {
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

		if (location?.state?.model) {
			setState(location.state.model)
		} else if (modelData) {
			mappedModelState(modelData)
		}
	}, [mode, modelData, location.state, defaultState, navigate, id, mappedModelState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('model')) return

		if (mode === 'add') {
			setState(defaultState)
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedModelState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedModelState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}

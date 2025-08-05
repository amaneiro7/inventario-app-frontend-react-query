import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { ModelGetter } from '../../application/ModelGetter'
import { ModelGetService } from '../service/modelGet.service'
import { ScreenSize } from '../../domain/value-object/ScreenSize'
import { type DefaultModel } from '../reducers/modelFormReducer'
import { type ModelDto } from '../../domain/dto/Model.dto'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new ModelGetService()
const get = new ModelGetter(repository)

/**
 * Custom hook for managing the initial state of a model form.
 * It fetches model data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the model form.
 * @returns An object containing the initial state, a reset function, and the form mode.
 */
export function useModelInitialState(defaultState: DefaultModel): {
	initialState: DefaultModel
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams() // Gets the model ID from the URL parameters.
	const location = useLocation() // Gets the current URL location.
	const navigate = useNavigate() // Function to navigate to other routes.

	const mode = useGetFormMode() // Gets the form mode (edit or add).
	const [state, setState] = useState<DefaultModel>(defaultState) // Local state of the model.

	// Query to get model data if in edit mode and no data is present in the location state.
	const { data: modelData, refetch } = useQuery({
		queryKey: ['model', id], // Query key for caching.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Function to get model data.
		enabled: !!id && mode === 'edit' && !location?.state?.model, // Enables the query only if there is an ID, the mode is edit, and no data is in the location state.
		retry: false // Disables automatic retries in case of error.
	})

	/**
	 * Maps the fetched ModelDto to the DefaultModel form state.
	 * @param model - The ModelDto object fetched from the API.
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
			processors: model.processors.map(processor => processor.id),
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

	// Side effect to handle initial state and state update when dependencies change.
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
	}, [
		mode,
		modelData,
		location.state,
		defaultState,
		navigate,
		id,
		mappedModelState
	])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the model data to revert changes.
	 */
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
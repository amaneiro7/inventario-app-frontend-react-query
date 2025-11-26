import { useCallback } from 'react'
import { ShipmentCreator } from '@/entities/shipment/application/ShipmentCreator'
import { ShipmentSaveService } from '@/entities/shipment/infra/service/shipmentSave.service'
import {
	type DefaultShipment,
	initialShipmentState,
	shipmentFormReducer
} from '@/entities/shipment/infra/reducers/shipmentFormReducers'
import { useShipmentInitialData } from './useShipmentInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { type ShipmentParams } from '@/entities/shipment/domain/dto/Shipment.dto'

const repository = new ShipmentSaveService()
const shipmentCreator = new ShipmentCreator(repository, useAuthStore.getState().events)

/**
 * `useCreateShipment`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de marcas.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {ShipmentParams} [defaultState] - El estado inicial opcional para el formulario de la marca.
 * @returns {object} Un objeto con el estado del formulario, funciones de manejo y metadatos.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {DefaultShipment} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {ShipmentErrors} errors - Los errores de validación del formulario.
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 */
export function useCreateShipment(defaultState?: DefaultShipment) {
	const {
		initialData,
		shipmentData,
		mode,
		refreshInitialData,
		isError,
		isNotFound,
		isLoading,
		onRetry
	} = useShipmentInitialData(defaultState ?? initialShipmentState.formData)

	const shipmentSaveFn = useCallback(async (data: ShipmentParams) => {
		return await shipmentCreator.create(data)
	}, [])

	const {
		discardChanges,
		handleSubmit,
		handleChange,
		key,
		formData,
		errors,
		hasChanges,
		isSubmitting,
		disabled,
		required
	} = useFormHandler({
		entityName: 'shipments',
		initialState: initialShipmentState,
		reducer: shipmentFormReducer,
		initialData,
		saveFn: shipmentSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
		shipmentData,
		mode,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isSubmitting,
		isNotFound,
		hasChanges,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

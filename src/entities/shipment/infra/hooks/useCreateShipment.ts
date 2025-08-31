import { useCallback, useLayoutEffect, useReducer } from 'react'
import { ShipmentCreator } from '@/entities/shipment/application/ShipmentCreator'
import { ShipmentSaveService } from '@/entities/shipment/infra/service/shipmentSave.service'
import {
	type Action,
	type DefaultShipment,
	initialShipmentState,
	ShipmentFormReducer
} from '@/entities/shipment/infra/reducers/shipmentFormReducers'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { useShipmentInitialState } from './useShipmentInitialState'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { queryClient } from '@/shared/lib/queryCliente'
import { type ShipmentParams } from '@/entities/shipment/domain/dto/Shipment.dto'

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
	const key = `shipment${initialShipmentState?.formData?.id ? initialShipmentState.formData.id : ''}`
	const { events } = useAuthStore.getState()

	const create = async (formData: ShipmentParams) => {
		return await new ShipmentCreator(new ShipmentSaveService(), events).create(formData)
	}

	const {
		initialState,
		shipmentData,
		mode,
		resetState,
		isError,
		isNotFound,
		isLoading,
		onRetry
	} = useShipmentInitialState(defaultState ?? initialShipmentState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required }, dispatch] = useReducer(
		ShipmentFormReducer,
		initialShipmentState
	)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialState) }
		})
	}, [initialState])

	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}, [prevState, initialShipmentState])

	const handleChange = (name: Action['type'], value: string) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData as never).then(() => {
			queryClient.invalidateQueries({ queryKey: ['shipments'] })
			resetState()
		})
	}

	return {
		key,
		formData,
		shipmentData,
		mode,
		errors,
		required,
		isNotFound,
		isError,
		isLoading,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

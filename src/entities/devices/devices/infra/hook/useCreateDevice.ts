import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useLayoutEffect, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type Action,
	type DefaultDevice,
	devicesFormReducer,
	initialDeviceState
} from '../reducers/devicesFormReducer'
import { DeviceCreator } from '../../application/DeviceCreator'
import { DeviceSaveService } from '../service/deviceSave.service'
import { useDeviceInitialState } from './useDeviceInitialState'
import { type Params } from '../../domain/dto/Device.dto'

/**
 * `useCreateDevice`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de dispositivos.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {DefaultDevice} [defaultState] - El estado inicial opcional para el formulario del dispositivo.
 * @returns {object} Un objeto con el estado del formulario, funciones de manejo y metadatos.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {DefaultDevice} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {DevicesErrors} errors - Los errores de validación del formulario.
 * @property {DeviceRequired} required - Indica qué campos son requeridos.
 * @property {DevicesDisabled} disabled - Indica qué campos están deshabilitados.
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string | number | boolean) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 * @property {(props: { value: string; memoryRamSlotQuantity?: number; memoryRamType?: string; generic?: boolean }) => Promise<void>} handleModel - Función para manejar cambios en el modelo del dispositivo.
 * @property {(props: { value: string; typeOfSiteId?: string; ipAddress?: string | null }) => Promise<void>} handleLocation - Función para manejar cambios en la ubicación del dispositivo.
 * @property {(value: string, index: number) => Promise<void>} handleMemory - Función para manejar cambios en la memoria RAM.
 */
export function useCreateDevice(defaultState?: DefaultDevice) {
	const queryClient = useQueryClient()
	const key = `device${initialDeviceState?.formData?.id ? initialDeviceState.formData.id : ''}`
	const { events } = useAuthStore.getState()

	const create = useCallback(
		async (formData: Params) => {
			return await new DeviceCreator(new DeviceSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useDeviceInitialState(defaultState ?? initialDeviceState.formData)
	const prevState = usePrevious(initialState)

	const [{ errors, required, disabled, formData }, dispatch] = useReducer(
		devicesFormReducer,
		initialDeviceState
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
	}, [prevState, initialState])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = useCallback(async (name: Action['type'], value: any) => {
		if (
			name === 'init' ||
			name === 'reset' ||
			name === 'modelId' ||
			name === 'memoryRam' ||
			name === 'locationId'
		) {
			return
		}
		dispatch({ type: name, payload: { value } })
	}, [])

	const handleModel = useCallback(
		async ({
			value,
			memoryRamSlotQuantity,
			memoryRamType,
			generic
		}: {
			value: string
			memoryRamSlotQuantity?: number
			memoryRamType?: string
			generic?: boolean
		}) => {
			dispatch({
				type: 'modelId',
				payload: { value, memoryRamSlotQuantity, memoryRamType, generic }
			})
		},
		[]
	)
	const handleLocation = useCallback(
		async ({
			value,
			typeOfSiteId,
			ipAddress
		}: {
			value: string
			typeOfSiteId?: string
			ipAddress?: string | null
		}) => {
			dispatch({
				type: 'locationId',
				payload: { value, typeOfSiteId, ipAddress }
			})
		},
		[]
	)
	const handleMemory = useCallback(async (value: string, index: number) => {
		dispatch({ type: 'memoryRam', payload: { value, index } })
	}, [])

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData as never).then(() => {
			queryClient.invalidateQueries({ queryKey: ['devices'] })
			resetState()
		})
	}

	return {
		key,
		formData,
		mode,
		errors,
		required,
		disabled,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange,
		handleModel,
		handleLocation,
		handleMemory
	}
}

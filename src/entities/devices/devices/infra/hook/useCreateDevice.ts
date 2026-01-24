import { useCallback, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { isDeepEqual } from '@/shared/lib/utils/isDeepEqual'
import { queryClient } from '@/shared/lib/queryCliente'
import {
	type Action,
	type DefaultDevice,
	devicesFormReducer,
	initialDeviceState
} from '../reducers/devicesFormReducer'
import { DeviceCreator } from '../../application/DeviceCreator'
import { DeviceSaveService } from '../service/deviceSave.service'
import { useDeviceInitialData } from './useDeviceInitialData'

const repository = new DeviceSaveService()
const deviceCreator = new DeviceCreator(repository, useAuthStore.getState().events)

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
 * @property {() => void} discardChanges - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string | number | boolean) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 * @property {(props: { value: string; memoryRamSlotQuantity?: number; memoryRamType?: string; generic?: boolean }) => Promise<void>} handleModel - Función para manejar cambios en el modelo del dispositivo.
 * @property {(props: { value: string; typeOfSiteId?: string; ipAddress?: string | null }) => Promise<void>} handleLocation - Función para manejar cambios en la ubicación del dispositivo.
 * @property {(value: string, index: number) => Promise<void>} handleMemory - Función para manejar cambios en la memoria RAM.
 */
export function useCreateDevice(defaultState?: DefaultDevice) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const {
		initialData,
		deviceData,
		mode,
		refreshInitialData,
		isError,
		isLoading,
		isNotFound,
		onRetry
	} = useDeviceInitialData(defaultState ?? initialDeviceState.formData)

	const key = `device-${initialData?.id ? initialData.id : 'new'}`
	const prevState = usePrevious(initialData)

	const [{ errors, required, disabled, formData }, dispatch] = useReducer(
		devicesFormReducer,
		initialDeviceState
	)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialData) }
		})
	}, [initialData])

	const discardChanges = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialData) }
		})
	}, [prevState, initialData])

	const hasChanges: boolean = useMemo(() => {
		if (!initialData || !formData) {
			return false
		}

		return !isDeepEqual(formData, initialData)
	}, [formData, initialData, isDeepEqual])

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

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			setIsSubmitting(true)
			setSubmitError(null)

			const hasValidationErrors = Object.values(errors).some(error => error !== '')

			if (hasValidationErrors) {
				setIsSubmitting(false)
				setSubmitError(
					'El formulario contiene errores. Por favor, revísalos antes de guardar.'
				)
				return
			}

			if (!hasChanges) {
				setIsSubmitting(false)
				return
			}
			try {
				await deviceCreator.create(formData as never)
				queryClient.invalidateQueries({ queryKey: ['devices'] })
				refreshInitialData()
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.'
				setSubmitError(message)
			} finally {
				setIsSubmitting(false)
			}
		},
		[formData, errors, hasChanges, refreshInitialData, deviceCreator]
	)

	return {
		key,
		formData,
		deviceData,
		mode,
		errors,
		required,
		disabled,
		isError,
		isLoading,
		isNotFound,
		isSubmitting,
		hasChanges,
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange,
		handleModel,
		handleLocation,
		handleMemory
	}
}

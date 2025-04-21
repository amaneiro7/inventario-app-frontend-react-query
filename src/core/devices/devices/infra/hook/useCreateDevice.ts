import { useCallback, useLayoutEffect, useReducer } from 'react'
import { usePrevious } from '@/hooks/utils/usePrevious'
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
import { useAuthStore } from '@/store/useAuthStore'

export function useCreateDevice(defaultState?: DefaultDevice) {
	const key = `device${initialDeviceState?.formData?.id ? initialDeviceState.formData.id : ''}`
	const { events } = useAuthStore.getState()

	const create = useCallback(
		async (formData: Params) => {
			return await new DeviceCreator(new DeviceSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useDeviceInitialState(
		defaultState ?? initialDeviceState.formData
	)
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
		)
			return
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
		resetForm,
		handleSubmit,
		handleChange,
		handleModel,
		handleLocation,
		handleMemory
	}
}

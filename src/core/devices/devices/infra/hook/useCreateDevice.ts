import { useCallback, useContext, useLayoutEffect, useReducer } from 'react'
import { EventContext } from '@/context/EventManager/EventContext'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type Action,
	type DefaultDevice,
	devicesFormReducer,
	initialDeviceState
} from '../reducers/devicesFormReducer'
import { DeviceCreator } from '../../application/DeviceCreator'
import { DeviceSaveService } from '../service/deviceSave.service'
import { type Params } from '../../domain/dto/Device.dto'
import { useDeviceInitialState } from './useDeviceInitialState'

export function useCreateDevice(defaulState?: DefaultDevice) {
	const key = `device${initialDeviceState?.formData?.id ? initialDeviceState.formData.id : ''}`
	const { events } = useContext(EventContext)

	const create = useCallback(
		async (formData: Params) => {
			return await new DeviceCreator(new DeviceSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useDeviceInitialState(
		defaulState ?? initialDeviceState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData }, dispatch] = useReducer(devicesFormReducer, initialDeviceState)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialState) }
		})
	}, [initialState])

	const resetForm = () => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData).then(() => {
			resetState()
		})
	}

	return {
		key,
		formData,
		mode,
		errors,
		resetForm,
		handleSubmit,
		handleChange
	}
}

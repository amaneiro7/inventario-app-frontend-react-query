import { useLayoutEffect, useReducer } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePrevious } from '@/hooks/utils/usePrevious'
import { useProcessorInitialState } from './useProcessorInitialState'
import { ProcessorCreator } from '../../application/ProcessorCreator'
import { ProcessorSaveService } from '../service/processorSave.service'
import {
	type Action,
	initialProcessorState,
	processorFormReducer
} from '../reducers/processorFormReducer'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'

export function useCreateProcessor(defaultState?: ProcessorParams) {
	const key = `processor${
		initialProcessorState?.formData?.id ? initialProcessorState.formData.id : ''
	}`
	const { events } = useAuthStore.getState()

	const create = async (formData: ProcessorParams) => {
		return await new ProcessorCreator(new ProcessorSaveService(), events).create(formData)
	}

	const { initialState, mode, resetState } = useProcessorInitialState(
		defaultState ?? initialProcessorState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData }, dispatch] = useReducer(processorFormReducer, initialProcessorState)

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

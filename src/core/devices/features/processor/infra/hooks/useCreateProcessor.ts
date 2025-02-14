import { useActionState, useCallback, useContext, useLayoutEffect, useReducer } from 'react'
import { EventContext } from '@/context/EventManager/EventContext'
import { usePrevious } from '@/hooks/utils/usePrevious'
import { useProcessorInitialState } from './useProcessorInitialState'
import { ProcessorCreator } from '../../application/ProcessorCreator'
import { ProcessorSaveService } from '../processorSave.service'
import {
	Action,
	initialProcessorState,
	processorFormReducer
} from '../reducers/processorFormReducer'
import { processorAction } from '../actions/processorActions'
import { type ProcessorParams } from '../../domain/dto/Processor.dto'

export function useCreateProcessor(defaulState?: ProcessorParams) {
	const { events } = useContext(EventContext)

	const create = useCallback(
		async (formData: ProcessorParams) => {
			const data = await new ProcessorCreator(new ProcessorSaveService(), events).create(
				formData
			)
			return data
		},
		[events]
	)

	const { initialState, mode, resetState } = useProcessorInitialState(
		defaulState ?? initialProcessorState
	)
	const prevState = usePrevious(initialState)
	const [formData, dispatch] = useReducer(processorFormReducer, initialProcessorState)
	const [state, formAction] = useActionState(processorAction, undefined)

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

	const handleChange = (name: Action['type'], value: never) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.stopPropagation()
		event.stopPropagation()
		await create(formData).finally(() => {
			resetState()
		})
	}

	return {
		formData,
		mode,
		errors: state,
		formAction,
		resetForm,
		handleSubmit,
		handleChange
	}
}

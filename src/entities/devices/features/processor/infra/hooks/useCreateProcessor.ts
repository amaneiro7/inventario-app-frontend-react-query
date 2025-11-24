import { useCallback, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { queryClient } from '@/shared/lib/queryCliente'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
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
	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useProcessorInitialState(defaultState ?? initialProcessorState.formData)
	const key = `processor${initialState?.id ? initialState.id : 'new'}`

	const { events } = useAuthStore.getState()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const prevState = usePrevious(initialState)
	const [{ errors, formData }, dispatch] = useReducer(processorFormReducer, initialProcessorState)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialState) }
		})
	}, [initialState])

	const hasChanges = useMemo(() => {
		if (!initialState || !formData) {
			return false
		}

		return Object.keys(initialState).some(key => {
			return (initialState as any)[key] !== (formData as any)[key]
		})
	}, [formData, initialState])

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

	const save = useCallback(
		async (data: ProcessorParams): Promise<void> => {
			await new ProcessorCreator(new ProcessorSaveService(), events).create(data)
		},
		[events]
	)

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			setIsSubmitting(true)
			const hasErrors = Object.values(errors).some(error => error !== '')
			if (hasErrors || !hasChanges) {
				setIsSubmitting(false)
				return
			}

			await save(formData)
				.then(() => {
					queryClient.invalidateQueries({ queryKey: ['processors'] })
					resetState()
				})
				.finally(() => {
					setIsSubmitting(false)
				})
		},
		[save, formData, resetState]
	)

	return {
		key,
		formData,
		mode,
		errors,
		isError,
		isLoading,
		isSubmitting,
		isNotFound,
		hasChanges,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

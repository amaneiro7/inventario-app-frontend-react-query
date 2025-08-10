import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultModel,
	type Action,
	initialModelState,
	modelFormReducer
} from '../reducers/modelFormReducer'

import { ModelSaveService } from '../service/modelSave.service'
import { ModelCreator } from '../../application/ModelCreator'
import { useModelInitialState } from './useModelsInitialState'

export function useCreateModel(defaultState?: DefaultModel) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: never) => {
			return await new ModelCreator(new ModelSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useModelInitialState(defaultState ?? initialModelState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		modelFormReducer,
		initialModelState
	)
	const key = useMemo(
		() => `Model${initialModelState?.formData?.id ? initialModelState.formData.id : ''}`,
		[formData?.id]
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
	const handleChange = useCallback((name: Action['type'], value: any) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
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
		isError,
		isLoading,
		isNotFound,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

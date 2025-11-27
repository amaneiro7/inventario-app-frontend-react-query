import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultModel,
	initialModelState,
	modelFormReducer
} from '../reducers/modelFormReducer'
import { ModelSaveService } from '../service/modelSave.service'
import { useModelInitialData } from './useModelsInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { type Params, ModelCreator } from '../../application/ModelCreator'
import { type ModelParams } from '../../domain/dto/Model.dto'

const repository = new ModelSaveService()
const modelCreator = new ModelCreator(repository, useAuthStore.getState().events)

export function useCreateModel(defaultState?: DefaultModel) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useModelInitialData(defaultState ?? initialModelState.formData)

	const modelSaveFn = useCallback(async (data: ModelParams) => {
		return await modelCreator.create(data as Params)
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
		entityName: 'models',
		initialState: initialModelState,
		reducer: modelFormReducer,
		initialData,
		saveFn: modelSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
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

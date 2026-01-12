import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultRegion,
	initialRegionState,
	regionFormReducer
} from '../reducers/regionFormReducer'
import { type RegionParams } from '../../domain/dto/region.dto'
import { RegionSaveService } from '../service/regionSave.service'
import { RegionCreator } from '../../application/RegionCreator'
import { useRegionInitialData } from './useRegionInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new RegionSaveService()
const regionCreator = new RegionCreator(repository, useAuthStore.getState().events)

export function useCreateRegion(defaultState?: DefaultRegion) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useRegionInitialData(defaultState ?? initialRegionState.formData)
	const regionSaveFn = useCallback(async (data: RegionParams) => {
		return await regionCreator.create(data)
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
		required,
		submitError
	} = useFormHandler({
		entityName: 'regions',
		initialState: initialRegionState,
		reducer: regionFormReducer,
		initialData,
		saveFn: regionSaveFn,
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
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

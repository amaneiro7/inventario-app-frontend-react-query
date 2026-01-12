import { useCallback } from 'react'
import {
	type DefaultLocation,
	initialLocationState,
	locationFormReducer
} from '../reducers/locationFormReducer'
import { type LocationParams } from '../../domain/dto/Location.dto'
import { LocationSaveService } from '../service/locationSave.service'
import { LocationCreator } from '../../application/LocationCreator'
import { useLocationInitialData } from './useLocationInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new LocationSaveService()
const locationCreator = new LocationCreator(repository, useAuthStore.getState().events)

export function useCreateLocation(defaultState?: DefaultLocation) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useLocationInitialData(defaultState ?? initialLocationState.formData)

	const locationSaveFn = useCallback(async (data: LocationParams) => {
		return await locationCreator.create(data)
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
		required,
		disabled,
		dispatch,
		submitError
	} = useFormHandler({
		entityName: 'locations',
		initialState: initialLocationState,
		reducer: locationFormReducer,
		initialData,
		saveFn: locationSaveFn,
		refreshInitialData
	})

	const handleSite = useCallback(({ siteName, value }: { value: string; siteName: string }) => {
		dispatch({ type: 'siteId', payload: { value, siteName } })
	}, [])

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
		required,
		disabled,
		submitError,
		handleSite,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

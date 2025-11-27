import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultCentroCosto,
	initialCentroCostoState,
	centroCostoFormReducer
} from '../reducers/centroCostoFormReducer'
import { type CentroCostoParams } from '../../domain/dto/CentroCosto.dto'
import { CentroCostoSaveService } from '../service/centroCostoSave.service'
import { CentroCostoCreator } from '../../application/CentroCostoCreator'
import { useCentroCostoInitialData } from './useCentroCostoInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new CentroCostoSaveService()
const centroCostoCreator = new CentroCostoCreator(repository, useAuthStore.getState().events)

export function useCreateCentroCosto(defaultState?: DefaultCentroCosto) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useCentroCostoInitialData(defaultState ?? initialCentroCostoState.formData)

	const centroCostoSaveFn = useCallback(async (data: CentroCostoParams) => {
		return await centroCostoCreator.create(data)
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
		entityName: 'centroCostos',
		initialState: initialCentroCostoState,
		reducer: centroCostoFormReducer,
		initialData,
		saveFn: centroCostoSaveFn,
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

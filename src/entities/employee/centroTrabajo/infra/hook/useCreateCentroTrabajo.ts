import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultCentroTrabajo,
	initialCentroTrabajoState,
	centroTrabajoFormReducer
} from '../reducers/centroTrabajoFormReducer'
import { type CentroTrabajoParams } from '../../domain/dto/CentroTrabajo.dto'
import { CentroTrabajoSaveService } from '../service/centroTrabajoSave.service'
import { CentroTrabajoCreator } from '../../application/CentroTrabajoCreator'
import { useCentroTrabajoInitialData } from './useCentroTrabajoInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new CentroTrabajoSaveService()
const centroTrabajoCreator = new CentroTrabajoCreator(repository, useAuthStore.getState().events)

export function useCreateCentroTrabajo(defaultState?: DefaultCentroTrabajo) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useCentroTrabajoInitialData(defaultState ?? initialCentroTrabajoState.formData)

	const centroTrabajoSaveFn = useCallback(async (data: CentroTrabajoParams) => {
		return await centroTrabajoCreator.create(data)
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
		entityName: 'centroTrabajos',
		initialState: initialCentroTrabajoState,
		reducer: centroTrabajoFormReducer,
		initialData,
		saveFn: centroTrabajoSaveFn,
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

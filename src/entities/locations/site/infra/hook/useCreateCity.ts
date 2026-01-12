import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { type DefaultSite, initialSiteState, siteFormReducer } from '../reducers/siteFormReducer'
import { type SiteParams } from '../../domain/dto/Site.dto'
import { SiteSaveService } from '../service/siteSave.service'
import { SiteCreator } from '../../application/SiteCreator'
import { useSiteInitialData } from './useSiteInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new SiteSaveService()
const siteCreator = new SiteCreator(repository, useAuthStore.getState().events)

export function useCreateSite(defaultState?: DefaultSite) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useSiteInitialData(defaultState ?? initialSiteState.formData)

	const citySaveFn = useCallback(async (data: SiteParams) => {
		return await siteCreator.create(data)
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
		entityName: 'sites',
		initialState: initialSiteState,
		reducer: siteFormReducer,
		initialData,
		saveFn: citySaveFn,
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

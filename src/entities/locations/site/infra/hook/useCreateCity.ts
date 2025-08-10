import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultSite,
	type Action,
	initialSiteState,
	SiteFormReducer
} from '../reducers/siteFormReducer'
import { type SiteParams } from '../../domain/dto/Site.dto'
import { SiteSaveService } from '../service/siteSave.service'
import { SiteCreator } from '../../application/SiteCreator'
import { useSiteInitialState } from './useSiteInitialState'

export function useCreateSite(defaultState?: DefaultSite) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: SiteParams) => {
			return await new SiteCreator(new SiteSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useSiteInitialState(defaultState ?? initialSiteState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required }, dispatch] = useReducer(SiteFormReducer, initialSiteState)
	const key = useMemo(
		() => `site${initialSiteState?.formData?.id ? initialSiteState.formData.id : ''}`,
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

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			await create(formData).then(() => {
				resetState()
			})
		},
		[formData, create, resetState]
	)

	return {
		key,
		formData,
		mode,
		errors,
		required,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

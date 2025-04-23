import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultLocation,
	type Action,
	initialLocationState,
	locationFormReducer
} from '../reducers/locationFormReducer'
import { type LocationParams } from '../../domain/dto/Location.dto'
import { LocationSaveService } from '../service/locationSave.service'
import { LocationCreator } from '../../application/LocationCreator'
import { useLocationInitialState } from './useLocationInitialState'
import { useAuthStore } from '@/store/useAuthStore'

export function useCreateLocation(defaultState?: DefaultLocation) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: LocationParams) => {
			return await new LocationCreator(new LocationSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useLocationInitialState(
		defaultState ?? initialLocationState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		locationFormReducer,
		initialLocationState
	)
	const key = useMemo(
		() =>
			`location${initialLocationState?.formData?.id ? initialLocationState.formData.id : ''}`,
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
		if (name === 'init' || name === 'reset' || name === 'siteId') return
		dispatch({ type: name, payload: { value } })
	}, [])

	const handleSite = useCallback(({ siteName, value }: { value: string; siteName: string }) => {
		dispatch({ type: 'siteId', payload: { value, siteName } })
	}, [])

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData).then(() => {
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
		resetForm,
		handleSubmit,
		handleChange,
		handleSite
	}
}

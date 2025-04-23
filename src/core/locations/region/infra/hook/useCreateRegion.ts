import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultRegion,
	type Action,
	initialRegionState,
	regionFormReducer
} from '../reducers/regionFormReducer'
import { type RegionParams } from '../../domain/dto/region.dto'
import { RegionSaveService } from '../service/regionSave.service'
import { RegionCreator } from '../../application/RegionCreator'
import { useRegionInitialState } from './useRegionInitialState'

export function useCreateRegion(defaultState?: DefaultRegion) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: RegionParams) => {
			return await new RegionCreator(new RegionSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useRegionInitialState(
		defaultState ?? initialRegionState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		regionFormReducer,
		initialRegionState
	)
	const key = useMemo(
		() => `Region${initialRegionState?.formData?.id ? initialRegionState.formData.id : ''}`,
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
		disabled,
		resetForm,
		handleSubmit,
		handleChange
	}
}

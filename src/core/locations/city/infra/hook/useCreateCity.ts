import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultCity,
	type Action,
	initialCityState,
	cityFormReducer
} from '../reducers/cityFormReducer'
import { type CityParams } from '../../domain/dto/City.dto'
import { CitySaveService } from '../service/citySave.service'
import { CityCreator } from '../../application/CityCreator'
import { useCityInitialState } from './useCityInitialState'

export function useCreateCity(defaultState?: DefaultCity) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: CityParams) => {
			return await new CityCreator(new CitySaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useCityInitialState(
		defaultState ?? initialCityState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required }, dispatch] = useReducer(cityFormReducer, initialCityState)
	const key = useMemo(
		() => `city${initialCityState?.formData?.id ? initialCityState.formData.id : ''}`,
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
		resetForm,
		handleSubmit,
		handleChange
	}
}

import { useCallback, useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { EventContext } from '@/context/EventManager/EventContext'

import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultCargo,
	type Action,
	initialCargoState,
	cargoFormReducer
} from '../reducers/cargoFormReducer'
import { type CargoParams } from '../../domain/dto/Cargo.dto'
import { CargoSaveService } from '../service/cargoSave.service'
import { CargoCreator } from '../../application/CargoCreator'
import { useCargoInitialState } from './useCargoInitialState'

export function useCreateCargo(defaultState?: DefaultCargo) {
	const { events } = useContext(EventContext)

	const create = useMemo(
		() => async (formData: CargoParams) => {
			return await new CargoCreator(new CargoSaveService(), events).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useCargoInitialState(
		defaultState ?? initialCargoState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		cargoFormReducer,
		initialCargoState
	)
	const key = useMemo(
		() => `Cargo${initialCargoState?.formData?.id ? initialCargoState.formData.id : ''}`,
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

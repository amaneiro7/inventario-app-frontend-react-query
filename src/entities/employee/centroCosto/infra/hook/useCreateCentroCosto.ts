import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultCentroCosto,
	type Action,
	initialCentroCostoState,
	centroCostoFormReducer
} from '../reducers/centroCostoFormReducer'
import { type CentroCostoParams } from '../../domain/dto/CentroCosto.dto'
import { CentroCostoSaveService } from '../service/centroCostoSave.service'
import { CentroCostoCreator } from '../../application/CentroCostoCreator'
import { useCentroCostoInitialState } from './useCentroCostoInitialState'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

export function useCreateCentroCosto(defaultState?: DefaultCentroCosto) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: CentroCostoParams) => {
			return await new CentroCostoCreator(new CentroCostoSaveService(), events).create(
				formData
			)
		},
		[events]
	)

	const { initialState, mode, resetState } = useCentroCostoInitialState(
		defaultState ?? initialCentroCostoState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		centroCostoFormReducer,
		initialCentroCostoState
	)
	const key = useMemo(
		() =>
			`centroCosto${
				initialCentroCostoState?.formData?.id ? initialCentroCostoState.formData.id : ''
			}`,
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

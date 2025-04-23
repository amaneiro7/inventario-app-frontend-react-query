import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultVicepresidenciaEjecutiva,
	type Action,
	initialVicepresidenciaEjecutivaState,
	vicepresidenciaEjecutivaFormReducer
} from '../reducers/vicepresidenciaEjecutivaFormReducer'
import { type VicepresidenciaEjecutivaParams } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { VicepresidenciaEjecutivaSaveService } from '../service/vicepresidenciaEjecutivaSave.service'
import { VicepresidenciaEjecutivaCreator } from '../../application/VicepresidenciaEjecutivaCreator'
import { useVicepresidenciaEjecutivaInitialState } from './useVicepresidenciaEjecutivaInitialState'

export function useCreateVicepresidenciaEjecutiva(defaultState?: DefaultVicepresidenciaEjecutiva) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: VicepresidenciaEjecutivaParams) => {
			return await new VicepresidenciaEjecutivaCreator(
				new VicepresidenciaEjecutivaSaveService(),
				events
			).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useVicepresidenciaEjecutivaInitialState(
		defaultState ?? initialVicepresidenciaEjecutivaState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required }, dispatch] = useReducer(
		vicepresidenciaEjecutivaFormReducer,
		initialVicepresidenciaEjecutivaState
	)
	const key = useMemo(
		() =>
			`vicepresidenciaEjecutiva${
				initialVicepresidenciaEjecutivaState?.formData?.id
					? initialVicepresidenciaEjecutivaState.formData.id
					: ''
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
		resetForm,
		handleSubmit,
		handleChange
	}
}

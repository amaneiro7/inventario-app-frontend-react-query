import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultVicepresidencia,
	type Action,
	initialVicepresidenciaState,
	vicepresidenciaFormReducer
} from '../reducers/vicepresidenciaFormReducer'
import { type VicepresidenciaParams } from '../../domain/dto/Vicepresidencia.dto'
import { VicepresidenciaSaveService } from '../service/vicepresidenciaSave.service'
import { VicepresidenciaCreator } from '../../application/VicepresidenciaCreator'
import { useVicepresidenciaInitialState } from './useVicepresidenciaInitialState'

export function useCreateVicepresidencia(defaultState?: DefaultVicepresidencia) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: VicepresidenciaParams) => {
			return await new VicepresidenciaCreator(
				new VicepresidenciaSaveService(),
				events
			).create(formData)
		},
		[events]
	)

	const { initialState, mode, resetState } = useVicepresidenciaInitialState(
		defaultState ?? initialVicepresidenciaState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		vicepresidenciaFormReducer,
		initialVicepresidenciaState
	)
	const key = useMemo(
		() =>
			`vicepresidencia${
				initialVicepresidenciaState?.formData?.id
					? initialVicepresidenciaState.formData.id
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
		disabled,
		resetForm,
		handleSubmit,
		handleChange
	}
}

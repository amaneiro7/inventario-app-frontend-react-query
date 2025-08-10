import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultCentroTrabajo,
	type Action,
	initialCentroTrabajoState,
	centroTrabajoFormReducer
} from '../reducers/centroTrabajoFormReducer'
import { type CentroTrabajoParams } from '../../domain/dto/CentroTrabajo.dto'
import { CentroTrabajoSaveService } from '../service/centroTrabajoSave.service'
import { CentroTrabajoCreator } from '../../application/CentroTrabajoCreator'
import { useCentroTrabajoInitialState } from './useCentroTrabajoInitialState'

export function useCreateCentroTrabajo(defaultState?: DefaultCentroTrabajo) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: CentroTrabajoParams) => {
			return await new CentroTrabajoCreator(new CentroTrabajoSaveService(), events).create(
				formData
			)
		},
		[events]
	)

	const { initialState, mode, resetState, isError, isLoading, isNotFound, onRetry } =
		useCentroTrabajoInitialState(defaultState ?? initialCentroTrabajoState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		centroTrabajoFormReducer,
		initialCentroTrabajoState
	)
	const key = useMemo(
		() =>
			`centroTrabajo${
				initialCentroTrabajoState?.formData?.id ? initialCentroTrabajoState.formData.id : ''
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
		isError,
		isLoading,
		isNotFound,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

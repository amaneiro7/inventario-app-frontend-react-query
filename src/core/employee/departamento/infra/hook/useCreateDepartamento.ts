import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { usePrevious } from '@/hooks/utils/usePrevious'
import {
	type DefaultDepartamento,
	type Action,
	initialDepartamentoState,
	departamentoFormReducer
} from '../reducers/departamentoFormReducer'
import { type DepartamentoParams } from '../../domain/dto/Departamento.dto'
import { DepartamentoSaveService } from '../service/departamentoSave.service'
import { DepartamentoCreator } from '../../application/DepartamentoCreator'
import { useDepartamentoInitialState } from './useDepartamentoInitialState'

export function useCreateDepartamento(defaultState?: DefaultDepartamento) {
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: DepartamentoParams) => {
			return await new DepartamentoCreator(new DepartamentoSaveService(), events).create(
				formData
			)
		},
		[events]
	)

	const { initialState, mode, resetState } = useDepartamentoInitialState(
		defaultState ?? initialDepartamentoState.formData
	)
	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		departamentoFormReducer,
		initialDepartamentoState
	)
	const key = useMemo(
		() =>
			`departamento${
				initialDepartamentoState?.formData?.id ? initialDepartamentoState.formData.id : ''
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

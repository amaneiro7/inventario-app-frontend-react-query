import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	type DefaultEmployee,
	type Action,
	initialEmployeeState,
	employeeFormReducer
} from '../reducers/employeeFormReducer'
import { type EmployeeParams } from '../../domain/dto/Employee.dto'
import { EmployeeSaveService } from '../service/employeeSave.service'
import { EmployeeCreator } from '../../application/EmployeeCreator'
import { useEmployeeInitialState } from './useEmployeeInitialState'

export function useCreateEmployee(defaultState?: DefaultEmployee) {
	const { initialState, mode, resetState } = useEmployeeInitialState(
		defaultState ?? initialEmployeeState.formData
	)
	const { events } = useAuthStore.getState()

	const create = useMemo(
		() => async (formData: EmployeeParams) => {
			return await new EmployeeCreator(new EmployeeSaveService(), events).create(formData)
		},
		[events]
	)

	const prevState = usePrevious(initialState)
	const [{ errors, formData, required, disabled }, dispatch] = useReducer(
		employeeFormReducer,
		initialEmployeeState
	)
	const key = useMemo(
		() =>
			`Employee${initialEmployeeState?.formData?.id ? initialEmployeeState.formData.id : ''}`,
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
		if (
			name === 'init' ||
			name === 'reset' ||
			name === 'addExtension' ||
			name === 'addPhone' ||
			name === 'removeExtension' ||
			name === 'removePhone' ||
			name === 'clearExtension' ||
			name === 'clearPhone' ||
			name === 'phoneNumero' ||
			name === 'phoneOperadora' ||
			name === 'extensionNumero' ||
			name === 'extensionOperadora'
		)
			return
		dispatch({ type: name, payload: { value } })
	}, [])
	const handlePhoneChange = useCallback(
		({
			type,
			index,
			value
		}: {
			type: 'phoneNumero' | 'phoneOperadora' | 'extensionNumero' | 'extensionOperadora'
			index: number
			value: string
		}) => {
			dispatch({ type, payload: { index, value } })
		},
		[]
	)

	const handleAddPhones = useCallback(({ type }: { type: 'addPhone' | 'addExtension' }) => {
		dispatch({ type })
	}, [])

	const handleRemovePhones = useCallback(
		({ type, index }: { type: 'removePhone' | 'removeExtension'; index: number }) => {
			dispatch({ type, payload: { index } })
		},
		[]
	)

	const handleClearFirstPhone = useCallback(
		({ type, index }: { type: 'clearPhone' | 'clearExtension'; index: number }) => {
			dispatch({ type, payload: { index } })
		},
		[]
	)

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			await create(formData as never).then(() => {
				resetState()
			})
		},
		[create, formData, resetState]
	)

	return {
		key,
		formData,
		mode,
		errors,
		required,
		disabled,
		handlePhoneChange,
		handleAddPhones,
		handleRemovePhones,
		handleClearFirstPhone,
		resetForm,
		handleSubmit,
		handleChange
	}
}

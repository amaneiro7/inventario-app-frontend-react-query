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

/**
 * A React hook for managing employee creation and update forms.
 * It handles form state, validation errors, and interactions with the EmployeeCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing employees.
 * @returns An object containing form data, mode, errors, required fields, disabled fields, and various handlers.
 */
export function useCreateEmployee(defaultState?: DefaultEmployee) {
	const { initialState, mode, resetState } = useEmployeeInitialState(
		defaultState ?? initialEmployeeState.formData
	)
	const { events } = useAuthStore.getState()

	/**
	 * Memoized function to create or update an employee.
	 * It uses the EmployeeCreator service to perform the operation.
	 */
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

	/**
	 * Resets the form to its initial state.
	 */
	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}, [prevState, initialState])

	/**
	 * Handles changes to form input fields.
	 * @param name - The name of the action/field to update.
	 * @param value - The new value for the field.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = useCallback((name: Action['type'], value: any) => {
		const ignoredActions =
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

		if (ignoredActions) {
			return
		}
		dispatch({ type: name, payload: { value } })
	}, [])

	/**
	 * Handles changes to phone number or extension fields.
	 * @param params - An object containing the type of change, index, and new value.
	 * @param params.type - The type of phone/extension field being changed.
	 * @param params.index - The index of the phone/extension in the array.
	 * @param params.value - The new value for the phone/extension field.
	 */
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

	/**
	 * Handles adding new phone or extension fields.
	 * @param params - An object containing the type of phone/extension to add.
	 * @param params.type - The type of phone/extension to add ('addPhone' or 'addExtension').
	 */
	const handleAddPhones = useCallback(({ type }: { type: 'addPhone' | 'addExtension' }) => {
		dispatch({ type })
	}, [])

	/**
	 * Handles removing phone or extension fields.
	 * @param params - An object containing the type of phone/extension to remove and its index.
	 * @param params.type - The type of phone/extension to remove ('removePhone' or 'removeExtension').
	 * @param params.index - The index of the phone/extension to remove.
	 */
	const handleRemovePhones = useCallback(
		({ type, index }: { type: 'removePhone' | 'removeExtension'; index: number }) => {
			dispatch({ type, payload: { index } })
		},
		[]
	)

	/**
	 * Handles clearing the first phone or extension field.
	 * @param params - An object containing the type of phone/extension to clear and its index.
	 * @param params.type - The type of phone/extension to clear ('clearPhone' or 'clearExtension').
	 * @param params.index - The index of the phone/extension to clear.
	 */
	const handleClearFirstPhone = useCallback(
		({ type, index }: { type: 'clearPhone' | 'clearExtension'; index: number }) => {
			dispatch({ type, payload: { index } })
		},
		[]
	)

	/**
	 * Handles the form submission.
	 * Prevents default form submission and calls the `create` function with the current form data.
	 * Resets the form state after successful submission.
	 * @param event - The React form event.
	 */
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

import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { queryClient } from '@/shared/lib/queryCliente'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { useEmployeeInitialData } from './useEmployeeInitialData'
import {
	type DefaultEmployee,
	type Action,
	initialEmployeeState,
	employeeFormReducer
} from '../reducers/employeeFormReducer'
import { EmployeeSaveService } from '../service/employeeSave.service'
import { EmployeeCreator } from '../../application/EmployeeCreator'
import { isDeepEqual } from '@/shared/lib/utils/isDeepEqual'
import { useGetAllowedDomainsAppSettings } from '@/entities/appSettings/infra/hook/useGeAllowedDomainsAppSettings'

const repository = new EmployeeSaveService()
const employeeCreator = new EmployeeCreator(repository, useAuthStore.getState().events)

/**
 * A React hook for managing employee creation and update forms.
 * It handles form state, validation errors, and interactions with the EmployeeCreator service.
 * @param defaultState - Optional initial state for the form, typically used for editing existing employees.
 * @returns An object containing form data, mode, errors, required fields, disabled fields, and various handlers.
 */
export function useCreateEmployee(defaultState?: DefaultEmployee) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const { data: allowedDomains, isError: isDomainsError } = useGetAllowedDomainsAppSettings()

	const {
		initialData,
		mode,
		refreshInitialData,
		employeeData,
		isError,
		isLoading,
		isNotFound,
		onRetry
	} = useEmployeeInitialData(defaultState ?? initialEmployeeState.formData)

	const prevState = usePrevious(initialData)
	const [{ errors, formData, helpers, required, disabled }, dispatch] = useReducer(
		employeeFormReducer,
		initialEmployeeState
	)
	const key = useMemo(
		() =>
			`employee-${initialEmployeeState?.formData?.id ? initialEmployeeState.formData.id : ''}`,
		[formData?.id]
	)

	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialData) }
		})
	}, [initialData])

	useEffect(() => {
		dispatch({ type: 'allowedDomains', payload: { value: allowedDomains } })
	}, [allowedDomains])

	// Determinamos si debemos forzar la selección de dominio
	const isStrictDomainMode = useMemo(() => {
		// Si hay error, o la lista es vacía, desactivamos el modo estricto
		if (isDomainsError || !allowedDomains || allowedDomains.length === 0) {
			return false
		}
		return true
	}, [allowedDomains, isDomainsError])

	// 2. Lógica hasChanges (isDirty)
	const hasChanges: boolean = useMemo(() => {
		if (!initialData || !formData) {
			return false
		}
		return !isDeepEqual(formData, initialData)
	}, [formData, initialData, isDeepEqual])

	/**
	 * Resets the form to its initial state.
	 */
	const discardChanges = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialData) }
		})
	}, [prevState, initialData])

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
			setIsSubmitting(true)
			setSubmitError(null)
			const hasValidationErrors = Object.values(errors).some(error => error !== '')

			// Chequeo de errores de validación O falta de cambios
			if (hasValidationErrors) {
				setIsSubmitting(false)
				setSubmitError(
					'El formulario contiene errores. Por favor, revísalos antes de guardar.'
				)
				return
			}

			if (!hasChanges) {
				setIsSubmitting(false)
				return
			}
			try {
				await employeeCreator.create(formData as never)
				await queryClient.invalidateQueries({ queryKey: ['employees'] })
				refreshInitialData()
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.'
				setSubmitError(message)
			} finally {
				setIsSubmitting(false)
			}
		},
		[formData, refreshInitialData]
	)

	return {
		key,
		formData,
		mode,
		errors,
		required,
		disabled,
		employeeData,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		isSubmitting,
		submitError,
		helpers,
		isStrictDomainMode,
		onRetry,
		handlePhoneChange,
		handleAddPhones,
		handleRemovePhones,
		handleClearFirstPhone,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

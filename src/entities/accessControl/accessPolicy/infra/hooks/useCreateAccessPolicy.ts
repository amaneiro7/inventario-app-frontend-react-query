import { useCallback, useLayoutEffect, useMemo, useReducer, useState } from 'react'

import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { useAccessPolicyInitialState } from './useAccessPolicyInitialState'

import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { queryClient } from '@/shared/lib/queryCliente'
import {
	initialAccessPolicyState,
	accessPolicyFormReducer,
	type Action
} from '../reducers/accessPolicyFormReducer'
import { AccessPolicyParams } from '../../domain/dto/AccessPolicy.dto'
import { AccessPolicySaveService } from '../service/accessPolicySave.service'
import { AccessPolicyCreator } from '../../application/AccessPolicyCreator'

/**
 * `useCreateAccessPolicy`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de marcas.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {AccessPolicyParams} [defaultState] - El estado inicial opcional para el formulario de la marca.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {AccessPolicyParams} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {AccessPolicyErrors} errors - Los errores de validación del formulario.
 * @property {boolean} isNotFound - Indica si el permiso no fue encontrado (en modo edición).
 * @property {boolean} isError - Indica si hubo un error al cargar el permiso (en modo edición).
 * @property {boolean} isLoading - Indica si el permiso está cargando (en modo edición).
 * @property {() => void} onRetry - Función para reintentar la carga del permiso (en modo edición).
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 * @property {(formData: AccessPolicyParams) => Promise<void>} handleLoading - Función para manejar la lógica de creación/actualización del permiso.
 */

export function useCreateAccessPolicy(defaultState?: AccessPolicyParams) {
	// Derive a unique key for the form instance, useful for React's key prop
	// Use initialState.id if available, otherwise 'new' for new forms.
	const { initialState, mode, resetState, isError, isNotFound, isLoading, onRetry } =
		useAccessPolicyInitialState(defaultState ?? initialAccessPolicyState.formData)
	const key = `accessPolicy-${initialState.id ? initialState.id : 'new'}`

	const { events } = useAuthStore.getState()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const prevState = usePrevious(initialState)
	const [{ errors, formData }, dispatch] = useReducer(
		accessPolicyFormReducer,
		initialAccessPolicyState
	)

	// Initialize form data when initialState changes
	useLayoutEffect(() => {
		dispatch({
			type: 'init',
			payload: { formData: structuredClone(initialState) }
		})
	}, [initialState])

	const hasChanges = useMemo(() => {
		if (!initialState || !formData) {
			return false
		}

		return Object.keys(initialState).some(key => {
			return (initialState as any)[key] !== (formData as any)[key]
		})
	}, [formData, initialState])

	/**
	 * @description Resets the form to its initial state (either default or fetched).
	 */
	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { formData: structuredClone(prevState ?? initialState) }
		})
	}, [prevState, initialAccessPolicyState])

	/**
	 * @description Handles changes in form input fields.
	 * @param {Action['type']} name - The type of action (corresponds to the field name).
	 * @param {string} value - The new value of the field.
	 */

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = useCallback((name: Action['type'], value: any): void => {
		// 'init' and 'reset' actions are handled by useLayoutEffect and resetForm respectively,
		// so they should not be dispatched via this handler.
		if (name === 'init' || name === 'reset') {
			console.warn(
				`Attempted to dispatch '${name}' action via handleChange. This is not allowed.`
			)
			return
		}
		dispatch({ type: name, payload: { value } })
	}, [])

	/**
	 * @description Encapsulates the logic for creating/updating a AccessPolicy.
	 * @param {AccessPolicyParams} data - The form data to be saved.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	const save = useCallback(
		async (data: AccessPolicyParams): Promise<void> => {
			await new AccessPolicyCreator(new AccessPolicySaveService(), events).create(data)
		},
		[events]
	) // Depend on events from auth store

	/**
	 * @description Handles the form submission.
	 * @param {React.FormEvent} event - The form submission event.
	 * @returns {Promise<void>} A promise that resolves after submission and state updates.
	 */
	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()
			setIsSubmitting(true)
			const hasErrors = Object.values(errors).some(error => error !== '')
			if (hasErrors || !hasChanges) {
				// Maybe notify user about errors
				setIsSubmitting(false)
				return
			}

			await save(formData)
				.then(() => {
					queryClient.invalidateQueries({ queryKey: ['accessPolicies'] })
					resetState()
				})
				.finally(() => {
					setIsSubmitting(false)
				})
		},
		[save, formData, resetState]
	) // Depend on create, formData, and resetState

	return {
		key,
		formData,
		mode,
		errors,
		isNotFound,
		isError,
		isLoading,
		isSubmitting,
		hasChanges,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

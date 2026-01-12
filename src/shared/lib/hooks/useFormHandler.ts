import { useCallback, useState } from 'react'
import { queryClient } from '../queryCliente'
import {
	type InitialFormState,
	type TStateWithId,
	useGenericFormState
} from './useGenericFormState' // Asume que este hook ya existe

export function useFormHandler<
	TState extends TStateWithId,
	TAction extends { type: string; payload: any },
	TErrors extends Record<string, string>,
	TRequired,
	TDisabled
>({
	entityName,
	initialState,
	reducer,
	initialData,
	saveFn,
	refreshInitialData
}: {
	entityName: string
	initialState: InitialFormState<TState, TErrors, TRequired, TDisabled>
	initialData: TState // Datos iniciales de la API
	reducer: (state: typeof initialState, action: TAction) => typeof initialState

	// Funciones inyectables (Específicas de la entidad)
	saveFn: (data: TState) => Promise<any>
	refreshInitialData: () => void
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)

	// 💡 1. Generación de la Key (Reutilizable)
	const key = `${entityName}-${initialData?.id ? initialData.id : 'new'}`

	// 2. Lógica Genérica de Estado (isDirty, resetForm, handleChange, formData, errors)
	const {
		formData,
		errors,
		hasChanges,
		disabled,
		required,
		handleChange,
		dispatch,
		discardChanges
	} = useGenericFormState<TState, TAction, TErrors, TRequired, TDisabled>({
		initialState,
		reducer,
		initialData
	})

	// 💡 3. Función Submit (Reutilizable)
	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()

			setIsSubmitting(true)
			setSubmitError(null)

			// Chequeo de errores de validación
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
				// Llama a la función de guardado específica inyectada
				await saveFn(formData)
				queryClient.invalidateQueries({ queryKey: [entityName] })
				refreshInitialData()
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.'
				setSubmitError(message)
			} finally {
				setIsSubmitting(false)
			}
		},
		[saveFn, formData, errors, hasChanges]
	)

	return {
		key,
		isSubmitting,
		formData,
		disabled,
		required,
		errors,
		hasChanges,
		submitError,
		// Funciones
		discardChanges,
		handleSubmit,
		handleChange,
		dispatch
	}
}

import { useCallback, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { usePrevious } from './usePrevious'

export type TStateWithId = { id?: string | number; [key: string]: any }

export type InitialFormState<TState> = {
	// Propiedades requeridas y fuertemente tipadas
	formData: TState
	errors: any // o un tipo de errores más específico, si lo tienes

	// 💡 Propiedad índice para permitir CUALQUIER otra propiedad
	// Esto le dice a TypeScript que cualquier clave de cadena adicional es válida,
	// pero no perderá la tipificación estricta de formData y errors.
	[key: string]: any
}

/**
 * Hook genérico para manejar el estado, inicialización, reset y cambios de un formulario.
 * @param initialState - El estado inicial del formulario.
 * @param reducer - La función reductora específica del formulario.
 * @param initialData - Los datos iniciales obtenidos de la API (useBrandInitialState.initialState).
 */
export function useGenericFormState<
	TState extends TStateWithId,
	TAction extends { type: string; payload: any }
>({
	initialState,
	reducer,
	initialData
}: {
	initialState: InitialFormState<TState>
	reducer: (state: typeof initialState, action: TAction) => typeof initialState
	initialData: TState
}) {
	const prevState = usePrevious(initialData)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [{ errors, formData }, dispatch] = useReducer(reducer, initialState)

	// 1. Sincronización del estado de la API (initialData) con el estado local del reducer
	useLayoutEffect(() => {
		// Usamos 'init' para cargar los datos de la API al reducer
		dispatch({
			type: 'init' as TAction['type'],
			payload: { formData: structuredClone(initialData) }
		} as TAction)
	}, [initialData, reducer]) // Depende de initialData

	// 2. Lógica hasChanges (isDirty)
	const hasChanges = useMemo(() => {
		if (!initialData || !formData) {
			return false
		}

		// Comparamos las claves para ver si hay diferencias.
		return Object.keys(initialData).some(key => {
			// Se requiere tipado genérico y manejo de la aserción de tipos
			return (initialData as any)[key] !== (formData as any)[key]
		})
	}, [formData, initialData])

	// 3. Función Reset
	const discardChanges = useCallback(() => {
		dispatch({
			type: 'reset' as TAction['type'],
			payload: { formData: structuredClone(prevState ?? initialData) }
		} as TAction)
	}, [initialData, prevState])

	// 4. Función de Manejo de Cambios (genérica, puede ser extendida)
	const handleChange = useCallback(
		(name: string, value: any) => {
			if (name === 'init' || name === 'reset') return
			dispatch({ type: name as TAction['type'], payload: { value } } as TAction)
		},
		[dispatch]
	)

	return {
		formData,
		errors,
		hasChanges,
		isSubmitting,
		setIsSubmitting,
		discardChanges,
		handleChange,
		dispatch // Permitimos la acción directa para casos complejos
	}
}

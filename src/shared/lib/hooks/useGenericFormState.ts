import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { usePrevious } from './usePrevious'
import { isDeepEqual } from '../utils/isDeepEqual'

export type TStateWithId = { id?: string | number; [key: string]: any }

export type InitialFormState<TState, TErrors, TRequired, TDisabled> = {
	// Propiedades requeridas y fuertemente tipadas
	formData: TState
	errors: TErrors
	required: TRequired
	disabled: TDisabled
	// 💡 Propiedad índice para permitir CUALQUIER otra propiedad
	// Esto le dice a TypeScript que cualquier clave de cadena adicional es válida,
	// pero no perderá la tipificación estricta de formData y errors.
}

/**
 * Hook genérico para manejar el estado, inicialización, reset y cambios de un formulario.
 * @param initialState - El estado inicial del formulario.
 * @param reducer - La función reductora específica del formulario.
 * @param initialData - Los datos iniciales obtenidos de la API (useBrandInitialState.initialState).
 */
export function useGenericFormState<
	TState extends TStateWithId,
	TAction extends { type: string; payload: any },
	TErrors,
	TRequired,
	TDisabled
>({
	initialState,
	reducer,
	initialData
}: {
	initialState: InitialFormState<TState, TErrors, TRequired, TDisabled>
	reducer: (state: typeof initialState, action: TAction) => typeof initialState
	initialData: TState
}) {
	const prevState = usePrevious(initialData)
	const [{ errors, formData, disabled, required }, dispatch] = useReducer(reducer, initialState)

	// 1. Sincronización del estado de la API (initialData) con el estado local del reducer
	useLayoutEffect(() => {
		// Usamos 'init' para cargar los datos de la API al reducer
		dispatch({
			type: 'init' as TAction['type'],
			payload: { formData: structuredClone(initialData) }
		} as TAction)
	}, [initialData, reducer]) // Depende de initialData

	// 2. Lógica hasChanges (isDirty)
	const hasChanges: boolean = useMemo(() => {
		if (!initialData || !formData) {
			return false
		}
		return !isDeepEqual(formData, initialData)
	}, [formData, initialData, isDeepEqual])

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
		disabled,
		required,
		discardChanges,
		handleChange,
		dispatch // Permitimos la acción directa para casos complejos
	}
}

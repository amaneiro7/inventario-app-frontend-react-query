import { useCallback, useLayoutEffect, useReducer } from 'react'
import { BrandCreator } from '@/entities/brand/application/BrandCreator'
import { BrandSaveService } from '@/entities/brand/infra/service/brandSave.service'
import {
	type Action,
	initialBrandState,
	brandFormReducer
} from '@/entities/brand/infra/reducers/brandFormReducer'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { useBrandInitialState } from './useBrandInitialState'
import { type BrandParams } from '@/entities/brand/domain/dto/Brand.dto'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

/**
 * `useCreateBrand`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de marcas.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {BrandParams} [defaultState] - El estado inicial opcional para el formulario de la marca.
 * @returns {object} Un objeto con el estado del formulario, funciones de manejo y metadatos.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {DefaultBrand} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {BrandErrors} errors - Los errores de validación del formulario.
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 */
export function useCreateBrand(defaultState?: BrandParams) {
	const key = `brand${initialBrandState?.formData?.id ? initialBrandState.formData.id : ''}`
	const { events } = useAuthStore.getState()

	const create = async (formData: BrandParams) => {
		return await new BrandCreator(new BrandSaveService(), events).create(formData)
	}

	const { initialState, mode, resetState, isError, isNotFound, isLoading, onRetry } =
		useBrandInitialState(defaultState ?? initialBrandState.formData)
	const prevState = usePrevious(initialState)
	const [{ errors, formData }, dispatch] = useReducer(brandFormReducer, initialBrandState)

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
	}, [prevState, initialBrandState])

	const handleChange = (name: Action['type'], value: string) => {
		if (name === 'init' || name === 'reset') return
		dispatch({ type: name, payload: { value } })
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		event.stopPropagation()
		await create(formData).then(() => {
			resetState()
		})
	}

	return {
		key,
		formData,
		mode,
		errors,
		isNotFound,
		isError,
		isLoading,
		onRetry,
		resetForm,
		handleSubmit,
		handleChange
	}
}

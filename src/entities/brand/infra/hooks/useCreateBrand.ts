import { useCallback } from 'react'
import { BrandCreator } from '@/entities/brand/application/BrandCreator'
import { BrandSaveService } from '@/entities/brand/infra/service/brandSave.service'
import {
	initialBrandState,
	brandFormReducer,
	type DefaultBrand
} from '@/entities/brand/infra/reducers/brandFormReducer'

import { useBrandInitialData } from './useBrandInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { type BrandParams } from '@/entities/brand/domain/dto/Brand.dto'

const repository = new BrandSaveService()
const brandCreator = new BrandCreator(repository, useAuthStore.getState().events)

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
 * @property {() => void} discardChanges - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 */
export function useCreateBrand(defaultState?: DefaultBrand) {
	// 1. Obtener estado inicial y contexto de ruta
	const { initialData, mode, refreshInitialData, isError, isNotFound, isLoading, onRetry } =
		useBrandInitialData(defaultState ?? initialBrandState.formData)

	const brandSaveFn = useCallback(async (data: BrandParams) => {
		return await brandCreator.create(data)
	}, [])

	const {
		discardChanges,
		handleSubmit,
		handleChange,
		key,
		formData,
		errors,
		hasChanges,
		isSubmitting,
		disabled,
		required
	} = useFormHandler({
		entityName: 'brands',
		initialState: initialBrandState,
		reducer: brandFormReducer,
		initialData,
		saveFn: brandSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
		mode,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isSubmitting,
		isNotFound,
		hasChanges,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

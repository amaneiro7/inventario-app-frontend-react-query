import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	type DefaultISPLink,
	initialISPLinkState,
	ISPLinkFormReducer
} from '../reducers/ispLinkFormReducer'
import { type ISPLinkParams } from '../../domain/dto/ISPLink.dto'
import { ISPLinkSaveService } from '../service/ispLinkSave.service'
import { ISPLinkCreator } from '../../application/ISPLinkCreator'
import { useISPLinkInitialData } from './useISPLinkInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new ISPLinkSaveService()
const ispLinkCreator = new ISPLinkCreator(repository, useAuthStore.getState().events)

/**
 * `useCreateISPLink`
 * @function
 * @description Hook personalizado para gestionar la creación de ciudades.
 * @param {DefaultISPLink} [defaultState] - El estado inicial opcional para el formulario de la ciudad.
 * @returns {object} Un objeto con el estado del formulario, funciones de manejo y metadatos.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {DefaultISPLink} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {ISPLinkErrors} errors - Los errores de validación del formulario.
 * @property {() => void} discardChanges - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 *
 */

export function useCreateISPLink(defaultState?: DefaultISPLink) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useISPLinkInitialData(defaultState ?? initialISPLinkState.formData)

	const ISPLinkSaveFn = useCallback(async (data: ISPLinkParams) => {
		return await ispLinkCreator.create(data)
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
		required,
		submitError
	} = useFormHandler({
		entityName: 'isp-links',
		initialState: initialISPLinkState,
		reducer: ISPLinkFormReducer,
		initialData,
		saveFn: ISPLinkSaveFn,
		refreshInitialData
	})

	return {
		key,
		formData,
		mode,
		errors,
		isError,
		isLoading,
		isSubmitting,
		isNotFound,
		required,
		hasChanges,
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

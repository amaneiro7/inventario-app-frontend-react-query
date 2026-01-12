import { useCallback } from 'react'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { useAccessPolicyInitialData } from './useAccessPolicyInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	initialAccessPolicyState,
	accessPolicyFormReducer
} from '../reducers/accessPolicyFormReducer'
import { AccessPolicySaveService } from '../service/accessPolicySave.service'
import { AccessPolicyCreator } from '../../application/AccessPolicyCreator'
import { type AccessPolicyParams } from '../../domain/dto/AccessPolicy.dto'

const repository = new AccessPolicySaveService()
const accessPolicyCreator = new AccessPolicyCreator(repository, useAuthStore.getState().events)

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
	// 1. Obtener estado inicial y contexto de ruta
	const { initialData, mode, refreshInitialData, isError, isNotFound, isLoading, onRetry } =
		useAccessPolicyInitialData(defaultState ?? initialAccessPolicyState.formData)

	const accessPolicySaveFn = useCallback(async (data: AccessPolicyParams) => {
		return await accessPolicyCreator.create(data)
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
		submitError
	} = useFormHandler({
		entityName: 'accessPolicies',
		initialState: initialAccessPolicyState,
		reducer: accessPolicyFormReducer,
		initialData,
		saveFn: accessPolicySaveFn,
		refreshInitialData
	})

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
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

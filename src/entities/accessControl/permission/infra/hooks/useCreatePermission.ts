import { useCallback } from 'react'
import { usePermissionInitialData } from './usePermissionInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { initialPermissionState, permissionFormReducer } from '../reducers/permissionFormReducer'
import { PermissionSaveService } from '../service/permissionSave.service'
import { PermissionCreator } from '../../application/PermissionCreator'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { type PermissionParams } from '../../domain/dto/Permission.dto'

const repository = new PermissionSaveService()
const permissionCreator = new PermissionCreator(repository, useAuthStore.getState().events)

/**
 * `useCreatePermission`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de marcas.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {PermissionParams} [defaultState] - El estado inicial opcional para el formulario de la marca.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {PermissionParams} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {PermissionErrors} errors - Los errores de validación del formulario.
 * @property {boolean} isNotFound - Indica si el permiso no fue encontrado (en modo edición).
 * @property {boolean} isError - Indica si hubo un error al cargar el permiso (en modo edición).
 * @property {boolean} isLoading - Indica si el permiso está cargando (en modo edición).
 * @property {() => void} onRetry - Función para reintentar la carga del permiso (en modo edición).
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 * @property {(formData: PermissionParams) => Promise<void>} handleLoading - Función para manejar la lógica de creación/actualización del permiso.
 */

export function useCreatePermission(defaultState?: PermissionParams) {
	// Derive a unique key for the form instance, useful for React's key prop
	// Use initialData.id if available, otherwise 'new' for new forms.
	const { initialData, mode, refreshInitialData, isError, isNotFound, isLoading, onRetry } =
		usePermissionInitialData(defaultState ?? initialPermissionState.formData)

	const permissionSaveFn = useCallback(async (data: PermissionParams) => {
		return await permissionCreator.create(data)
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
		entityName: 'permissions',
		initialState: initialPermissionState,
		reducer: permissionFormReducer,
		initialData,
		saveFn: permissionSaveFn,
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

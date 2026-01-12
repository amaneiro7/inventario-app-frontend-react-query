import { useCallback } from 'react'
import { usePermissionGroupInitialData } from './usePermissionGroupInitialData'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import {
	initialPermissionGroupState,
	permissionGroupFormReducer
} from '../reducers/permissionGroupFormReducer'
import { PermissionGroupParams } from '../../domain/dto/PermissionGroup.dto'
import { PermissionGroupSaveService } from '../service/permissionGroupSave.service'
import { PermissionGroupCreator } from '../../application/PermissionGroupCreator'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new PermissionGroupSaveService()
const permissionGroupCreator = new PermissionGroupCreator(
	repository,
	useAuthStore.getState().events
)

/**
 * `useCreatePermissionGroup`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de marcas.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {PermissionGroupParams} [defaultState] - El estado inicial opcional para el formulario de la marca.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {PermissionGroupParams} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {PermissionGroupErrors} errors - Los errores de validación del formulario.
 * @property {boolean} isNotFound - Indica si el permiso no fue encontrado (en modo edición).
 * @property {boolean} isError - Indica si hubo un error al cargar el permiso (en modo edición).
 * @property {boolean} isLoading - Indica si el permiso está cargando (en modo edición).
 * @property {() => void} onRetry - Función para reintentar la carga del permiso (en modo edición).
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 * @property {(formData: PermissionGroupParams) => Promise<void>} handleLoading - Función para manejar la lógica de creación/actualización del permiso.
 */

export function useCreatePermissionGroup(defaultState?: PermissionGroupParams) {
	// Derive a unique key for the form instance, useful for React's key prop
	// Use initialData.id if available, otherwise 'new' for new forms.
	const { initialData, mode, refreshInitialData, isError, isNotFound, isLoading, onRetry } =
		usePermissionGroupInitialData(defaultState ?? initialPermissionGroupState.formData)

	const permissionGroupSaveFn = useCallback(async (data: PermissionGroupParams) => {
		return await permissionGroupCreator.create(data)
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
		required,
		submitError
	} = useFormHandler({
		entityName: 'permissionGroups',
		initialState: initialPermissionGroupState,
		reducer: permissionGroupFormReducer,
		initialData,
		saveFn: permissionGroupSaveFn,
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
		submitError,
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

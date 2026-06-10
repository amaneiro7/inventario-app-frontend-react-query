import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'
import { MigrationRuleSaveService } from '../service/migrationRuleSave.service'
import { MigrationRuleCreator } from '../../application/MigrationRuleCreator'
import {
	initialMigrationRuleState,
	migrationRuleFormReducer
} from '../reducers/migrationRuleFormReducer'
import { useMigrationRuleInitialData } from './useMigrationRuleInitialData'
import type { MigrationRuleParams } from '../../domain/dto/MigrationRule.dto'

const repository = new MigrationRuleSaveService()
const migrationRuleCreator = new MigrationRuleCreator(repository, useAuthStore.getState().events)

/**
 * `useCreateMigrationRule`
 * @function
 * @description Hook personalizado para gestionar la creación y actualización de reglas de migración.
 * Utiliza un reducer para manejar el estado del formulario y se integra con los servicios de aplicación.
 * @param {MigrationRuleParams} [defaultState] - El estado inicial opcional para el formulario de la regla de migración.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {MigrationRuleParams} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {MigrationRuleErrors} errors - Los errores de validación del formulario.
 * @property {boolean} isNotFound - Indica si la regla de migración no fue encontrada (en modo edición).
 * @property {boolean} isError - Indica si hubo un error al cargar la regla de migración (en modo edición).
 * @property {boolean} isLoading - Indica si la regla de migración está cargando (en modo edición).
 * @property {() => void} onRetry - Función para reintentar la carga de la regla de migración (en modo edición).
 * @property {() => void} resetForm - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 * @property {(formData: MigrationRuleParams) => Promise<void>} handleLoading - Función para manejar la lógica de creación/actualización de la regla de migración.
 */

export function useCreateMigrationRule(defaultState?: MigrationRuleParams) {
	// Derive a unique key for the form instance, useful for React's key prop
	// Use initialData.id if available, otherwise 'new' for new forms.
	const { initialData, mode, refreshInitialData, isError, isNotFound, isLoading, onRetry } =
		useMigrationRuleInitialData(defaultState ?? initialMigrationRuleState.formData)

	const migrationRuleSaveFn = useCallback(async (data: MigrationRuleParams) => {
		return await migrationRuleCreator.create(data)
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
		entityName: 'migrationRules',
		initialState: initialMigrationRuleState,
		reducer: migrationRuleFormReducer,
		initialData,
		saveFn: migrationRuleSaveFn,
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

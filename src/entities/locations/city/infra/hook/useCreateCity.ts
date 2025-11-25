import { useCallback } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { type DefaultCity, initialCityState, cityFormReducer } from '../reducers/cityFormReducer'
import { type CityParams } from '../../domain/dto/City.dto'
import { CitySaveService } from '../service/citySave.service'
import { CityCreator } from '../../application/CityCreator'
import { useCityInitialData } from './useCityInitialData'
import { useFormHandler } from '@/shared/lib/hooks/useFormHandler'

const repository = new CitySaveService()
const cityCreator = new CityCreator(repository, useAuthStore.getState().events)

/**
 * `useCreateCity`
 * @function
 * @description Hook personalizado para gestionar la creación de ciudades.
 * @param {DefaultCity} [defaultState] - El estado inicial opcional para el formulario de la ciudad.
 * @returns {object} Un objeto con el estado del formulario, funciones de manejo y metadatos.
 * @property {string} key - Una clave única para el formulario (útil para `React.key`).
 * @property {DefaultCity} formData - Los datos actuales del formulario.
 * @property {'edit' | 'add'} mode - El modo actual del formulario (edición o adición).
 * @property {CityErrors} errors - Los errores de validación del formulario.
 * @property {() => void} discardChanges - Función para resetear el formulario a su estado inicial.
 * @property {(event: React.FormEvent) => Promise<void>} handleSubmit - Función para manejar el envío del formulario.
 * @property {(name: Action['type'], value: string) => void} handleChange - Función para manejar los cambios en los campos del formulario.
 *
 */

export function useCreateCity(defaultState?: DefaultCity) {
	const { initialData, mode, refreshInitialData, isError, isLoading, isNotFound, onRetry } =
		useCityInitialData(defaultState ?? initialCityState.formData)

	const citySaveFn = useCallback(async (data: CityParams) => {
		return await cityCreator.create(data)
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
		required
	} = useFormHandler({
		entityName: 'cities',
		initialState: initialCityState,
		reducer: cityFormReducer,
		initialData,
		saveFn: citySaveFn,
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
		onRetry,
		discardChanges,
		handleSubmit,
		handleChange
	}
}

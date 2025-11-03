import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import {
	initialAppSettingsState,
	appSettingsFormReducer
} from '../reducers/AppSettingsFormReducer'
import { AppSettingsSaveService } from '../service/appSettingsSave.service'
import { AppSettingsUpdater } from '../../application/AppSettingsUpdater'
import { useGetAllAppSettings } from './useGetAllAppSettings'
import { queryClient } from '@/shared/lib/queryCliente'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'

export function useUpdateAppSettings() {
	const { events } = useAuthStore.getState()

	const updateSettings = useMemo(() => {
		return new AppSettingsUpdater(new AppSettingsSaveService(), events)
	}, [events])

	const { data: initialSettings, isLoading } = useGetAllAppSettings()
	const prevState = usePrevious(initialSettings)
	const [{ errors, settings }, dispatch] = useReducer(
		appSettingsFormReducer,
		initialAppSettingsState
	)

	useLayoutEffect(() => {
		if (initialSettings) {
			dispatch({
				type: 'init',
				payload: { settings: structuredClone(initialSettings) }
			})
		}
	}, [initialSettings])

	const resetForm = useCallback(() => {
		dispatch({
			type: 'reset',
			payload: { settings: structuredClone(prevState ?? initialSettings ?? []) }
		})
	}, [prevState, initialSettings])

	const handleChange = useCallback((key: string, value: string, type: SettingsTypeEnum) => {
		dispatch({ type: 'update_setting_value', payload: { key, value, type } })
	}, [])

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			event.stopPropagation()

			const hasErrors = Object.values(errors).some(error => error !== '')
			if (hasErrors) {
				// Maybe notify user about errors
				return
			}

			const settingsToUpdate = settings
				.filter(s => s.isEditable)
				.map(s => ({
					key: s.key,
					value: s.value,
					type: s.type
				}))

			await updateSettings.updateMultiple(settingsToUpdate).then(() => {
				queryClient.invalidateQueries({ queryKey: ['appSettings'] })
			})
		},
		[settings, errors, updateSettings]
	)

	return {
		settings,
		errors,
		isLoading,
		resetForm,
		handleSubmit,
		handleChange
	}
}

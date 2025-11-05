import { useCallback, useLayoutEffect, useMemo, useReducer, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { queryClient } from '@/shared/lib/queryCliente'
import { useGetAllAppSettings } from './useGetAllAppSettings'
import { initialAppSettingsState, appSettingsFormReducer } from '../reducers/AppSettingsFormReducer'
import { AppSettingsSaveService } from '../service/appSettingsSave.service'
import { AppSettingsUpdater } from '../../application/AppSettingsUpdater'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'

export function useUpdateAppSettings() {
	const { events } = useAuthStore.getState()
	const [isSubmitting, setIsSubmitting] = useState(false)

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

	const hasChanges = useMemo(() => {
		if (!initialSettings || !settings) {
			return false
		}

		const originalSettingsMap = new Map(initialSettings.map(s => [s.key, s.value]))

		return settings.some(currentSetting => {
			const originalValue = originalSettingsMap.get(currentSetting.key)
			return originalValue !== undefined && currentSetting.value !== originalValue
		})
	}, [settings, initialSettings])

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
			setIsSubmitting(true)

			const hasErrors = Object.values(errors).some(error => error !== '')
			if (hasErrors) {
				// Maybe notify user about errors
				setIsSubmitting(false)
				return
			}

			const originalSettingsMap = new Map(initialSettings?.map(s => [s.key, s.value]))

			const changedSettings = settings.filter(currentSetting => {
				const originalValue = originalSettingsMap.get(currentSetting.key)
				return (
					currentSetting.isEditable &&
					originalValue !== undefined &&
					currentSetting.value !== originalValue
				)
			})

			if (changedSettings.length === 0) {
				setIsSubmitting(false)
				return
			}

			await updateSettings
				.updateMultiple(changedSettings)
				.then(() => {
					queryClient.invalidateQueries({ queryKey: ['appSettings'] })
				})
				.finally(() => {
					setIsSubmitting(false)
				})
		},
		[settings, errors, updateSettings, initialSettings]
	)

	const getGroupSettings = (group: string) => settings.filter(s => s.group === group)

	return {
		settings,
		errors,
		isLoading,
		isSubmitting,
		hasChanges,
		getGroupSettings,
		resetForm,
		handleSubmit,
		handleChange
	}
}

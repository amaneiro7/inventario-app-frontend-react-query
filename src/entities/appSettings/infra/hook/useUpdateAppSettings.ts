import { useCallback, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { usePrevious } from '@/shared/lib/hooks/usePrevious'
import { queryClient } from '@/shared/lib/queryCliente'
import { useGetAllAppSettings } from './useGetAllAppSettings'
import { initialAppSettingsState, appSettingsFormReducer } from '../reducers/AppSettingsFormReducer'
import { AppSettingsSaveService } from '../service/appSettingsSave.service'
import { AppSettingsUpdater } from '../../application/AppSettingsUpdater'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'
import { type ModalRef } from '@/shared/ui/Modal/Modal'

const formId = 'app-settings-form'

export function useUpdateAppSettings() {
	const { events } = useAuthStore.getState()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const saveDialogRef = useRef<ModalRef>(null)

	const handleOpen = () => {
		saveDialogRef.current?.handleOpen()
	}
	const handleClose = () => {
		saveDialogRef.current?.handleClose()
	}

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
			setSubmitError(null)

			const hasErrors = Object.values(errors).some(error => error !== '')
			if (hasErrors) {
				setIsSubmitting(false)
				setSubmitError(
					'El formulario contiene errores. Por favor, revísalos antes de guardar.'
				)
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

			try {
				await updateSettings.updateMultiple(changedSettings)
				queryClient.invalidateQueries({ queryKey: ['appSettings'] })
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.'
				setSubmitError(message)
			} finally {
				setIsSubmitting(false)
				handleClose()
			}
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
		formId,
		saveDialogRef,
		submitError,
		handleOpen,
		handleClose,
		getGroupSettings,
		resetForm,
		handleSubmit,
		handleChange
	}
}

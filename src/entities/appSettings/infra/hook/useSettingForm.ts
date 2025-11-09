import { useState } from 'react'
import { type AppSettingsDto } from '../../domain/dto/AppSettings.dto'

interface UseSettingFormProps {
	settings: AppSettingsDto[]
	values: Record<string, string>
	protectedValues: Record<string, string>
	onSave: (key: string, value: string) => void
}

export const useSeetingForm = ({
	settings,
	onSave,
	protectedValues,
	values
}: UseSettingFormProps) => {
	const [editingKey, setEditingKey] = useState<string | null>(null)
	const [tempValues, setTempValues] = useState<Record<string, string>>({})

	const handleEdit = (key: string, value: string) => {
		setEditingKey(key)
		setTempValues({ [key]: value })
	}

	const handleCancel = () => {
		setEditingKey(null)
		setTempValues({})
	}

	const handleConfirm = (key: string) => {
		const setting = settings.find(s => s.key === key)
		const currentValues = setting?.isProtected ? protectedValues : values
		const newValue = tempValues[key] ?? currentValues[key]
		onSave(key, newValue)
		setEditingKey(null)
		setTempValues({})
	}

	const handleTempChange = (key: string, value: string) => {
		setTempValues(prev => ({ ...prev, [key]: value }))
	}

	return {
		editingKey,
		tempValues,
		handleEdit,
		handleCancel,
		handleConfirm,
		handleTempChange
	}
}

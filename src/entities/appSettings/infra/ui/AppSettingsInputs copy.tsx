import { memo, useMemo, useState } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { type AppSettingsForm } from '../reducers/AppSettingsFormReducer'
import Typography from '@/shared/ui/Typography'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'
import { Checkbox } from '@/shared/ui/Checkbox'
import { groupBy } from '@/shared/lib/utils/groupBy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import Button from '@/shared/ui/Button'
import { SettingsForm } from './SettingsForm'

interface AppSettingsInputsProps {
	settings: AppSettingsForm[]
	errors: Record<string, string>
	isLoading: boolean
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
}

const GROUP_LABELS = {
	security: { label: 'Seguridad', icon: '🔒' },
	location_monitoring: { label: 'Monitoreo de Ubicación', icon: '📍' },
	device_monitoring: { label: 'Monitoreo de Dispositivos', icon: '📱' }
}

export const AppSettingsInputs = memo(
	({ settings, errors, isLoading, handleChange }: AppSettingsInputsProps) => {
		const [values, setValues] = useState<Record<string, string>>({})
		const [isSaving, setIsSaving] = useState(false)
		const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
			null
		)
		const [protectedValues, setProtectedValues] = useState<Record<string, string>>({})
		const groupedSettings = useMemo(() => {
			const editableSettings = settings.filter(s => s.isEditable)

			return groupBy(editableSettings, setting => setting.group)
		}, [settings])

		const handleSave = (key: string, value: string) => {
			const setting = settings.find(s => s.key === key)
			if (setting?.isProtected) {
				setProtectedValues(prev => ({ ...prev, [key]: value }))
			} else {
				setValues(prev => ({ ...prev, [key]: value }))
			}
		}

		const handleSaveAll = async () => {
			setIsSaving(true)
			setMessage(null)

			try {
				const payload = {
					...values,
					...protectedValues
				}

				const response = await fetch('/api/settings', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(payload)
				})

				if (!response.ok) {
					throw new Error('Error al guardar los cambios')
				}

				setMessage({ type: 'success', text: 'Configuración guardada exitosamente' })
				setProtectedValues({})
				setTimeout(() => setMessage(null), 5000)
			} catch (error) {
				setMessage({
					type: 'error',
					text: error instanceof Error ? error.message : 'Error desconocido'
				})
			} finally {
				setIsSaving(false)
			}
		}

		const hasChanges = Object.keys(protectedValues).length > 0
		return (
			<div className="px-6 py-8">
				{/* Tabs Content */}
				<Tabs defaultValue="security" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						{Object.entries(GROUP_LABELS).map(([groupKey, { label, icon }]) => (
							<TabsTrigger key={groupKey} value={groupKey}>
								<span className="mr-2">{icon}</span>
								{label}
							</TabsTrigger>
						))}
					</TabsList>
					{/*  Tabs Content */}
					{Object.entries(groupedSettings).map(([groupKey, settings]) => (
						<TabsContent key={groupKey} value={groupKey} className="mt-6 space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>
										{GROUP_LABELS[groupKey as keyof typeof GROUP_LABELS]?.label}
									</CardTitle>
									<CardDescription>
										Configura los parámetros para{' '}
										{GROUP_LABELS[
											groupKey as keyof typeof GROUP_LABELS
										]?.label.toLowerCase()}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<SettingsForm
										settings={settings}
										onSave={handleSave}
										values={values}
										protectedValues={protectedValues}
									/>
								</CardContent>
							</Card>
						</TabsContent>
					))}
				</Tabs>
				<div className="mt-8 flex justify-end gap-3">
					<Button
						buttonSize="medium"
						color="green"
						size="content"
						text="Guardar Cambios"
					/>
					<Button
						buttonSize="medium"
						color="red"
						size="content"
						text="Descartar Cambios"
					/>
				</div>
			</div>
		)
	}
)
AppSettingsInputs.displayName = 'AppSettingsInputs'

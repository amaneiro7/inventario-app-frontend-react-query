import { memo } from 'react'
import { useUpdateAppSettings } from '../hook/useUpdateAppSettings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { Switch } from '@/shared/ui/Switch'
import { Label } from '@/shared/ui/Label'
import { SettingArrayInput } from './SettingArrayInput'
import { SettingsDayOfWeekSelect } from './SettingsDayOfWeekSelect'
import { Icon, type IconName } from '@/shared/ui/icon/Icon'
import { type AppSettingsDto } from '../../domain/dto/AppSettings.dto'

const groupConfigs: Record<string, { title: string; description: string; iconName: IconName }> = {
	security: {
		title: 'Seguridad',
		description: 'Configuraciones de seguridad y autenticación',
		iconName: 'shield'
	},
	location_monitoring: {
		title: 'Monitoreo de Ubicación',
		description: 'Configuraciones para el seguimiento de ubicación',
		iconName: 'mapPin'
	},
	device_monitoring: {
		title: 'Monitoreo de Dispositivos',
		description: 'Configuraciones para el seguimiento de dispositivos',
		iconName: 'smartphone'
	}
}

export const AppSettingsInputs = memo(() => {
	const {
		handleChange,
		handleSubmit,
		isLoading,
		isSubmitting,
		hasChanges,
		resetForm,
		getGroupSettings
	} = useUpdateAppSettings()

	const renderSettingInput = (setting: AppSettingsDto) => {
		if (!setting.isEditable) {
			return <Badge variant="secondary">Solo lectura</Badge>
		}

		switch (setting.type) {
			case 'boolean':
				return (
					<Switch
						checked={setting.value === 'true'}
						onCheckedChange={checked =>
							handleChange(setting.key, String(checked), setting.type)
						}
					/>
				)
			case 'number':
				return (
					<Input
						id={setting.key}
						label=""
						name={setting.key}
						type="number"
						value={setting.value}
						onChange={e => handleChange(setting.key, e.target.value, setting.type)}
						className="max-w-xs"
					/>
				)

			case 'array':
				return (
					<SettingArrayInput
						value={setting.value}
						onChange={newValue => handleChange(setting.key, newValue, setting.type)}
					/>
				)

			case 'dayOfWeek':
				return (
					<SettingsDayOfWeekSelect
						value={setting.value}
						onChange={newValue => handleChange(setting.key, newValue, setting.type)}
					/>
				)

			default:
				return (
					<Input
						id={setting.key}
						label=""
						type={setting.isProtected ? 'password' : 'text'}
						name={setting.key}
						value={setting.value}
						placeholder={setting.isProtected ? 'Ingrese nueva contraseña' : ''}
						onChange={e => handleChange(setting.key, e.target.value, setting.type)}
						className="max-w-xs"
					/>
				)
		}
	}

	return (
		<div className="bg-background min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Tabs defaultValue="security" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="security" className="gap-2">
							<Icon name="shield" className="h-4 w-4" />
							Seguridad
						</TabsTrigger>
						<TabsTrigger value="location_monitoring" className="gap-2">
							<Icon name="mapPin" className="h-4 w-4" />
							Ubicaciones
						</TabsTrigger>
						<TabsTrigger value="device_monitoring" className="gap-2">
							<Icon name="smartphone" className="h-4 w-4" />
							Dispositivos
						</TabsTrigger>
					</TabsList>

					{Object.entries(groupConfigs).map(([groupKey, config]) => (
						<TabsContent key={groupKey} value={groupKey}>
							<Card>
								<CardHeader>
									<div className="flex items-center gap-3">
										<Icon
											name={config.iconName}
											className="text-primary h-6 w-6"
										/>
										<div>
											<CardTitle>{config.title}</CardTitle>
											<CardDescription>{config.description}</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-6">
									{getGroupSettings(groupKey).map(setting => (
										<div
											key={setting.key}
											className="space-y-2 border-b pb-4 last:border-0"
										>
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1 space-y-1">
													<Label
														htmlFor={setting.key}
														className="text-base font-semibold"
													>
														{setting.name}
													</Label>
													<p className="text-muted-foreground text-sm">
														{setting.description}
													</p>
												</div>
												<div className="flex items-center gap-3">
													{renderSettingInput(setting)}
												</div>
											</div>
										</div>
									))}
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
						text={isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
						disabled={isSubmitting || isLoading || !hasChanges}
						onClick={handleSubmit}
						icon={<Icon name="save" className="h-4 w-4" />}
					/>
					<Button
						buttonSize="medium"
						color="red"
						size="content"
						onClick={resetForm}
						text="Descartar Cambios"
					/>
				</div>
			</div>
		</div>
	)
})
AppSettingsInputs.displayName = 'AppSettingsInputs'

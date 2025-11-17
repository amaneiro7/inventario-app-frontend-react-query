import { memo } from 'react'
import { type AppSettingsDto } from '@/entities/appSettings/domain/dto/AppSettings.dto'
import { type SettingsTypeEnum } from '@/entities/appSettings/domain/value-object/AppSettingsType'
import { Badge } from '@/shared/ui/Badge'
import { Input } from '@/shared/ui/Input/Input'
import { Label } from '@/shared/ui/Label'
import { Switch } from '@/shared/ui/Switch'
import { SettingArrayInput } from '@/widgets/AppSettingsForm/ui/SettingArrayInput'
import { SettingsDayOfWeekSelect } from '@/widgets/AppSettingsForm/ui/SettingsDayOfWeekSelect'

interface AppSettingItemProps {
	setting: AppSettingsDto
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
}

const renderSettingInput = (
	setting: AppSettingsDto,
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
) => {
	if (!setting.isEditable) {
		return <Badge variant="secondary">Solo lectura</Badge>
	}

	switch (setting.type) {
		case 'boolean':
			return (
				<Switch
					checked={setting.value === 'true'}
					className="data-[state=checked]:bg-naranja"
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

export const AppSettingItem = memo(({ setting, handleChange }: AppSettingItemProps) => {
	return (
		<div className="space-y-2 border-b pb-4 last:border-0">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 space-y-1">
					<Label htmlFor={setting.key} className="text-base font-semibold">
						{setting.name}
					</Label>
					<p className="text-muted-foreground text-sm">{setting.description}</p>
				</div>
				<div className="flex items-center gap-3">
					{renderSettingInput(setting, handleChange)}
				</div>
			</div>
		</div>
	)
})

AppSettingItem.displayName = 'AppSettingItem'

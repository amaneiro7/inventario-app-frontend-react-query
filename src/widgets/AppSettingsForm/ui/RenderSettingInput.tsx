import { Input } from '@/shared/ui/Input/Input'
import { Badge } from '@/shared/ui/Badge'
import { Switch } from '@/shared/ui/Switch'
import { SettingArrayInput } from './SettingArrayInput'
import { SettingsDayOfWeekSelect } from './SettingsDayOfWeekSelect'
import type { AppSettingsDto } from '../../../entities/appSettings/domain/dto/AppSettings.dto'
import type { SettingsTypeEnum } from '@/entities/appSettings/domain/value-object/AppSettingsType'

export function RenderSettingInput({
	handleChange,
	setting
}: {
	setting: AppSettingsDto
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
}) {
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

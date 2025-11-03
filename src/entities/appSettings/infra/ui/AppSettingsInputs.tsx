import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { type AppSettingsForm } from '../reducers/AppSettingsFormReducer'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'

interface AppSettingsInputsProps {
	settings: AppSettingsForm[]
	errors: Record<string, string>
	isLoading: boolean
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
}

export const AppSettingsInputs = memo(
	({ settings, errors, isLoading, handleChange }: AppSettingsInputsProps) => {
		const editableSettings = settings.filter(s => s.isEditable)
		return (
			<div className="grid gap-4 md:grid-cols-2">
				{editableSettings.map(setting => (
					<div key={setting.key}>
						<Input
							id={`setting-${setting.key}`}
							value={setting.value}
							name={setting.key}
							label={setting.description}
							isLoading={isLoading}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange(setting.key, e.target.value, setting.type)
							}
							error={!!errors[setting.key]}
							errormessage={errors[setting.key]}
							disabled={!setting.isEditable}
						/>
					</div>
				))}
			</div>
		)
	}
)
AppSettingsInputs.displayName = 'AppSettingsInputs'

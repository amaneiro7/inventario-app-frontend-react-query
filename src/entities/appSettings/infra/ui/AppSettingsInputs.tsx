import { memo, useMemo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { type AppSettingsForm } from '../reducers/AppSettingsFormReducer'
import Typography from '@/shared/ui/Typography'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'
import { Checkbox } from '@/shared/ui/Checkbox'

interface AppSettingsInputsProps {
	settings: AppSettingsForm[]
	errors: Record<string, string>
	isLoading: boolean
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
}

export const AppSettingsInputs = memo(
	({ settings, errors, isLoading, handleChange }: AppSettingsInputsProps) => {
		const groupedSettings = useMemo(() => {
			const editableSettings = settings.filter(s => s.isEditable)

			return editableSettings.reduce<Record<string, AppSettingsForm[]>>((acc, setting) => {
				const group = setting.group
				if (!acc[group]) {
					acc[group] = []
				}
				acc[group].push(setting)
				return acc
			}, {})
		}, [settings])

		const renderInput = (setting: AppSettingsForm) => {
			switch (setting.type) {
				case 'boolean':
					return (
						<div className="flex items-center space-x-2">
							<Checkbox
								id={`setting-${setting.key}`}
								checked={setting.value === 'true'}
								onChange={checked =>
									handleChange(setting.key, String(checked), setting.type)
								}
								disabled={!setting.isEditable || isLoading}
							/>
							<label
								htmlFor={`setting-${setting.key}`}
								className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{setting.description}
							</label>
						</div>
					)
				// TODO: Consider creating a specific Textarea component for JSON
				case 'json':
				case 'string':
				case 'number':
				default:
					return (
						<Input
							id={`setting-${setting.key}`}
							value={setting.value}
							name={setting.key}
							label={setting.key
								.replace(/_/g, ' ')
								.replace(/([a-z])([A-Z])/g, '$1 $2')
								.toLowerCase()}
							type={
								setting.isProtected
									? 'password'
									: setting.type === 'number'
										? 'number'
										: 'text'
							}
							isLoading={isLoading}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange(setting.key, e.target.value, setting.type)
							}
							error={!!errors[setting.key]}
							errormessage={errors[setting.key]}
							disabled={!setting.isEditable || isLoading}
						/>
					)
			}
		}

		return (
			<div className="flex flex-col gap-8">
				{Object.entries(groupedSettings).map(([group, settingsInGroup]) => (
					<div key={group} className="flex flex-col gap-4">
						<Typography variant="h3" weight="semibold" className="capitalize">
							{group.replace(/_/g, ' ')}
						</Typography>
						<div className="grid gap-4 md:grid-cols-2">
							{settingsInGroup.map(setting => (
								<div key={setting.key} className="flex flex-col gap-1">
									{renderInput(setting)}
									{setting.type !== 'boolean' && (
										<Typography
											variant="p"
											color="gris"
											option="small"
											className="pl-1"
										>
											{setting.description}
										</Typography>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		)
	}
)
AppSettingsInputs.displayName = 'AppSettingsInputs'

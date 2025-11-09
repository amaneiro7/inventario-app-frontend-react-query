import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { AppSettingItem } from './AppSettingItem'
import { type IconName, Icon } from '@/shared/ui/icon/Icon'
import { type AppSettingsDto } from '@/entities/appSettings/domain/dto/AppSettings.dto'
import { type SettingsTypeEnum } from '@/entities/appSettings/domain/value-object/AppSettingsType'

interface SettingsGroupCardProps {
	groupKey: string
	formId: string
	title: string
	description: string
	iconName: IconName
	settings: AppSettingsDto[]
	handleSubmit: (event: React.FormEvent<Element>) => Promise<void>
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
}

export const SettingsGroupCard = memo(
	({
		title,
		description,
		formId,
		iconName,
		settings,
		handleChange,
		handleSubmit
	}: SettingsGroupCardProps) => {
		return (
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<Icon name={iconName} className="text-primary h-6 w-6" />
						<div>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<form
						id={formId}
						method="post"
						className="space-y-6 p-6 pt-0"
						onSubmit={handleSubmit}
					>
						{settings.map(setting => (
							<AppSettingItem
								key={setting.key}
								setting={setting}
								handleChange={handleChange}
							/>
						))}
					</form>
				</CardContent>
			</Card>
		)
	}
)

SettingsGroupCard.displayName = 'SettingsGroupCard'

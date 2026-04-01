import { lazy, memo } from 'react'
import { Label } from '@/shared/ui/Label'
import type { AppSettingsDto } from '@/entities/appSettings/domain/dto/AppSettings.dto'
import type { SettingsTypeEnum } from '@/entities/appSettings/domain/value-object/AppSettingsType'

const RenderSettingInput = lazy(() =>
	import('./RenderSettingInput').then(m => ({
		default: m.RenderSettingInput
	}))
)

interface AppSettingItemProps {
	setting: AppSettingsDto
	handleChange: (key: string, value: string, type: SettingsTypeEnum) => void
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
					<RenderSettingInput setting={setting} handleChange={handleChange} />
				</div>
			</div>
		</div>
	)
})

AppSettingItem.displayName = 'AppSettingItem'

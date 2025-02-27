import { lazy, memo } from 'react'
import {
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { HardDriveCapacityCombobox } from '@/components/ComboBox/Sincrono/HardDriveCapacityComboBox'
import { HardDriveHealth } from '@/core/devices/devices/domain/value-object/HardDriveHealth'
import { HardDriveTypeCombobox } from '@/components/ComboBox/Sincrono/HardDriveTypeComboBox'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	hardDriveCapacityId: DefaultDevice['hardDriveCapacityId']
	hardDriveTypeId: DefaultDevice['hardDriveTypeId']
	health: DefaultDevice['health']
	errorsHealth: DevicesErrors['health']
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const AddHardDriveFeatures = memo(function ({
	errorsHealth,
	hardDriveCapacityId,
	hardDriveTypeId,
	health,
	handleChange
}: Props) {
	return (
		<div className="flex gap-4">
			<Input
				value={health}
				name="health"
				type="number"
				label="Health"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('health', e.target.value)
				}
				error={!!errorsHealth}
				errorMessage={errorsHealth}
				required
				min={HardDriveHealth.MIN}
				max={HardDriveHealth.MAX}
			/>
			<HardDriveCapacityCombobox
				value={hardDriveCapacityId ?? ''}
				handleChange={(_name, value) => handleChange('hardDriveCapacityId', value)}
				name="hardDriveCapacityId"
				required
			/>
			<HardDriveTypeCombobox
				value={hardDriveTypeId ?? ''}
				handleChange={(_name, value) => handleChange('hardDriveTypeId', value)}
				name="hardDriveTypeId"
				required
			/>
		</div>
	)
})

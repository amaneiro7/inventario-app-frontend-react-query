import { memo } from 'react'
import {
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'
import { HardDriveHealth } from '@/entities/devices/devices/domain/value-object/HardDriveHealth'
import { Input } from '@/shared/ui/Input/Input'
import { HardDriveCapacityCombobox } from '@/entities/devices/features/hardDrive/hardDriveCapacity/infra/ui/HardDriveCapacityComboBox'
import { HardDriveTypeCombobox } from '@/entities/devices/features/hardDrive/hardDriveType/infra/ui/HardDriveTypeComboBox'

interface AddHardDriveFeaturesProps {
	hardDriveCapacityId: DefaultDevice['hardDriveCapacityId']
	hardDriveTypeId: DefaultDevice['hardDriveTypeId']
	health: DefaultDevice['health']
	errorsHealth: DevicesErrors['health']
	isLoading: boolean
	canEdit: boolean
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const AddHardDriveFeatures = memo(
	({
		errorsHealth,
		hardDriveCapacityId,
		hardDriveTypeId,
		health,
		isLoading,
		canEdit,
		handleChange
	}: AddHardDriveFeaturesProps) => {
		return (
			<div className="flex gap-4">
				<Input
					id="hdd-health"
					value={health}
					name="health"
					isLoading={isLoading}
					type="number"
					label="Health"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('health', e.target.value)
					}
					error={!!errorsHealth}
					errorMessage={errorsHealth}
					required
					readOnly={!canEdit}
					min={HardDriveHealth.MIN}
					max={HardDriveHealth.MAX}
				/>

				<HardDriveCapacityCombobox
					value={hardDriveCapacityId ?? ''}
					handleChange={(_name, value) => handleChange('hardDriveCapacityId', value)}
					name="hardDriveCapacityId"
					isLoading={isLoading}
					required
					readonly={!canEdit}
				/>

				<HardDriveTypeCombobox
					value={hardDriveTypeId ?? ''}
					handleChange={(_name, value) => handleChange('hardDriveTypeId', value)}
					name="hardDriveTypeId"
					isLoading={isLoading}
					required
					readonly={!canEdit}
				/>
			</div>
		)
	}
)

AddHardDriveFeatures.displayName = 'AddHardDriveFeatures'

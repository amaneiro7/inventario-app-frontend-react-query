import { lazy, memo, Suspense } from 'react'
import {
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { HardDriveHealth } from '@/core/devices/devices/domain/value-object/HardDriveHealth'
import { InputFallback } from '@/components/Loading/InputFallback'
import { Input } from '@/components/Input/Input'

const HardDriveTypeCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/HardDriveTypeComboBox').then(m => ({
		default: m.HardDriveTypeCombobox
	}))
)
const HardDriveCapacityCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/HardDriveCapacityComboBox').then(m => ({
		default: m.HardDriveCapacityCombobox
	}))
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
				id="hdd-health"
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
			<Suspense fallback={<InputFallback />}>
				<HardDriveCapacityCombobox
					value={hardDriveCapacityId ?? ''}
					handleChange={(_name, value) => handleChange('hardDriveCapacityId', value)}
					name="hardDriveCapacityId"
					required
				/>
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<HardDriveTypeCombobox
					value={hardDriveTypeId ?? ''}
					handleChange={(_name, value) => handleChange('hardDriveTypeId', value)}
					name="hardDriveTypeId"
					required
				/>
			</Suspense>
		</div>
	)
})

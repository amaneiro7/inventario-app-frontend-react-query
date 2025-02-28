import { lazy, memo } from 'react'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { OperatingSystemCombobox } from '@/components/ComboBox/Sincrono/OperatingSystemComboBox'
import { OperatingSystemArqCombobox } from '@/components/ComboBox/Sincrono/OperatingSystemArqComboBox'
import { ProcessorCombobox } from '@/components/ComboBox/Asincrono/ProcessorComboBox'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	formData: DefaultDevice
	errors: DevicesErrors
	disabled: DevicesDisabled
	required: DeviceRequired
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const DeviceInputs = memo(function ({
	formData,
	errors,
	disabled,
	required,
	handleChange
}: Props) {
	return (
		<>
			<Input
				value={formData.computerName ?? ''}
				name="computerName"
				label="Nombre de equipo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('computerName', e.target.value)
				}
				error={!!errors?.computerName}
				errorMessage={errors?.computerName}
				required={required.computerName}
				disabled={disabled.computerName}
			/>
			<Input
				value={formData.ipAddress ?? ''}
				name="ipAddress"
				label="Dirección IP"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('ipAddress', e.target.value)
				}
				error={!!errors?.ipAddress}
				errorMessage={errors?.ipAddress}
				required={required.ipAddress}
				disabled={disabled.ipAddress}
			/>

			<ProcessorCombobox
				handleChange={(_name, value) => handleChange('processorId', value)}
				value={processorId}
				required={requireP}
				disabled={disabled.processorId}
				error={errors.processorId}
			/>

			<div className="grid grid-cols-2 gap-4 md:col-span-2">
				<div className="grid grid-cols-2 gap-4">
					{memoryRam.length > 0
						? memoryRam?.map((_, index) => (
								<MemoryRamCapacitySlotInput
									key={`memRam-${index}`}
									index={index}
									handleChange={handleMemory}
									value={memoryRam[index]}
								/>
						  ))
						: null}
				</div>
				<div className="flex gap-4">
					<MemoryRamCapacityInput
						value={memoryRamCapacity}
						isRequired={required.memoryRamCapacity}
						isDisabled={disabled.memoryRamCapacity}
						error={errors.memoryRamCapacity}
					/>

					<ReadOnlyInputBox label="Tipo de Memoria" defaultValue={memoryRamType} />
				</div>
			</div>
			<div className="grid md:grid-cols-3 gap-4">
				<div className="col-span-2">
					<HardDriveCapacityComboBox
						handleChange={handleChange}
						value={hardDriveCapacityId}
						type="form"
						isRequired={required.hardDriveCapacityId}
						isDisabled={disabled.hardDriveCapacityId}
						error={errors.hardDriveCapacityId}
					/>
				</div>
				<div>
					<HardDriveTypeComboBox
						handleChange={handleChange}
						value={hardDriveTypeId}
						type="form"
						isRequired={required.hardDriveTypeId}
						isDisabled={disabled.hardDriveTypeId}
						error={errors.hardDriveTypeId}
					/>
				</div>
			</div>
			<div className="grid md:grid-cols-3 gap-4">
				<div className="col-span-2">
					<OperatingSystemCombobox
						handleChange={handleChange}
						value={formData.operatingSystemId ?? ''}
						type="form"
						isRequired={required.operatingSystemId}
						isDisabled={disabled.operatingSystemId}
						error={errors.operatingSystemId}
					/>
				</div>
				<div>
					<OperatingSystemArqCombobox
						handleChange={handleChange}
						value={formData.operatingSystemArqId ?? ''}
						type="form"
						isRequired={required.operatingSystemArqId}
						isDisabled={disabled.operatingSystemArqId}
						error={errors.operatingSystemArqId}
					/>
				</div>
			</div>

			<Input
				value={formData.macAddress ?? ''}
				name="macAddress"
				label="Dirección MAC"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('macAddress', e.target.value)
				}
				error={!!errors?.macAddress}
				errorMessage={errors?.macAddress}
				required={required.macAddress}
				disabled={disabled.macAddress}
			/>
		</>
	)
})

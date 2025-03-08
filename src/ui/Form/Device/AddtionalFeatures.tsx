import { lazy, Suspense, useMemo } from 'react'
import Typography from '@/components/Typography'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import {
	type Action,
	type DefaultDevice,
	type DeviceRequired,
	type DevicesDisabled,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'

const AddComputerFeatures = lazy(() =>
	import('./AddComputerFeatures').then(m => ({ default: m.AddComputerFeatures }))
)
const AddMFPFeatures = lazy(() =>
	import('./AddMFPFeatures').then(m => ({ default: m.AddMFPFeatures }))
)
const AddHardDriveFeatures = lazy(() =>
	import('./AddHardDriveFeatures').then(m => ({ default: m.AddHardDriveFeatures }))
)

interface Props {
	formData: DefaultDevice
	errors: DevicesErrors
	required: DeviceRequired
	disabled: DevicesDisabled
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleChange: (name: Action['type'], value: any) => Promise<void>
	handleMemory: (value: string, index: number) => Promise<void>
}

export function AddtionalFeatures({
	formData,
	disabled,
	errors,
	required,
	handleChange,
	handleMemory
}: Props) {
	const additionalFeatures = useMemo(() => {
		switch (formData.categoryId) {
			case CategoryOptions.ALLINONE:
			case CategoryOptions.COMPUTER:
			case CategoryOptions.LAPTOP:
			case CategoryOptions.SERVER:
				return (
					<AddComputerFeatures
						computerName={formData.computerName}
						processorId={formData.processorId}
						memoryRam={formData.memoryRam}
						memoryRamCapacity={formData.memoryRamCapacity}
						memoryRamType={formData.memoryRamType}
						hardDriveCapacityId={formData.hardDriveCapacityId}
						hardDriveTypeId={formData.hardDriveTypeId}
						operatingSystemArqId={formData.operatingSystemArqId}
						operatingSystemId={formData.operatingSystemId}
						ipAddress={formData.ipAddress}
						macAddress={formData.macAddress}
						errorsComputerName={errors.computerName}
						errorsProcessorId={errors.processorId}
						errorsMemoryRam={errors.memoryRam}
						errorsMemoryRamCapacity={errors.memoryRamCapacity}
						errorsHardDriveCapacityId={errors.hardDriveCapacityId}
						errorsHardDriveTypeId={errors.hardDriveTypeId}
						errorsOperatingSystemArqId={errors.operatingSystemArqId}
						errorsOperatingSystemId={errors.operatingSystemId}
						errorsIpAddress={errors.ipAddress}
						errorsMacAddress={errors.macAddress}
						disabledComputerName={disabled.computerName}
						disabledProcessorId={disabled.processorId}
						disabledMemoryRam={disabled.memoryRam}
						disabledMemoryRamCapacity={disabled.memoryRamCapacity}
						disabledHardDriveCapacityId={disabled.hardDriveCapacityId}
						disabledHardDriveTypeId={disabled.hardDriveTypeId}
						disabledOperatingSystemArqId={disabled.operatingSystemArqId}
						disabledOperatingSystemId={disabled.operatingSystemId}
						disabledIpAddress={disabled.ipAddress}
						disabledMacAddress={disabled.macAddress}
						requiredComputerName={required.computerName}
						requiredProcessorId={required.processorId}
						requiredMemoryRam={required.memoryRam}
						requiredMemoryRamCapacity={required.memoryRamCapacity}
						requiredHardDriveCapacityId={required.hardDriveCapacityId}
						requiredHardDriveTypeId={required.hardDriveTypeId}
						requiredOperatingSystemArqId={required.operatingSystemArqId}
						requiredOperatingSystemId={required.operatingSystemId}
						requiredIpAddress={required.ipAddress}
						requiredMacAddress={required.macAddress}
						handleMemory={handleMemory}
						handleChange={handleChange}
					/>
				)
			case CategoryOptions.MFP:
				return (
					<AddMFPFeatures
						ipAddress={formData.ipAddress}
						handleChange={handleChange}
						error={errors.ipAddress}
					/>
				)
			case CategoryOptions.HARDDRIVE:
				return (
					<AddHardDriveFeatures
						hardDriveCapacityId={formData.hardDriveCapacityId}
						hardDriveTypeId={formData.hardDriveTypeId}
						health={formData.health}
						errorsHealth={errors.health}
						handleChange={handleChange}
					/>
				)
			default:
				return null
		}
	}, [formData, errors, disabled, required, handleChange, handleMemory])
	return (
		<>
			{additionalFeatures !== null && (
				<div className="flex flex-col gap-4  border border-gray-400 rounded-lg p-8 pt-4">
					<Typography color="azul" variant="h4">
						Información Adicional
					</Typography>
					<Suspense>{additionalFeatures}</Suspense>
				</div>
			)}
		</>
	)
}

import { lazy, Suspense, useMemo } from 'react'
import Typography from '@/shared/ui/Typography'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import {
	type Action,
	type DefaultDevice,
	type DeviceRequired,
	type DevicesDisabled,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'
import { AddMFPFeaturesSkeleton } from '../AddMFPFeaturesSkeleton'
import { AddHardDriveFeaturesSkeleton } from '../AddHardDriveFeaturesSkeleton'
import { AddComputerFeaturesSkeleton } from '../AddComputerFeaturesSkeleton'

const AddComputerFeatures = lazy(() =>
	import('./AddComputerFeatures').then(m => ({ default: m.AddComputerFeatures }))
)
const AddMFPFeatures = lazy(() =>
	import('./AddMFPFeatures').then(m => ({ default: m.AddMFPFeatures }))
)
const AddHardDriveFeatures = lazy(() =>
	import('./AddHardDriveFeatures').then(m => ({ default: m.AddHardDriveFeatures }))
)

interface AddtionalFeaturesProps {
	formData: DefaultDevice
	errors: DevicesErrors
	required: DeviceRequired
	disabled: DevicesDisabled
	isLoading: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleChange: (name: Action['type'], value: any) => Promise<void>
	handleMemory: (value: string, index: number) => Promise<void>
}

export function AddtionalFeatures({
	formData,
	disabled,
	errors,
	required,
	isLoading,
	handleChange,
	handleMemory
}: AddtionalFeaturesProps) {
	const additionalFeatures = useMemo(() => {
		switch (formData.categoryId) {
			case CategoryOptions.ALLINONE:
			case CategoryOptions.COMPUTER:
			case CategoryOptions.LAPTOP:
			case CategoryOptions.SERVER:
				return (
					<Suspense fallback={<AddComputerFeaturesSkeleton />}>
						<AddComputerFeatures
							computerName={formData.computerName}
							processorId={formData.processorId}
							modelId={formData.modelId}
							isLoading={isLoading}
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
					</Suspense>
				)
			case CategoryOptions.MFP:
				return (
					<Suspense fallback={<AddMFPFeaturesSkeleton />}>
						<AddMFPFeatures
							ipAddress={formData.ipAddress}
							handleChange={handleChange}
							error={errors.ipAddress}
							isLoading={isLoading}
						/>
					</Suspense>
				)
			case CategoryOptions.HARDDRIVE:
				return (
					<Suspense fallback={<AddHardDriveFeaturesSkeleton />}>
						<AddHardDriveFeatures
							hardDriveCapacityId={formData.hardDriveCapacityId}
							hardDriveTypeId={formData.hardDriveTypeId}
							health={formData.health}
							errorsHealth={errors.health}
							handleChange={handleChange}
							isLoading={isLoading}
						/>
					</Suspense>
				)
			default:
				return null
		}
	}, [formData, errors, disabled, required, handleChange, handleMemory])
	return (
		<>
			{additionalFeatures !== null && (
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Información Adicional
					</Typography>
					{additionalFeatures}
				</div>
			)}
		</>
	)
}

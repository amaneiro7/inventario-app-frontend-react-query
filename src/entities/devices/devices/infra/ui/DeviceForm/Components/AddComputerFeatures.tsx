import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'
const OperatingSystemArqCombobox = lazy(() =>
	import(
		'@/entities/devices/features/operatingSystem/operatingSystemArq/infra/ui/OperatingSystemArqComboBox'
	).then(m => ({ default: m.OperatingSystemArqCombobox }))
)
const OperatingSystemCombobox = lazy(() =>
	import(
		'@/entities/devices/features/operatingSystem/operatingSystem/infra/ui/OperatingSystemComboBox'
	).then(m => ({ default: m.OperatingSystemCombobox }))
)
const HardDriveTypeCombobox = lazy(() =>
	import(
		'@/entities/devices/features/hardDrive/hardDriveType/infra/ui/HardDriveTypeComboBox'
	).then(m => ({ default: m.HardDriveTypeCombobox }))
)
const HardDriveCapacityCombobox = lazy(() =>
	import(
		'@/entities/devices/features/hardDrive/hardDriveCapacity/infra/ui/HardDriveCapacityComboBox'
	).then(m => ({ default: m.HardDriveCapacityCombobox }))
)
const MemoryRamCapacitySlotInput = lazy(() =>
	import('./MemoryRamCapacitySlotInput').then(m => ({ default: m.MemoryRamCapacitySlotInput }))
)
const ProcessorCombobox = lazy(() =>
	import('@/entities/devices/features/processor/infra/ui/ProcessorComboBox').then(m => ({
		default: m.ProcessorCombobox
	}))
)

interface AddComputerFeaturesProps {
	computerName: DefaultDevice['computerName']
	processorId: DefaultDevice['processorId']
	modelId: DefaultDevice['modelId']
	memoryRam: DefaultDevice['memoryRam']
	memoryRamCapacity: DefaultDevice['memoryRamCapacity']
	memoryRamType: DefaultDevice['memoryRamType']
	hardDriveCapacityId: DefaultDevice['hardDriveCapacityId']
	hardDriveTypeId: DefaultDevice['hardDriveTypeId']
	operatingSystemArqId: DefaultDevice['operatingSystemArqId']
	operatingSystemId: DefaultDevice['operatingSystemId']
	ipAddress: DefaultDevice['ipAddress']
	macAddress: DefaultDevice['macAddress']
	errorsComputerName: DevicesErrors['computerName']
	errorsProcessorId: DevicesErrors['processorId']
	errorsMemoryRam: DevicesErrors['memoryRam']
	errorsMemoryRamCapacity: DevicesErrors['memoryRamCapacity']
	errorsHardDriveCapacityId: DevicesErrors['hardDriveCapacityId']
	errorsHardDriveTypeId: DevicesErrors['hardDriveTypeId']
	errorsOperatingSystemArqId: DevicesErrors['operatingSystemArqId']
	errorsOperatingSystemId: DevicesErrors['operatingSystemId']
	errorsIpAddress: DevicesErrors['ipAddress']
	errorsMacAddress: DevicesErrors['macAddress']
	disabledComputerName: DevicesDisabled['computerName']
	disabledProcessorId: DevicesDisabled['processorId']
	disabledMemoryRam: DevicesDisabled['memoryRam']
	disabledMemoryRamCapacity: DevicesDisabled['memoryRamCapacity']
	disabledHardDriveCapacityId: DevicesDisabled['hardDriveCapacityId']
	disabledHardDriveTypeId: DevicesDisabled['hardDriveTypeId']
	disabledOperatingSystemArqId: DevicesDisabled['operatingSystemArqId']
	disabledOperatingSystemId: DevicesDisabled['operatingSystemId']
	disabledIpAddress: DevicesDisabled['ipAddress']
	disabledMacAddress: DevicesDisabled['macAddress']
	requiredComputerName: DeviceRequired['computerName']
	requiredProcessorId: DeviceRequired['processorId']
	requiredMemoryRam: DeviceRequired['memoryRam']
	requiredMemoryRamCapacity: DeviceRequired['memoryRamCapacity']
	requiredHardDriveCapacityId: DeviceRequired['hardDriveCapacityId']
	requiredHardDriveTypeId: DeviceRequired['hardDriveTypeId']
	requiredOperatingSystemArqId: DeviceRequired['operatingSystemArqId']
	requiredOperatingSystemId: DeviceRequired['operatingSystemId']
	requiredIpAddress: DeviceRequired['ipAddress']
	requiredMacAddress: DeviceRequired['macAddress']
	isLoading: boolean
	canEdit: boolean
	handleMemory: (value: string, index: number) => void
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const AddComputerFeatures = memo(
	({ handleChange, handleMemory, canEdit, isLoading, ...props }: AddComputerFeaturesProps) => {
		return (
			<>
				<Input
					id="device-computerName"
					value={props.computerName ?? ''}
					name="computerName"
					isLoading={isLoading}
					label="Nombre de equipo"
					readOnly={!canEdit}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('computerName', e.target.value)
					}
					error={!!props.errorsComputerName}
					errorMessage={props.errorsComputerName}
					required={props.requiredComputerName}
					disabled={props.disabledComputerName}
				/>
				<div className="flex gap-2">
					<Input
						id="device-ipaddress"
						value={props.ipAddress ?? ''}
						name="ipAddress"
						isLoading={isLoading}
						label="Dirección IP"
						readOnly={!canEdit}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('ipAddress', e.target.value)
						}
						error={!!props.errorsIpAddress}
						errorMessage={props.errorsIpAddress}
						required={props.requiredIpAddress}
						disabled={props.disabledIpAddress}
					/>
					<Input
						id="device-macaddress"
						value={props.macAddress ?? ''}
						name="macAddress"
						isLoading={isLoading}
						label="Dirección MAC"
						readOnly={!canEdit}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('macAddress', e.target.value)
						}
						error={!!props.errorsMacAddress}
						errorMessage={props.errorsMacAddress}
						required={props.requiredMacAddress}
						disabled={props.disabledMacAddress}
					/>
				</div>

				<ProcessorCombobox
					value={props.processorId ?? ''}
					handleChange={(_name, value) => handleChange('processorId', value)}
					name="processorId"
					isLoading={isLoading}
					modelId={props.modelId}
					readonly={!canEdit}
					error={props.errorsProcessorId}
					required={props.requiredProcessorId}
					disabled={props.disabledProcessorId}
				/>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="grid grid-cols-2 gap-4">
						{props.memoryRam.length > 0
							? props.memoryRam?.map((_, index) => (
									<MemoryRamCapacitySlotInput
										key={`memRam-${index}`}
										index={index}
										readOnly={!canEdit}
										onChange={handleMemory}
										value={props.memoryRam[index]}
										isLoading={isLoading}
									/>
								))
							: null}
					</div>
					<div className="flex gap-4">
						<Input
							id="computer-memoryRamCapacity"
							value={props.memoryRamCapacity ?? ''}
							name="memoryRamCapacity"
							isLoading={isLoading}
							label="Total Memoria Ram"
							type="number"
							readOnly
							transform
							aria-readonly
							tabIndex={-1}
							onMouseDown={e => {
								e.preventDefault()
							}}
							error={!!props.errorsMemoryRamCapacity}
							errorMessage={props.errorsMemoryRamCapacity}
							required={props.requiredMemoryRamCapacity}
							disabled={props.disabledMemoryRamCapacity}
						/>

						<Input
							id="computer-memoryRamType"
							name="memoryRamType"
							isLoading={isLoading}
							label="Tipo de Memoria"
							value={props.memoryRamType}
							readOnly
							disabled
							tabIndex={-1}
						/>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="col-span-2">
						<HardDriveCapacityCombobox
							value={props.hardDriveCapacityId ?? ''}
							handleChange={(_name, value) =>
								handleChange('hardDriveCapacityId', value)
							}
							name="hardDriveCapacityId"
							isLoading={isLoading}
							readonly={!canEdit}
							error={props.errorsHardDriveCapacityId}
							required={props.requiredHardDriveCapacityId}
							disabled={props.disabledHardDriveCapacityId}
						/>
					</div>
					<div>
						<HardDriveTypeCombobox
							value={props.hardDriveTypeId ?? ''}
							handleChange={(_name, value) => handleChange('hardDriveTypeId', value)}
							name="hardDriveTypeId"
							isLoading={isLoading}
							readonly={!canEdit}
							error={props.errorsHardDriveTypeId}
							required={props.requiredHardDriveTypeId}
							disabled={props.disabledHardDriveTypeId}
						/>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="col-span-2">
						<OperatingSystemCombobox
							value={props.operatingSystemId ?? ''}
							handleChange={(_name, value) =>
								handleChange('operatingSystemId', value)
							}
							name="operatingSystemId"
							isLoading={isLoading}
							readonly={!canEdit}
							error={props.errorsOperatingSystemId}
							required={props.requiredOperatingSystemId}
							disabled={props.disabledOperatingSystemId}
						/>
					</div>
					<div>
						<OperatingSystemArqCombobox
							value={props.operatingSystemArqId ?? ''}
							handleChange={(_name, value) =>
								handleChange('operatingSystemArqId', value)
							}
							name="operatingSystemArqId"
							isLoading={isLoading}
							readonly={!canEdit}
							error={props.errorsOperatingSystemArqId}
							required={props.requiredOperatingSystemArqId}
							disabled={props.disabledOperatingSystemArqId}
						/>
					</div>
				</div>
			</>
		)
	}
)

AddComputerFeatures.displayName = 'AddComputerFeatures'

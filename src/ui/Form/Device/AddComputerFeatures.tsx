import { lazy, memo, Suspense } from 'react'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { Input } from '@/components/Input/Input'
import { InputFallback } from '@/components/Loading/InputFallback'

const OperatingSystemCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/OperatingSystemComboBox').then(m => ({
		default: m.OperatingSystemCombobox
	}))
)
const OperatingSystemArqCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/OperatingSystemArqComboBox').then(m => ({
		default: m.OperatingSystemArqCombobox
	}))
)
const ProcessorCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/ProcessorComboBox').then(m => ({
		default: m.ProcessorCombobox
	}))
)
const HardDriveCapacityCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/HardDriveCapacityComboBox').then(m => ({
		default: m.HardDriveCapacityCombobox
	}))
)
const HardDriveTypeCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/HardDriveTypeComboBox').then(m => ({
		default: m.HardDriveTypeCombobox
	}))
)
const MemoryRamCapacitySlotInput = lazy(() =>
	import('./MemoryRamCapacitySlotInput').then(m => ({ default: m.MemoryRamCapacitySlotInput }))
)

interface Props {
	computerName: DefaultDevice['computerName']
	processorId: DefaultDevice['processorId']
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
	handleMemory: (value: string, index: number) => void
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const AddComputerFeatures = memo(function ({ handleChange, handleMemory, ...props }: Props) {
	return (
		<>
			<Input
				value={props.computerName ?? ''}
				name="computerName"
				label="Nombre de equipo"
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
					value={props.ipAddress ?? ''}
					name="ipAddress"
					label="Dirección IP"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('ipAddress', e.target.value)
					}
					error={!!props.errorsIpAddress}
					errorMessage={props.errorsIpAddress}
					required={props.requiredIpAddress}
					disabled={props.disabledIpAddress}
				/>
				<Input
					value={props.macAddress ?? ''}
					name="macAddress"
					label="Dirección MAC"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('macAddress', e.target.value)
					}
					error={!!props.errorsMacAddress}
					errorMessage={props.errorsMacAddress}
					required={props.requiredMacAddress}
					disabled={props.disabledMacAddress}
				/>
			</div>

			<Suspense fallback={<InputFallback />}>
				<ProcessorCombobox
					value={props.processorId ?? ''}
					handleChange={(_name, value) => handleChange('processorId', value)}
					name="processorId"
					error={props.errorsProcessorId}
					required={props.requiredProcessorId}
					disabled={props.disabledProcessorId}
				/>
			</Suspense>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="grid grid-cols-2 gap-4">
					{props.memoryRam.length > 0
						? props.memoryRam?.map((_, index) => (
								<MemoryRamCapacitySlotInput
									key={`memRam-${index}`}
									index={index}
									onChange={handleMemory}
									value={props.memoryRam[index]}
								/>
							))
						: null}
				</div>
				<div className="flex gap-4">
					<Input
						value={props.memoryRamCapacity ?? ''}
						name="memoryRamCapacity"
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
						name="memoryRamType"
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
					<Suspense fallback={<InputFallback />}>
						<HardDriveCapacityCombobox
							value={props.hardDriveCapacityId ?? ''}
							handleChange={(_name, value) =>
								handleChange('hardDriveCapacityId', value)
							}
							name="hardDriveCapacityId"
							error={props.errorsHardDriveCapacityId}
							required={props.requiredHardDriveCapacityId}
							disabled={props.disabledHardDriveCapacityId}
						/>
					</Suspense>
				</div>
				<div>
					<Suspense fallback={<InputFallback />}>
						<HardDriveTypeCombobox
							value={props.hardDriveTypeId ?? ''}
							handleChange={(_name, value) => handleChange('hardDriveTypeId', value)}
							name="hardDriveTypeId"
							error={props.errorsHardDriveTypeId}
							required={props.requiredHardDriveTypeId}
							disabled={props.disabledHardDriveTypeId}
						/>
					</Suspense>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				<div className="col-span-2">
					<Suspense fallback={<InputFallback />}>
						<OperatingSystemCombobox
							value={props.operatingSystemId ?? ''}
							handleChange={(_name, value) =>
								handleChange('operatingSystemId', value)
							}
							name="operatingSystemId"
							error={props.errorsOperatingSystemId}
							required={props.requiredOperatingSystemId}
							disabled={props.disabledOperatingSystemId}
						/>
					</Suspense>
				</div>
				<div>
					<Suspense fallback={<InputFallback />}>
						<OperatingSystemArqCombobox
							value={props.operatingSystemArqId ?? ''}
							handleChange={(_name, value) =>
								handleChange('operatingSystemArqId', value)
							}
							name="operatingSystemArqId"
							error={props.errorsOperatingSystemArqId}
							required={props.requiredOperatingSystemArqId}
							disabled={props.disabledOperatingSystemArqId}
						/>
					</Suspense>
				</div>
			</div>
		</>
	)
})

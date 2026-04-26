import { lazy, memo, Suspense } from 'react'
import { useOtherComputerFilter } from '../model/useOtherComputerFilter'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { MemoryRamTypeCombobox } from '@/entities/model/memoryRamType/infra/ui/MemoryRamTypeComboBox'
import { SelectOperatorCombobox } from '@/entities/devices/devices/infra/ui/SelectOperator'
import { Divider } from '@/shared/ui/Divider'

const OperatingSystemCombobox = lazy(() =>
	import('@/entities/devices/features/operatingSystem/operatingSystem/infra/ui/OperatingSystemComboBox').then(
		m => ({
			default: m.OperatingSystemCombobox
		})
	)
)
const OperatingSystemArqCombobox = lazy(() =>
	import('@/entities/devices/features/operatingSystem/operatingSystemArq/infra/ui/OperatingSystemArqComboBox').then(
		m => ({
			default: m.OperatingSystemArqCombobox
		})
	)
)
const HardDriveTypeCombobox = lazy(() =>
	import('@/entities/devices/features/hardDrive/hardDriveType/infra/ui/HardDriveTypeComboBox').then(
		m => ({
			default: m.HardDriveTypeCombobox
		})
	)
)

export const OtherComputerFilter = memo(
	({
		computerName = '',
		operatingSystemId = '',
		operatingSystem = '',
		operatingSystemArqId = '',
		hardDriveTypeId = '',
		memoryRamTypeId = '',
		processor = '',
		ipAddress = '',
		memoryRamCapacity = '',
		memoryRamCapacityOperator = '',
		hardDriveCapacity = '',
		hardDriveCapacityOperator = '',
		handleChange
	}: {
		computerName?: string
		operatingSystemId?: string
		operatingSystem?: string
		operatingSystemArqId?: string
		memoryRamCapacity?: string
		memoryRamCapacityOperator?: string
		hardDriveCapacity?: string
		hardDriveCapacityOperator?: string
		hardDriveTypeId?: string
		memoryRamTypeId?: string
		processor?: string
		ipAddress?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const {
			handleComputerName,
			localComputerName,
			handleOperatingSystem,
			localOperatingSystem,
			handleMemoryRamCapacity,
			localMemoryRamCapacity,
			handleHardDriveCapacity,
			localHardDriveCapacity,
			handleProcessor,
			localProcessor,
			handleIPAddress,
			localIPAddress
		} = useOtherComputerFilter({
			computerName,
			operatingSystem,
			processor,
			ipAddress,
			memoryRamCapacity,
			memoryRamCapacityOperator,
			hardDriveCapacity,
			handleChange
		})

		return (
			<>
				<Divider />
				<Input
					id="computerName-search"
					value={localComputerName}
					label="Nombre del computador"
					name="computerName"
					type="search"
					onChange={handleComputerName}
				/>
				<Divider />
				<Suspense fallback={<InputFallback />}>
					<OperatingSystemCombobox
						name="operatingSystemId"
						value={operatingSystemId}
						handleChange={handleChange}
					/>
				</Suspense>
				<Input
					id="operating-system-search"
					value={localOperatingSystem}
					label="Sistema Operativo por nombre"
					name="operatingSystem"
					type="search"
					onChange={handleOperatingSystem}
				/>
				<Suspense fallback={<InputFallback />}>
					<OperatingSystemArqCombobox
						name="operatingSystemArqId"
						value={operatingSystemArqId}
						handleChange={handleChange}
					/>
				</Suspense>
				<Divider />
				<div className="grid grid-cols-[7rem_1fr] items-center gap-x-2">
					<Input
						id="memoryRamCapacity-filter"
						name="memoryRamCapacity"
						label="Memoria Ram"
						value={localMemoryRamCapacity}
						type="number"
						max={64}
						onChange={handleMemoryRamCapacity}
					/>

					<SelectOperatorCombobox
						name="memoryRamCapacityOperator"
						value={memoryRamCapacityOperator}
						handleChange={handleChange}
					/>
				</div>
				<Suspense fallback={<InputFallback />}>
					<MemoryRamTypeCombobox
						name="memoryRamTypeId"
						value={memoryRamTypeId}
						handleChange={handleChange}
					/>
				</Suspense>
				<Divider />
				<div className="grid grid-cols-[7rem_1fr] items-center gap-x-2">
					<Input
						id="hardDriveCapacity-filter"
						name="hardDriveCapacity"
						label="Disco Duro"
						value={localHardDriveCapacity}
						type="number"
						max={8000}
						onChange={handleHardDriveCapacity}
					/>

					<SelectOperatorCombobox
						name="hardDriveCapacityOperator"
						value={hardDriveCapacityOperator}
						handleChange={handleChange}
					/>
				</div>

				<Suspense fallback={<InputFallback />}>
					<HardDriveTypeCombobox
						name="hardDriveTypeId"
						value={hardDriveTypeId}
						handleChange={handleChange}
					/>
				</Suspense>
				<Divider />
				<Input
					id="processor-search"
					value={localProcessor}
					label="Procesador"
					name="processor"
					type="search"
					onChange={handleProcessor}
				/>

				<Input
					id="ipAddress-search"
					value={localIPAddress}
					label="Direccón IP"
					name="ipAddress"
					type="search"
					onChange={handleIPAddress}
				/>
			</>
		)
	}
)
OtherComputerFilter.displayName = 'OtherComputerFilter'

import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { Divider } from '../Divider'
import { MemoryRamTypeCombobox } from '@/entities/model/memoryRamType/infra/ui/MemoryRamTypeComboBox'
import { SelectOperatorCombobox } from '@/entities/devices/devices/infra/ui/SelectOperator'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'

const OperatingSystemCombobox = lazy(() =>
	import(
		'@/entities/devices/features/operatingSystem/operatingSystem/infra/ui/OperatingSystemComboBox'
	).then(m => ({
		default: m.OperatingSystemCombobox
	}))
)
const OperatingSystemArqCombobox = lazy(() =>
	import(
		'@/entities/devices/features/operatingSystem/operatingSystemArq/infra/ui/OperatingSystemArqComboBox'
	).then(m => ({
		default: m.OperatingSystemArqCombobox
	}))
)
const HardDriveTypeCombobox = lazy(() =>
	import(
		'@/entities/devices/features/hardDrive/hardDriveType/infra/ui/HardDriveTypeComboBox'
	).then(m => ({
		default: m.HardDriveTypeCombobox
	}))
)

export const OtherComputerFilter = memo(
	({
		computerName = '',
		operatingSystemId = '',
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
		const [localComputerName, setLocalComputerName] = useState(computerName ?? '')
		const [localProcessor, setLocalProcessor] = useState(processor ?? '')
		const [localIPAddress, setLocalIPAddress] = useState(ipAddress ?? '')
		const [localMemoryRamCapacity, setLocalMemoryRamCapacity] = useState(
			memoryRamCapacity ?? ''
		)
		const [localHardDriveCapacity, setLocalHardDriveCapacity] = useState(
			hardDriveCapacity ?? ''
		)

		const [debounceComputerName] = useDebounce(localComputerName)
		const [debounceProcessor] = useDebounce(localProcessor)
		const [debounceIPAddress] = useDebounce(localIPAddress)
		const [debounceMemoryRamCapacity] = useDebounce(localMemoryRamCapacity, 100)
		const [debounceHardDriveCapacity] = useDebounce(localHardDriveCapacity, 100)

		useEffectAfterMount(() => {
			handleChange('computerName', debounceComputerName)
		}, [debounceComputerName])
		useEffectAfterMount(() => {
			handleChange('processor', debounceProcessor)
		}, [debounceProcessor])
		useEffectAfterMount(() => {
			handleChange('ipAddress', debounceIPAddress)
		}, [debounceIPAddress])
		useEffectAfterMount(() => {
			handleChange('memoryRamCapacity', debounceMemoryRamCapacity)
		}, [debounceMemoryRamCapacity])
		useEffectAfterMount(() => {
			handleChange('hardDriveCapacity', debounceHardDriveCapacity)
		}, [debounceHardDriveCapacity])

		useEffectAfterMount(() => {
			if (!computerName) setLocalComputerName('')
		}, [computerName])
		useEffectAfterMount(() => {
			if (!processor) setLocalProcessor('')
		}, [processor])
		useEffectAfterMount(() => {
			if (!ipAddress) setLocalIPAddress('')
		}, [ipAddress])
		useEffectAfterMount(() => {
			if (!hardDriveCapacity) setLocalHardDriveCapacity('')
		}, [hardDriveCapacity])
		useEffectAfterMount(() => {
			if (!memoryRamCapacity) setLocalMemoryRamCapacity('')
		}, [memoryRamCapacity])

		const handleComputerName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalComputerName(value)
		}, [])
		const handleProcessor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalProcessor(value)
		}, [])

		const handleIPAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalIPAddress(value)
		}, [])
		const handleMemoryRamCapacity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalMemoryRamCapacity(value)
			if (memoryRamCapacityOperator === '' && value) {
				handleChange('memoryRamCapacityOperator', Operator.EQUAL)
			} else if (!value && memoryRamCapacityOperator) {
				handleChange('memoryRamCapacityOperator', '')
			}
		}, [])
		const handleHardDriveCapacity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalHardDriveCapacity(value)
			if (memoryRamCapacityOperator === '') {
				handleChange('memoryRamCapacityOperator', Operator.EQUAL)
			}
		}, [])

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

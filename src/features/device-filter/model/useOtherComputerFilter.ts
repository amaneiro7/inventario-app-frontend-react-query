import { useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'

export const useOtherComputerFilter = ({
	computerName = '',
	operatingSystem = '',
	processor = '',
	ipAddress = '',
	memoryRamCapacity = '',
	memoryRamCapacityOperator = '',
	hardDriveCapacity = '',

	handleChange
}: {
	computerName?: string
	operatingSystem?: string
	processor?: string
	ipAddress?: string
	memoryRamCapacity?: string
	memoryRamCapacityOperator?: string
	hardDriveCapacity?: string
	handleChange: (name: string, value: string | number) => void
}) => {
	const [localComputerName, setLocalComputerName] = useState(computerName ?? '')
	const [localProcessor, setLocalProcessor] = useState(processor ?? '')
	const [localOperatingSystem, setLocalOperatingSystem] = useState(operatingSystem ?? '')
	const [localIPAddress, setLocalIPAddress] = useState(ipAddress ?? '')
	const [localMemoryRamCapacity, setLocalMemoryRamCapacity] = useState(memoryRamCapacity ?? '')
	const [localHardDriveCapacity, setLocalHardDriveCapacity] = useState(hardDriveCapacity ?? '')

	const [debounceComputerName] = useDebounce(localComputerName)
	const [debounceProcessor] = useDebounce(localProcessor)
	const [debounceOperatingSystem] = useDebounce(localOperatingSystem)
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
		handleChange('operatingSystem', debounceOperatingSystem)
	}, [debounceOperatingSystem])
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
		if (!operatingSystem) setLocalOperatingSystem('')
	}, [operatingSystem])
	useEffectAfterMount(() => {
		if (!ipAddress) setLocalIPAddress('')
	}, [ipAddress])
	useEffectAfterMount(() => {
		if (!hardDriveCapacity) setLocalHardDriveCapacity('')
	}, [hardDriveCapacity])
	useEffectAfterMount(() => {
		if (!memoryRamCapacity) setLocalMemoryRamCapacity('')
	}, [memoryRamCapacity])

	const handleComputerName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalComputerName(value)
	}
	const handleProcessor = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalProcessor(value)
	}
	const handleOperatingSystem = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setLocalOperatingSystem(value)
	}

	const handleIPAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalIPAddress(value)
	}
	const handleMemoryRamCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalMemoryRamCapacity(value)
		if (memoryRamCapacityOperator === '' && value) {
			handleChange('memoryRamCapacityOperator', Operator.EQUAL)
		} else if (!value && memoryRamCapacityOperator) {
			handleChange('memoryRamCapacityOperator', '')
		}
	}
	const handleHardDriveCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalHardDriveCapacity(value)
		if (memoryRamCapacityOperator === '') {
			handleChange('memoryRamCapacityOperator', Operator.EQUAL)
		}
	}

	return {
		localComputerName,
		localProcessor,
		localOperatingSystem,
		localIPAddress,
		localMemoryRamCapacity,
		localHardDriveCapacity,
		handleComputerName,
		handleProcessor,
		handleOperatingSystem,
		handleIPAddress,
		handleMemoryRamCapacity,
		handleHardDriveCapacity
	}
}

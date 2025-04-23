import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useDebounce } from '@/hooks/utils/useDebounce'
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
const HardDriveTypeCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/HardDriveTypeComboBox').then(m => ({
		default: m.HardDriveTypeCombobox
	}))
)

export const OtherComputerFilter = memo(
	({
		computerName = '',
		operatingSystemId = '',
		operatingSystemArqId = '',
		hardDriveTypeId = '',
		processor = '',
		ipAddress = '',
		handleChange
	}: {
		computerName?: string
		operatingSystemId?: string
		operatingSystemArqId?: string
		hardDriveTypeId?: string
		processor?: string
		ipAddress?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const [localComputerName, setLocalComputerName] = useState(computerName ?? '')
		const [localProcessor, setLocalProcessor] = useState(processor ?? '')
		const [localIPAddress, setLocalIPAddress] = useState(ipAddress ?? '')
		const [debounceComputerName] = useDebounce(localComputerName)
		const [debounceProcessor] = useDebounce(localProcessor)
		const [debounceIPAddress] = useDebounce(localIPAddress)

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
			if (!computerName) setLocalComputerName('')
		}, [computerName])
		useEffectAfterMount(() => {
			if (!processor) setLocalProcessor('')
		}, [processor])

		useEffectAfterMount(() => {
			if (!ipAddress) setLocalIPAddress('')
		}, [ipAddress])

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
		return (
			<>
				<hr className="border-verde" />
				<Input
					value={localComputerName}
					label="Nombre del computador"
					name="computerName"
					type="search"
					onChange={handleComputerName}
				/>
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
				<Suspense fallback={<InputFallback />}>
					<HardDriveTypeCombobox
						name="hardDriveTypeId"
						value={hardDriveTypeId}
						handleChange={handleChange}
					/>
				</Suspense>
				<Input
					value={localProcessor}
					label="Procesador"
					name="processor"
					type="search"
					onChange={handleProcessor}
				/>

				<Input
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

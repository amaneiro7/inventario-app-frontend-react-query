import { lazy, useState } from 'react'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useDebounce } from '@/hooks/utils/useDebounce'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)
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
export function OtherComputerFilter({
	computerName = '',
	operatingSystemId = '',
	operatingSystemArqId = '',
	processor = '',
	ipAddress = '',
	handleChange
}: {
	computerName?: string
	operatingSystemId?: string
	operatingSystemArqId?: string
	processor?: string
	ipAddress?: string
	handleChange: (name: string, value: string | number) => void
}) {
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
	return (
		<>
			<Input
				value={localComputerName}
				label="Nombre del computador"
				name="computerName"
				type="search"
				onChange={e => {
					let { value } = e.target
					value = value.trim().toUpperCase()
					setLocalComputerName(value)
				}}
			/>

			<OperatingSystemCombobox
				name="operatingSystemId"
				value={operatingSystemId}
				handleChange={handleChange}
			/>

			<OperatingSystemArqCombobox
				name="operatingSystemArqId"
				value={operatingSystemArqId}
				handleChange={handleChange}
			/>

			<Input
				value={localProcessor}
				label="Procesador"
				name="processor"
				type="search"
				onChange={e => {
					let { value } = e.target
					value = value.trim().toUpperCase()
					setLocalProcessor(value)
				}}
			/>

			<Input
				value={localIPAddress}
				label="Direccón IP"
				name="ipAddress"
				type="search"
				onChange={e => {
					let { value } = e.target
					value = value.trim().toUpperCase()
					setLocalIPAddress(value)
				}}
			/>
		</>
	)
}

import { useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'

export const useMainDeviceMonitoringFilter = ({
	handleChange,
	ipAddress,
	computerName
}: {
	ipAddress?: string | null
	computerName?: string
	handleChange: (name: string, value: string | number) => void
}) => {
	const [localIpAddress, setLocalIpAddress] = useState(ipAddress ?? '')
	const [localComputerName, setLocalComputerName] = useState(computerName ?? '')
	const [debounceIpAddress] = useDebounce(localIpAddress)
	const [debounceComputerName] = useDebounce(localComputerName)

	useEffectAfterMount(() => {
		handleChange('ipAddress', debounceIpAddress)
	}, [debounceIpAddress])
	useEffectAfterMount(() => {
		handleChange('computerName', debounceComputerName)
	}, [debounceComputerName])

	useEffectAfterMount(() => {
		if (!ipAddress) {
			setLocalIpAddress('')
		}
	}, [ipAddress])
	useEffectAfterMount(() => {
		if (!computerName) {
			setLocalComputerName('')
		}
	}, [computerName])

	const handleComputerName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalComputerName(value)
	}, [])
	const handleIpAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalIpAddress(value)
	}, [])
	return {
		localIpAddress,
		localComputerName,
		handleComputerName,
		handleIpAddress
	}
}

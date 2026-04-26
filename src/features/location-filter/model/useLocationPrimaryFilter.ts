import { useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'

export const useLocationPrimaryFilter = ({
	handleChange,
	name,
	subnet
}: {
	handleChange: (name: string, value: string | number) => void
	name?: string
	subnet?: string
}) => {
	const [localName, setLocalName] = useState(name ?? '')
	const [localSubnet, setLocalSubnet] = useState(subnet ?? '')
	const [debouncedName] = useDebounce(localName)
	const [debouncedSubnet] = useDebounce(localSubnet)

	useEffectAfterMount(() => {
		handleChange('name', debouncedName)
	}, [debouncedName])

	useEffectAfterMount(() => {
		handleChange('subnet', debouncedSubnet)
	}, [debouncedSubnet])

	useEffectAfterMount(() => {
		if (!name) {
			setLocalName('')
		}
	}, [name])

	useEffectAfterMount(() => {
		if (!subnet) {
			setLocalSubnet('')
		}
	}, [subnet])

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase()
		setLocalName(value)
	}

	const handleSubnet = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase()
		setLocalSubnet(value)
	}
	return {
		localName,
		localSubnet,
		handleName,
		handleSubnet
	}
}

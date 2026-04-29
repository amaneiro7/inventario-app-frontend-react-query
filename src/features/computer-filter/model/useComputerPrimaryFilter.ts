import { useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'

export const useComputerPrimaryFilter = ({
	serial,
	handleChange
}: {
	serial?: string
	handleChange: (key: string, value: string) => void
}) => {
	const [localSerial, setLocalSerial] = useState(serial ?? '')
	const [debounceSerial] = useDebounce(localSerial)

	useEffectAfterMount(() => {
		handleChange('serial', debounceSerial)
	}, [debounceSerial])

	useEffectAfterMount(() => {
		if (!serial) {
			setLocalSerial('')
		}
	}, [serial])

	const handleSerial = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalSerial(value)
	}
	return {
		localSerial,
		handleSerial
	}
}

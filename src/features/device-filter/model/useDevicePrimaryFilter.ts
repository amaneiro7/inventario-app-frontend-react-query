import { useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'

export const useDevicePrimaryFilter = ({
	activo,
	handleChange
}: {
	activo?: string
	handleChange: (name: string, value: string | number) => void
}) => {
	const [localActivo, setLocalActivo] = useState(activo ?? '')
	const [debounceActivo] = useDebounce(localActivo)

	useEffectAfterMount(() => {
		handleChange('activo', debounceActivo)
	}, [debounceActivo])

	useEffectAfterMount(() => {
		if (!activo) {
			setLocalActivo('')
		}
	}, [activo])

	const handleActivo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalActivo(value)
	}

	return {
		localActivo,
		handleActivo
	}
}

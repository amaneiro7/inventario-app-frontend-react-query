import { useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'

export const useMigrationRulesPrimaryFilter = ({
	minRamGb = '',
	minRamGbOperator = '',
	minDiskGb = '',
	minDiskGbOperator = '',
	handleChange
}: {
	minRamGb?: string
	minRamGbOperator?: string
	minDiskGb?: string
	minDiskGbOperator?: string
	handleChange: (name: string, value: string | number) => void
}) => {
	const [localMinRamGb, setLocalMinRamGb] = useState(minRamGb ?? '')
	const [localminDiskGb, setLocalminDiskGb] = useState(minDiskGb ?? '')

	const [debounceMinRamGb] = useDebounce(localMinRamGb, 100)
	const [debounceMinDiskGb] = useDebounce(localminDiskGb, 100)

	useEffectAfterMount(() => {
		handleChange('minRamGb', debounceMinRamGb)
	}, [debounceMinRamGb])
	useEffectAfterMount(() => {
		handleChange('minDiskGb', debounceMinDiskGb)
	}, [debounceMinDiskGb])

	useEffectAfterMount(() => {
		if (!minDiskGb) setLocalminDiskGb('')
	}, [minDiskGb])
	useEffectAfterMount(() => {
		if (!minRamGb) setLocalMinRamGb('')
	}, [minRamGb])

	const handleMinRamGb = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalMinRamGb(value)
		if (minRamGbOperator === '' && value) {
			handleChange('minRamGbOperator', Operator.EQUAL)
		} else if (!value && minRamGbOperator) {
			handleChange('minRamGbOperator', '')
		}
	}
	const handleMinDiskGb = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalminDiskGb(value)
		if (minDiskGbOperator === '' && value) {
			handleChange('minDiskGbOperator', Operator.EQUAL)
		} else if (!value && minDiskGbOperator) {
			handleChange('minDiskGbOperator', '')
		}
	}

	return {
		localMinRamGb,
		localminDiskGb,
		handleMinRamGb,
		handleMinDiskGb
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'

interface UseFilterOptionsProps<T extends Record<string, any>> {
	options: T[]
	inputValue: string
	filterProperty?: keyof T
}

export function useFilterOptions<T extends Record<string, any>>({
	options,
	inputValue,
	filterProperty = 'name'
}: UseFilterOptionsProps<T>) {
	const filteredOptions = useMemo(() => {
		if (!inputValue) {
			return options
		}
		return options.filter(option =>
			String(option[filterProperty]).toLowerCase().includes(inputValue.toLowerCase())
		)
	}, [options, inputValue, filterProperty])

	return filteredOptions
}

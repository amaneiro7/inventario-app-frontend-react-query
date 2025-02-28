import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllProcessor } from '@/core/devices/features/processor/infra/hooks/useGetAllProcessors'
import { Combobox } from '@/components/Input/Combobox'
import { type ProcessorFilters } from '@/core/devices/features/processor/application/createProcessorQueryParams'

export function ProcessorCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: ProcessorFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { processor, isLoading } = useGetAllProcessor(query)

	const options = useMemo(() => processor?.data ?? [], [processor])

	return (
		<>
			<Combobox
				id="processor"
				label="Procesadores"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}

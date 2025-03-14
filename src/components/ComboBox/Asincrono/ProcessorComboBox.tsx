import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllProcessor } from '@/core/devices/features/processor/infra/hooks/useGetAllProcessors'
import { Combobox } from '@/components/Input/Combobox'
import { type ProcessorFilters } from '@/core/devices/features/processor/application/createProcessorQueryParams'

export const ProcessorCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: ProcessorFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 })
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
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
})

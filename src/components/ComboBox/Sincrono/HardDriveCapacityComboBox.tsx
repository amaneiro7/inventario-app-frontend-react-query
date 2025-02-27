import { lazy, memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllHardDriveCapacity } from '@/core/devices/features/hardDrive/hardDriveCapacity/infra/hook/useGetAllHardDriveCapacity'
import { type HardDriveCapacityFilters } from '@/core/devices/features/hardDrive/hardDriveCapacity/application/createHardDriveCapacityQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
export const HardDriveCapacityCombobox = memo(function ({
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

	const query: HardDriveCapacityFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { HardDriveCapacities, isLoading } = useGetAllHardDriveCapacity(query)

	const options = useMemo(() => HardDriveCapacities?.data ?? [], [HardDriveCapacities])

	return (
		<>
			<Combobox
				id="HardDriveCapacity"
				label="SubCategoria"
				value={value}
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
})

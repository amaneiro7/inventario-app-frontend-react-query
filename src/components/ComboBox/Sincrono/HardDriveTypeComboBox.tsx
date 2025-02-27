import { lazy, memo, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllHardDriveType } from '@/core/devices/features/hardDrive/hardDriveType/infra/hook/useGetAllHardDriveType'
import { type HardDriveTypeFilters } from '@/core/devices/features/hardDrive/hardDriveType/application/createHardDriveTypeQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
export const HardDriveTypeCombobox = memo(function ({
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

	const query: HardDriveTypeFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {})
		}
	}, [debouncedSearch, value])

	const { HardDriveTypes, isLoading } = useGetAllHardDriveType(query)

	const options = useMemo(() => HardDriveTypes?.data ?? [], [HardDriveTypes])

	return (
		<>
			<Combobox
				id="HardDriveType"
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

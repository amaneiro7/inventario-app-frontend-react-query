import { useMemo, useState } from 'react'
import { useGetAllCargo } from '@/core/employee/cargo/infra/hook/useGetAllCargo'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { Combobox } from '@/components/Input/Combobox'

export function CargoCombobox({
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

	const { cargos, isLoading } = useGetAllCargo({})

	const options = useMemo(() => cargos?.data ?? [], [cargos])

	const filteredOptions = useFilterOptions({ inputValue, options })

	return (
		<>
			<Combobox
				id="CargoId"
				label="Cargos"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={filteredOptions}
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
			<div className="flex flex-wrap gap-2 mt-2"></div>
		</>
	)
}

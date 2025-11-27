import { memo, useMemo } from 'react'

import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllInputType } from '@/entities/model/inputType/infra/hook/useInputType'

interface InputTypeComboboxProps {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
	isLoading: boolean
	readonly?: boolean
}

/**
 * `InputTypeCombobox` is a memoized functional component that provides a searchable combobox for selecting input types.
 * It fetches input type data and displays it in a dropdown.
 */
export const InputTypeCombobox = memo(
	({
		value = '',
		name,
		error = '',
		required = false,
		isLoading = false,
		disabled = false,
		readonly = false,
		handleChange
	}: InputTypeComboboxProps) => {
		const { data: inputTypes, isLoading: loading } = useGetAllInputType({})

		const options = useMemo(() => inputTypes?.data ?? [], [inputTypes])

		return (
			<>
				<Combobox
					id="InputType"
					label="Tipo de Entrada"
					value={value}
					name={name}
					loading={loading}
					isLoading={isLoading}
					options={options}
					required={required}
					disabled={disabled}
					readOnly={readonly}
					error={!!error}
					errorMessage={error}
					searchField={false}
					onChangeValue={handleChange}
				/>
			</>
		)
	}
)

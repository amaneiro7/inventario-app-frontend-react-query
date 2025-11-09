import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllRoles } from '@/entities/role/infra/hook/useGetAllRole'

interface RoleComboboxProps {
	value?: string
	placeholder?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	label?: string
	handleChange: (name: string, value: string | number) => void
}

export function RoleCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	label = 'Roles',
	placeholder,
	handleChange
}: RoleComboboxProps) {
	const { data: roles, isLoading: loading } = useGetAllRoles({})

	const options = useMemo(() => roles?.data ?? [], [roles])

	return (
		<>
			<Combobox
				id="role"
				label={label}
				value={value}
				name={name}
				loading={loading}
				isLoading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				placeholder={placeholder}
				searchField={false}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}

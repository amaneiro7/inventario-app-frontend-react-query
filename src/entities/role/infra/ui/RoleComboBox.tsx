import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllRoles } from '@/entities/role/infra/hook/useGetAllRole'

interface RoleComboboxProps {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
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
	label = 'Roles',
	handleChange
}: RoleComboboxProps) {
	const { data: roles, isLoading } = useGetAllRoles({})

	const options = useMemo(() => roles?.data ?? [], [roles])

	return (
		<>
			<Combobox
				id="role"
				label={label}
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}

import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'
import { useGetAllRoles } from '@/core/role/infra/hook/useGetAllRole'

export function RoleCombobox({
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
	const { roles, isLoading } = useGetAllRoles({})

	const options = useMemo(() => roles ?? [], [roles])

	return (
		<>
			<Combobox
				id="role"
				label="Roles"
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

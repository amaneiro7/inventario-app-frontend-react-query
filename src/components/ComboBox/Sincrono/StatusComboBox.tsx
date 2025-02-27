import { memo, useMemo } from 'react'
import { useGetAllStatus } from '@/core/status/infra/hook/useGetAllStatus'
import { Combobox } from '@/components/Input/Combobox'

export const StatusCombobox = memo(
	({
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
	}) => {
		const { status, isLoading } = useGetAllStatus({})

		const options = useMemo(() => status?.data ?? [], [status])

		return (
			<>
				<Combobox
					id="status"
					label="Estatus"
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
				/>
			</>
		)
	}
)

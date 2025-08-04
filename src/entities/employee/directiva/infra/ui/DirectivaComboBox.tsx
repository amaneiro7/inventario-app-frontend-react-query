import { memo, useMemo } from 'react'
import { useGetAllDirectiva } from '@/entities/employee/directiva/infra/hook/useGetAllDirectiva'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const DirectivaCombobox = memo(function ({
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
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { data, isLoading } = useGetAllDirectiva({})

	const options = useMemo(() => data?.data ?? [], [data])

	return (
		<>
			<Combobox
				id="directiva"
				label="Directiva"
				value={value}
				name={name}
				loading={isLoading}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				readOnly={readonly}
				onChangeValue={handleChange}
			/>
		</>
	)
})

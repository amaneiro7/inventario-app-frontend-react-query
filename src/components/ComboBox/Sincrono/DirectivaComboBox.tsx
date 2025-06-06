import { memo, useMemo } from 'react'
import { useGetAllDirectiva } from '@/core/employee/directiva/infra/hook/useGetAllDirectiva'
import { Combobox } from '@/components/Input/Combobox'

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
	const { directivas, isLoading } = useGetAllDirectiva({})

	const options = useMemo(() => directivas?.data ?? [], [directivas])

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

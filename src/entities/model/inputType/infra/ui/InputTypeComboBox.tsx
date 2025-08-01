import { memo, useMemo } from 'react'

import { Combobox } from '@/shared/ui/Input/Combobox'
import { useGetAllInputType } from '@/entities/model/inputType/infra/hook/useInputType'

export const InputTypeCombobox = memo(function ({
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
	const { inputTypes, isLoading } = useGetAllInputType({})

	const options = useMemo(() => inputTypes?.data ?? [], [inputTypes])

	return (
		<>
			<Combobox
				id="InputType"
				label="Tipo de Entrada"
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
})

import { memo, useMemo, useState } from 'react'
import { useGetAllUser } from '@/entities/user/infra/hooks/useGetAlUser'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const UserCombobox = memo(function ({
	value = '',
	label = 'Usuarios de servicio',
	name,
	handleChange
}: {
	value?: string
	name: string
	label?: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')

	const { data, isLoading } = useGetAllUser({})

	const options = useMemo(() => data?.data ?? [], [data])

	const filteredOptions = useFilterOptions({ options, inputValue, filterProperty: 'userName' })

	return (
		<>
			<Combobox
				id="serviceUsers"
				label={label}
				value={value}
				name={name}
				loading={isLoading}
				options={filteredOptions}
				inputValue={inputValue}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				displayAccessor="userName"
			/>
		</>
	)
})

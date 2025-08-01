import { memo, useMemo } from 'react'
import { useGetAllTypeOfSite } from '@/entities/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const TypeOfSiteCombobox = memo(function ({
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
	const { typeOfSites, isLoading } = useGetAllTypeOfSite({})

	const options = useMemo(() => typeOfSites?.data ?? [], [typeOfSites])

	return (
		<>
			<Combobox
				id="typeOfSite"
				label="Tipo de Sitio"
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
})

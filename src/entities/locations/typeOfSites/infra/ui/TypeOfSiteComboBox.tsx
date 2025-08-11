import { memo, useMemo } from 'react'
import { useGetAllTypeOfSite } from '@/entities/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'
import { Combobox } from '@/shared/ui/Input/Combobox'

export const TypeOfSiteCombobox = memo(
	({
		value = '',
		name,
		error = '',
		required = false,
		disabled = false,
		readonly = false,
		isLoading = false,
		handleChange
	}: {
		value?: string
		name: string
		error?: string
		required?: boolean
		disabled?: boolean
		readonly?: boolean
		isLoading?: boolean
		handleChange: (name: string, value: string | number) => void
	}) => {
		const { data, isLoading: loading } = useGetAllTypeOfSite({})

		const options = useMemo(() => data?.data ?? [], [data])

		return (
			<>
				<Combobox
					id="typeOfSite"
					label="Tipo de Sitio"
					value={value}
					name={name}
					loading={loading}
					isLoading={isLoading}
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
)

TypeOfSiteCombobox.displayName = 'TypeOfSiteCombobox'

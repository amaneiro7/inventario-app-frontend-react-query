import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { AgencyClassificationEnum } from '../../domain/value-object/AgencyClassification'

interface AgencyClassificationComboboxProps {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}

export function AgencyClassificationCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: AgencyClassificationComboboxProps) {
	const options = useMemo(() => {
		return Object.values(AgencyClassificationEnum).map(type => {
			const id = type as string
			const name = `Tipo de Agencia: "${id}"`

			return {
				id,
				name
			}
		})
	}, [])
	return (
		<>
			<Combobox
				id="agency-classification"
				label="Clasificación de Agencia"
				value={value}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={(name, value) => {
					handleChange(name, value)
				}}
				readOnly={readonly}
			/>
		</>
	)
}

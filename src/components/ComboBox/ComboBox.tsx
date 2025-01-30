import { Autocomplete, AutocompleteProps, createFilterOptions } from '@mui/material'
import { PropsWithChildren } from 'react'
import { CloseIcon } from '@/icon/CloseIcon'

interface Props<T, Multiple extends boolean, Disable extends boolean, FreeSolo extends boolean>
	extends Omit<AutocompleteProps<T, Multiple, Disable, FreeSolo>, 'renderInput'> {
	id: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initialValue?: any | null
	name: string
	readonly?: boolean
	label: string
	loading?: boolean
	options: T[]
	isHidden?: boolean
	isDisabled?: boolean
	isRequired?: boolean
	placeholder?: string
	isError?: boolean
	errorMessage?: string
	type?: 'form' | 'search'
}

const filter = createFilterOptions()
function ComboBox<T, Multiple extends boolean, Disable extends boolean, FreeSolo extends boolean>({
	id,
	initialValue = null,

	options,
	isDisabled = true,
	freeSolo,
	multiple,
	disableClearable,
	loading,
	onChange,
	children,
	type = 'search',
	readonly = false
}: PropsWithChildren<Props<T, Multiple, Disable, FreeSolo>>) {
	return (
		<>
			<Autocomplete
				id={`combo-box-${id}`}
				value={initialValue}
				freeSolo={freeSolo ?? false}
				multiple={multiple ?? false}
				disableClearable={disableClearable ?? false}
				onChange={(event, newValue, reason, details) => {
					onChange(event, newValue, reason, details)
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params)
					const { inputValue } = params
					const isExisting = options.some(option => inputValue === option.name)
					if (inputValue !== '' && !isExisting && type !== 'search') {
						filtered.push({
							inputValue,
							name: `Añadir "${inputValue}"`
						})
					}
					return filtered
				}}
				fullWidth
				disabled={isDisabled}
				size="small"
				isOptionEqualToValue={(option, value) => option.name === value.name}
				getOptionLabel={option => {
					if (typeof option === 'string') {
						return option
					}
					if (option.inputValue) {
						return option.inputValue
					}
					return option.name
				}}
				options={options}
				loading={loading}
				readOnly={readonly}
				clearText="Limpiar"
				loadingText="Cargando..."
				openText="Abrir"
				closeText="Cerrar"
				noOptionsText="No existe"
				selectOnFocus
				clearOnEscape
				clearOnBlur
				handleHomeEndKeys
				clearIcon={<CloseIcon fontSize="small" />}
			/>
			{children}
		</>
	)
}

export default memo(ComboBox) as typeof ComboBox

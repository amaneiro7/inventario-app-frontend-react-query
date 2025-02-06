import { lazy } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Autocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete'

const Typography = lazy(async () => await import('@/components/Typography'))
const TextField = lazy(async () => await import('@mui/material/TextField'))
const CircularProgress = lazy(async () => await import('@mui/material/CircularProgress'))
const CloseIcon = lazy(
	async () => await import('@/icon/CloseIcon').then(m => ({ default: m.CloseIcon }))
)

interface ValidType {
	id: string | number
	name: string
}

interface Props<T extends ValidType>
	extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
	loading?: boolean
	label: string

	addOptions?: boolean
}
export function Combobox<T extends ValidType>({
	value,
	inputValue,
	label,
	loading,
	options = [],
	children,
	...props
}: React.PropsWithChildren<Props<T>>) {
	return (
		<>
			<Autocomplete
				{...props}
				fullWidth={true}
				getOptionLabel={option => {
					if (typeof option === 'string') {
						return option
					}
					return option.name
				}}
				options={options}
				autoComplete
				includeInputInList
				value={value}
				inputValue={inputValue}
				size="small"
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
				renderInput={({ ...params }) => (
					<TextField
						{...params}
						label={label}
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: (
									<>
										{loading && <CircularProgress color="inherit" size={20} />}
										{params.InputProps.endAdornment}
									</>
								)
							}
						}}
					/>
				)}
				renderOption={({ key, ...props }, option, { inputValue }) => {
					const matches = match(option.name, inputValue, {
						insideWords: true
					})
					const parts = parse(option.name, matches)
					return (
						<li key={key} {...props}>
							<div>
								<Typography variant="p">
									{parts.map((part, index) => (
										<Typography
											key={index}
											variant="span"
											option="medium"
											weight={part.highlight ? 'bold' : 'normal'}
										>
											{part.text}
										</Typography>
									))}
								</Typography>
							</div>
						</li>
					)
				}}
			/>

			{children}
		</>
	)
}

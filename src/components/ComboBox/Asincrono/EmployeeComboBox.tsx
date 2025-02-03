import { lazy, useMemo, useState } from 'react'
import { type EmployeeFilters } from '@/core/employee/employee/application/EmployeeGetByCriteria'
import { useGetAllEmployees } from '@/hooks/getAll/useGetAllEmployee'
import { useDebounce } from '@/hooks/utils/useDebounce'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'

const Typography = lazy(async () => await import('@/components/Typography'))
const TextField = lazy(async () => await import('@mui/material/TextField'))
const CircularProgress = lazy(async () => await import('@mui/material/CircularProgress'))
const CloseIcon = lazy(
	async () => await import('@/icon/CloseIcon').then(m => ({ default: m.CloseIcon }))
)
export function EmployeeCombobox({
	value,
	name,
	handleChange
}: {
	value: string
	name: string
	handleChange: (name: string, value: string) => void
}) {
	// Se crea un estado para el valor de la búsqueda
	const [localSearchValue, setLocalSearchValue] = useState('')
	// Se crea un estado para la consulta
	const [query, setQuery] = useState<EmployeeFilters>({
		options: {
			id: value
		}
	})
	// Se obtienen los empleados
	const { employees, isLoading } = useGetAllEmployees(query)
	// Se crea un estado para el valor de la búsqueda
	const [debouncedLocalSearch] = useDebounce(localSearchValue)

	const initialValue = useMemo(() => {
		return employees?.data.find(employee => employee.id === value) ?? null
	}, [value, employees])

	useEffectAfterMount(() => {
		setQuery({
			options: {
				userName: debouncedLocalSearch,
				name: debouncedLocalSearch,
				lastName: debouncedLocalSearch
			},
			pageSize: debouncedLocalSearch === '' ? 10 : undefined
		})
	}, [debouncedLocalSearch])

	return (
		<>
			<Autocomplete
				fullWidth={false}
				getOptionLabel={option => {
					if (typeof option === 'string') {
						return option
					}
					return option?.userName
				}}
				filterOptions={x => x}
				autoComplete
				value={initialValue}
				includeInputInList
				filterSelectedOptions
				options={employees?.data ?? []}
				inputValue={localSearchValue}
				onChange={(_, newValue) => {
					handleChange(name, newValue?.id ?? '')
				}}
				onInputChange={(_, newInputValue, reason) => {
					if (reason === 'reset') return
					setLocalSearchValue(newInputValue)
				}}
				size="small"
				clearText="Limpiar"
				loadingText="Cargando..."
				openText="Abrir"
				closeText="Cerrar"
				noOptionsText="No existe"
				loading={isLoading}
				selectOnFocus
				clearOnEscape
				clearOnBlur
				handleHomeEndKeys
				clearIcon={<CloseIcon fontSize="small" />}
				renderInput={({ ...params }) => (
					<TextField
						{...params}
						label="Usuarios"
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: (
									<>
										{isLoading && (
											<CircularProgress color="inherit" size={20} />
										)}
										{params.InputProps.endAdornment}
									</>
								)
							}
						}}
					/>
				)}
				renderOption={({ key, ...props }, option, { inputValue }) => {
					const matches = match(option.userName, inputValue, {
						insideWords: true
					})
					const parts = parse(option.userName, matches)
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
								<Typography variant="span" color={'gris'}>
									{`${option.name} ${option.lastName}`}
								</Typography>
							</div>
						</li>
					)
				}}
			/>
		</>
	)
}

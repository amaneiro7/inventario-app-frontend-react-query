import { useState, memo, useMemo, useCallback } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllLocations } from '@/core/locations/locations/infra/hook/useGetAllLocation'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Combobox } from '@/components/Input/Combobox'
import { type LocationFilters } from '@/core/locations/locations/application/CreateLocationQueryParams'

interface BaseProps {
	value?: string
	name: string
	typeOfSiteId?: string
	siteId?: string
	statusId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
}
interface SearchProps extends BaseProps {
	method: 'search'
	handleChange: (name: string, value: string | number) => void
}

interface FormProps extends BaseProps {
	method: 'form'
	handleFormChange: ({
		value,
		ipAddress,
		typeOfSiteId
	}: {
		value: string
		typeOfSiteId?: string
		ipAddress?: string | null
	}) => void
}

type Props = SearchProps | FormProps

function getTypeOfSiteFilter(
	typeOfSiteId?: string,
	statusId?: string
): string | string[] | undefined {
	if (typeOfSiteId) {
		return typeOfSiteId
	}
	switch (statusId) {
		case undefined:
			return undefined

		case StatusOptions.INUSE:
		case StatusOptions.PRESTAMO:
		case StatusOptions.CONTINGENCIA:
		case StatusOptions.GUARDIA:
		case StatusOptions.DISPONIBLE:
			return [TypeOfSiteOptions.AGENCY, TypeOfSiteOptions.ADMINISTRATIVE]
		default:
			return TypeOfSiteOptions.ALMACEN
	}
}

export const LocationCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	typeOfSiteId,
	siteId,
	statusId,
	method = 'search',
	...props
}: Props) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)
	const query: LocationFilters = useMemo(() => {
		const typeOfSiteFilter = getTypeOfSiteFilter(typeOfSiteId, statusId)
		return {
			...(value ? { id: value } : { id: undefined }),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			typeOfSiteId: typeOfSiteFilter,
			siteId
		}
	}, [debouncedSearch, value, name, typeOfSiteId, siteId, statusId])

	const { locations, isLoading } = useGetAllLocations(query)
	const options = useMemo(() => locations?.data ?? [], [locations])

	const handleChangeValue = useCallback(
		(name: string, value: string | number) => {
			if (method === 'form' && 'handleFormChange' in props) {
				const data = options.find(location => location.id === value) // Optional chaining
				props.handleFormChange({
					value: `${value}`,
					ipAddress: data?.subnet,
					typeOfSiteId: data?.typeOfSiteId
				})
			} else if (method === 'search' && 'handleChange' in props) {
				props.handleChange(name, value)
			}
		},
		[method, options, props]
	)
	return (
		<>
			<Combobox
				id="location"
				label="Ubicación"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onChangeValue={handleChangeValue}
				onInputChange={setInputValue}
				readOnly={readonly}
			/>
		</>
	)
})

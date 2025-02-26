import { lazy, useState, memo, useCallback, useMemo } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllLocations } from '@/core/locations/locations/infra/hook/useGetAllLocation'
import { type LocationFilters } from '@/core/locations/locations/application/CreateLocationQueryParams'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

interface SearchProps {
	value?: string
	name: string
	typeOfSiteId?: string
	siteId?: string
	statusId?: string
	method: 'search'
	handleChange: (name: string, value: string | number) => void
}

interface FormProps {
	value?: string
	name: string
	typeOfSiteId?: string
	siteId?: string
	statusId?: string
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

export const LocationCombobox = memo(function ({
	value = '',
	name,
	typeOfSiteId,
	siteId,
	statusId,
	method = 'search',
	...props
}: Props) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)
	const query: LocationFilters = useMemo(() => {
		let filterTypeOfSite: string | string[] | undefined = undefined
		if (typeOfSiteId) {
			filterTypeOfSite = typeOfSiteId
		} else if (!statusId) {
			filterTypeOfSite = undefined
		} else if (
			statusId === StatusOptions.INUSE ||
			statusId === StatusOptions.PRESTAMO ||
			statusId === StatusOptions.CONTINGENCIA ||
			statusId === StatusOptions.GUARDIA ||
			statusId === StatusOptions.DISPONIBLE
		) {
			filterTypeOfSite = [TypeOfSiteOptions.AGENCY, TypeOfSiteOptions.ADMINISTRATIVE]
		} else {
			filterTypeOfSite = TypeOfSiteOptions.ALMACEN
		}
		return {
			...(value ? { id: value } : { id: undefined }),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			typeOfSiteId: filterTypeOfSite,
			siteId
		}
	}, [debouncedSearch, value, name, typeOfSiteId, siteId, statusId])

	const { locations, isLoading } = useGetAllLocations(query)

	const options = useMemo(() => locations?.data ?? [], [locations])

	const handleChangeValue = useCallback((name: string, value: string | number) => {
		if (method === 'form') {
			const data = options.find(location => location.id === value) // Optional chaining
			;(props as FormProps).handleFormChange({
				// Type assertion for FormProps
				value: `${value}`,
				ipAddress: data?.subnet,
				typeOfSiteId: data?.typeOfSiteId
			})
		} else {
			;(props as SearchProps).handleChange(name, value) // Type assertion for SearchProps
		}
	}, [])

	return (
		<>
			<Combobox
				id="location"
				value={value}
				label="Ubicación"
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={options}
				onChangeValue={handleChangeValue}
				onInputChange={value => {
					setInputValue(value)
				}}
			/>
		</>
	)
})

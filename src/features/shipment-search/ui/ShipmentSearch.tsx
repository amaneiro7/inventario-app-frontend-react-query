import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllShipments } from '@/entities/shipment/infra/hooks/useGetAllShipment'
import { SearchInput } from '@/shared/ui/Input/Search'
import { type ShipmentFilters } from '@/entities/shipment/application/createShipmentQueryParams'

export function ShipmentSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: ShipmentFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { shipmentCode: debouncedSearch } : { pageSize: 10 }),
			...{ orderBy: 'createdAt' }
		}
	}, [debouncedSearch])

	const { data: devices, isLoading } = useGetAllShipments(query)

	const options = useMemo(() => devices?.data ?? [], [devices])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="shipment-form"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value.toUpperCase().trim())
			}}
			url={`/form/shipment/edit/${value}`}
			name="shipmentSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			displayAccessor="shipmentCode"
			title="Búsqueda por código de envio"
		/>
	)
}

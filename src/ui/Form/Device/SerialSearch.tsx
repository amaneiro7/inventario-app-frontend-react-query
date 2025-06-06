import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllDevicesInputSearch } from '@/core/devices/devices/infra/hook/useGetAllDevicesInputSearch'
import { SearchInput } from '@/components/Input/Search'
import { DeviceRenderOption } from '@/components/Input/Combobox/RenderOption/DeviceRenderOption'
import { type DeviceFilters } from '@/core/devices/devices/application/inputSearch/createDeviceQueryParams'

export function SerialSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: DeviceFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { serial: debouncedSearch } : { pageSize: 10 }),
			...{ orderBy: 'categoryId' }
		}
	}, [debouncedSearch])

	const { devices, isLoading } = useGetAllDevicesInputSearch(query)

	const options = useMemo(() => devices?.data ?? [], [devices])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="serial-serach-form"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value.toUpperCase().trim())
			}}
			url={`/form/device/edit/${value}`}
			name="serialSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			displayAccessor="serial"
			title="Búsqueda por serial"
			renderOption={DeviceRenderOption}
		/>
	)
}

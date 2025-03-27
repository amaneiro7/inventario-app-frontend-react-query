import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { Combobox } from '@/components/Input/Combobox'
import { DeviceFilters } from '@/core/devices/devices/application/inputSearch/createDeviceQueryParams'
import { useGetAllDevicesInputSearch } from '@/core/devices/devices/infra/hook/useGetAllDevicesInputSearch'
import { DeviceRenderOption } from '@/components/Input/Combobox/RenderOption/DeviceRenderOption'

export function DeviceCombobox({
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
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: DeviceFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { id: undefined, serial: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {}),
			orderBy: 'categoryId'
		}
	}, [debouncedSearch, value])

	const { devices, isLoading } = useGetAllDevicesInputSearch(query)

	const options = useMemo(() => devices?.data ?? [], [devices])

	return (
		<>
			<Combobox
				id="deviceId"
				label="Dispositivos"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				displayAccessor="serial"
				readOnly={readonly}
				renderOption={DeviceRenderOption}
			/>
		</>
	)
}

import { memo, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { Input } from '@/components/Input/Input'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'
import { RegionCombobox } from '@/components/ComboBox/Sincrono/RegionComboBox'
import { DepartamentoCombobox } from '@/components/ComboBox/Asincrono/DepartamentoComboBox'

export const MainComputerFilter = memo(function ({
	handleChange,
	employeeId,
	categoryId,
	mainCategoryId,
	locationId,
	regionId,
	typeOfSiteId,
	serial,
	departamentoId,
	vicepresidenciaId
}: {
	employeeId?: string
	categoryId?: string
	mainCategoryId?: string
	regionId?: string
	locationId?: string
	serial?: string
	departamentoId?: string
	vicepresidenciaId?: string
	typeOfSiteId?: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [localSerial, setLocalSerial] = useState(serial ?? '')
	const [debounceSerial] = useDebounce(localSerial)

	useEffectAfterMount(() => {
		handleChange('serial', debounceSerial)
	}, [debounceSerial])

	useEffectAfterMount(() => {
		if (!serial) {
			setLocalSerial('')
		}
	}, [serial])

	const handleSerial = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalSerial(value)
	}, [])

	return (
		<>
			<EmployeeCombobox name="employeeId" handleChange={handleChange} value={employeeId} />

			<CategoryCombobox
				name="categoryId"
				mainCategoryId={mainCategoryId}
				handleChange={handleChange}
				value={categoryId}
			/>

			<Input
				value={localSerial}
				label="Serial"
				name="serial"
				type="search"
				onChange={handleSerial}
			/>

			<LocationCombobox
				name="locationId"
				handleChange={handleChange}
				value={locationId}
				method="search"
				typeOfSiteId={typeOfSiteId}
			/>

			<RegionCombobox name="regionId" handleChange={handleChange} value={regionId} />
			<DepartamentoCombobox
				name="departamentoId"
				handleChange={handleChange}
				value={departamentoId}
				vicepresidenciaId={vicepresidenciaId}
			/>
		</>
	)
})

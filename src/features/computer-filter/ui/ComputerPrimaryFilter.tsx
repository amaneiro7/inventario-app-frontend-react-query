import { lazy, memo, useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'

const CategoryCombobox = lazy(() =>
	import('@/entities/category/infra/ui/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
	}))
)
const EmployeeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)
const RegionCombobox = lazy(() =>
	import('@/entities/locations/region/infra/ui/RegionComboBox').then(m => ({
		default: m.RegionCombobox
	}))
)
const AdministrativeRegionCombobox = lazy(() =>
	import('@/entities/locations/administrativeRegion/infra/ui/AdministrativeRegionComboBox').then(
		m => ({
			default: m.AdministrativeRegionCombobox
		})
	)
)
const DepartamentoCombobox = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)

export const ComputerPrimaryFilter = memo(
	({
		handleChange,
		employeeId,
		categoryId,
		mainCategoryId,
		locationId,
		regionId,
		administrativeRegionId,
		directivaId,
		vicepresidenciaEjecutivaId,
		typeOfSiteId,
		serial,
		departamentoId,
		vicepresidenciaId
	}: {
		employeeId?: string
		categoryId?: string
		mainCategoryId?: string
		regionId?: string
		administrativeRegionId?: string
		locationId?: string
		serial?: string
		departamentoId?: string
		directivaId?: string
		vicepresidenciaEjecutivaId?: string
		vicepresidenciaId?: string
		typeOfSiteId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
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
				<EmployeeCombobox
					name="employeeId"
					handleChange={handleChange}
					value={employeeId}
				/>

				<CategoryCombobox
					name="categoryId"
					mainCategoryId={mainCategoryId}
					handleChange={handleChange}
					value={categoryId}
				/>

				<Input
					id="serial-search"
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

				<AdministrativeRegionCombobox
					name="administrativeRegionId"
					handleChange={handleChange}
					value={administrativeRegionId}
				/>

				<RegionCombobox
					name="regionId"
					administrativeRegionId={administrativeRegionId}
					handleChange={handleChange}
					value={regionId}
				/>

				<DepartamentoCombobox
					name="departamentoId"
					handleChange={handleChange}
					value={departamentoId}
					vicepresidenciaId={vicepresidenciaId}
					directivaId={directivaId}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
				/>
			</>
		)
	}
)

ComputerPrimaryFilter.displayName = 'ComputerPrimaryFilter'

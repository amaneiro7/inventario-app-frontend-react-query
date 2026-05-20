import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { useComputerPrimaryFilter } from '../model/useComputerPrimaryFilter'

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
const UnidadCombobox = lazy(() =>
	import('@/entities/employee/unidad/infra/ui/UnidadComboBox').then(m => ({
		default: m.UnidadCombobox
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
		cityId,
		stateId,
		administrativeRegionId,
		typeOfSiteId,
		serial,
		unidadId
	}: {
		employeeId?: string
		categoryId?: string
		mainCategoryId?: string
		cityId?: string
		stateId?: string
		regionId?: string
		administrativeRegionId?: string
		locationId?: string
		serial?: string
		unidadId?: string
		typeOfSiteId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const { handleSerial, localSerial } = useComputerPrimaryFilter({
			serial,
			handleChange
		})

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
					cityId={cityId}
					stateId={stateId}
					regionId={regionId}
					administrativeRegionId={administrativeRegionId}
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

				<UnidadCombobox
					name="unidadId"
					method="search"
					handleChange={handleChange}
					value={unidadId}
				/>
			</>
		)
	}
)

ComputerPrimaryFilter.displayName = 'ComputerPrimaryFilter'

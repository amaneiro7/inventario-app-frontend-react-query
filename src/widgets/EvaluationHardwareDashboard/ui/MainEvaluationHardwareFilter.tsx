import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { useMainEvaluationHardwareFilter } from '../model/useMainEvaluationHardwareFilter'
import { EvaluationHardwareStatusCombobox } from './EvaluationStatusComboBox'

const CategoryCombobox = lazy(() =>
	import('@/entities/category/infra/ui/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
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

export const MainEvaluationHardwareFilter = memo(
	({
		handleChange,
		categoryId,
		locationId,
		regionId,
		cityId,
		stateId,
		administrativeRegionId,
		typeOfSiteId,
		isApto,
		isRamApto,
		isDiskApto,
		isProcessorApto,
		serial
	}: {
		categoryId?: string
		cityId?: string
		stateId?: string
		regionId?: string
		administrativeRegionId?: string
		locationId?: string
		serial?: string
		isApto?: 'true' | 'false'
		isNoApto?: 'true' | 'false'
		isRamApto?: 'true' | 'false'
		isDiskApto?: 'true' | 'false'
		isProcessorApto?: 'true' | 'false'
		typeOfSiteId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const { handleSerial, mainCategoryId, localSerial } = useMainEvaluationHardwareFilter({
			serial,
			handleChange
		})

		return (
			<>
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
				<EvaluationHardwareStatusCombobox
					name="isApto"
					label="Estatus General"
					handleChange={handleChange}
					value={isApto}
				/>
				<EvaluationHardwareStatusCombobox
					name="isRamApto"
					label="Estatus RAM"
					handleChange={handleChange}
					value={isRamApto}
				/>
				<EvaluationHardwareStatusCombobox
					name="isDiskApto"
					label="Estatus Disco"
					handleChange={handleChange}
					value={isDiskApto}
				/>
				<EvaluationHardwareStatusCombobox
					name="isProcessorApto"
					label="Estatus Procesador"
					handleChange={handleChange}
					value={isProcessorApto}
				/>
			</>
		)
	}
)

MainEvaluationHardwareFilter.displayName = 'MainEvaluationHardwareFilter'

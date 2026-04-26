import { Divider } from '@/shared/ui/Divider'
import { lazy, memo } from 'react'
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
const LocationStatusComboBox = lazy(() =>
	import('@/entities/locations/locationStatus/infra/ui/LocationStatusComboBox').then(m => ({
		default: m.LocationStatusCombobox
	}))
)
const AgencyClassificationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/AgencyClassificationCombobox').then(m => ({
		default: m.AgencyClassificationCombobox
	}))
)

const ISPLinkCombobox = lazy(() =>
	import('@/entities/locations/ispLinks/infra/ui/ISPLinkComboBox').then(m => ({
		default: m.ISPLinkCombobox
	}))
)

interface OtherLocationFilterProps {
	locationStatusId?: string
	administrativeRegionId?: string
	regionId?: string
	agencyClassification?: string
	ispLinkId?: string
	handleChange: (name: string, value: string | number) => void
}

export const OtherLocationFilter = memo(
	({
		locationStatusId,
		administrativeRegionId,
		regionId,
		agencyClassification,
		ispLinkId,
		handleChange
	}: OtherLocationFilterProps) => {
		return (
			<>
				{/* Grupo 1: Estado y Jerarquía Geográfica */}
				<LocationStatusComboBox
					handleChange={handleChange}
					name="locationStatusId"
					value={locationStatusId}
				/>
				<Divider />
				{/* Grupo 2: Jerarquía Geográfica */}
				<AdministrativeRegionCombobox
					handleChange={handleChange}
					name="administrativeRegionId"
					value={administrativeRegionId}
				/>
				<RegionCombobox
					handleChange={handleChange}
					name="regionId"
					value={regionId}
					administrativeRegionId={administrativeRegionId}
				/>
				{/* Grupo 3: Clasificación y Red */}
				<Divider />
				<AgencyClassificationCombobox
					name="agencyClassificationId"
					value={typeof agencyClassification === 'string' ? agencyClassification : ''}
					handleChange={handleChange}
				/>
				<ISPLinkCombobox
					name="ispLinkId"
					value={typeof ispLinkId === 'string' ? ispLinkId : ''}
					handleChange={handleChange}
				/>
			</>
		)
	}
)

OtherLocationFilter.displayName = 'OtherLocationFilter'

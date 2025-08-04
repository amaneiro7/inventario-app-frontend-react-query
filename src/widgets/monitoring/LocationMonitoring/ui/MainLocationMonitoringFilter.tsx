import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { Input } from '@/shared/ui/Input/Input'
import { DeviceMonitoringStatusCombobox } from '@/entities/devices/deviceMonitoring/infra/ui/DeviceMonitoringStatusComboBox'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'

const LocationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)

const SiteCombobox = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteCombobox').then(m => ({
		default: m.SiteCombobox
	}))
)

const StateCombobox = lazy(() =>
	import('@/entities/locations/state/infra/ui/StateComboBox').then(m => ({
		default: m.StateCombobox
	}))
)
const CityCombobox = lazy(() =>
	import('@/entities/locations/city/infra/ui/CityComboBox').then(m => ({
		default: m.CityCombobox
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

export const MainLocationMonitoringFilter = memo(
	({
		handleChange,
		cityId,
		stateId,
		subnet,
		status,
		locationId,
		typeOfSiteId,
		regionId,
		siteId,
		administrativeRegionId
	}: {
		subnet?: string | null
		locationId?: string
		typeOfSiteId?: string
		status?: string
		cityId?: string
		stateId?: string
		regionId?: string
		siteId?: string
		administrativeRegionId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const [localSubnet, setLocalSubnet] = useState(subnet ?? '')

		const [debounceSubnet] = useDebounce(localSubnet)

		useEffectAfterMount(() => {
			handleChange('subnet', debounceSubnet)
		}, [debounceSubnet])

		useEffectAfterMount(() => {
			if (!subnet) {
				setLocalSubnet('')
			}
		}, [subnet])
		const handleSubnet = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalSubnet(value)
		}, [])

		return (
			<>
				<Input
					id="subnet-search"
					value={localSubnet}
					label="Subnet"
					name="subnet"
					type="search"
					transform
					placeholder="Buscar por Subnet"
					onChange={handleSubnet}
				/>
				<Suspense fallback={<InputFallback />}>
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
						statusId={StatusOptions.INUSE}
					/>
				</Suspense>
				<DeviceMonitoringStatusCombobox
					name="status"
					handleChange={handleChange}
					value={status}
				/>
				<Suspense fallback={<InputFallback />}>
					<AdministrativeRegionCombobox
						name="administrativeRegionId"
						handleChange={handleChange}
						value={administrativeRegionId}
					/>
				</Suspense>

				<Suspense fallback={<InputFallback />}>
					<RegionCombobox
						name="regionId"
						administrativeRegionId={administrativeRegionId}
						handleChange={handleChange}
						value={regionId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<StateCombobox
						name="stateId"
						regionId={regionId}
						administrativeRegionId={administrativeRegionId}
						handleChange={handleChange}
						value={stateId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CityCombobox
						name="cityId"
						stateId={stateId}
						regionId={regionId}
						administrativeRegionId={administrativeRegionId}
						value={cityId}
						handleChange={handleChange}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<SiteCombobox
						name="siteId"
						method="search"
						cityId={cityId}
						stateId={stateId}
						regionId={regionId}
						administrativeRegionId={administrativeRegionId}
						value={siteId}
						handleChange={handleChange}
					/>
				</Suspense>
			</>
		)
	}
)

MainLocationMonitoringFilter.displayName = 'MainLocationMonitoringFilter'

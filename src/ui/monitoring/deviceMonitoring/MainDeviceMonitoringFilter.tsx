import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { InputFallback } from '@/components/Loading/InputFallback'
import { Input } from '@/components/Input/Input'
import { StatusOptions } from '@/core/status/status/domain/entity/StatusOptions'
import { DeviceMonitoringStatusCombobox } from '@/components/ComboBox/Sincrono/DeviceMonitoringStatusComboBox'

const StateCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/StateComboBox').then(m => ({ default: m.StateCombobox }))
)
const SiteCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/SiteCombobox').then(m => ({ default: m.SiteCombobox }))
)
const CityCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/CityComboBox').then(m => ({ default: m.CityCombobox }))
)

const LocationCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)
const RegionCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/RegionComboBox').then(m => ({
		default: m.RegionCombobox
	}))
)
const AdministrativeRegionCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/AdministrativeRegionComboBox').then(m => ({
		default: m.AdministrativeRegionCombobox
	}))
)

export const MainDeviceMonitoringFilter = memo(
	({
		handleChange,
		cityId,
		stateId,
		siteId,
		ipAddress,
		status,
		computerName,
		locationId,
		regionId,
		administrativeRegionId,
		typeOfSiteId
	}: {
		ipAddress?: string | null
		computerName?: string
		status?: string
		cityId?: string
		siteId?: string
		stateId?: string
		regionId?: string
		administrativeRegionId?: string
		locationId?: string
		typeOfSiteId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const [localIpAddress, setLocalIpAddress] = useState(ipAddress ?? '')
		const [localComputerName, setLocalComputerName] = useState(computerName ?? '')
		const [debounceIpAddress] = useDebounce(localIpAddress)
		const [debounceComputerName] = useDebounce(localComputerName)

		useEffectAfterMount(() => {
			handleChange('ipAddress', debounceIpAddress)
		}, [debounceIpAddress])
		useEffectAfterMount(() => {
			handleChange('computerName', debounceComputerName)
		}, [debounceComputerName])

		useEffectAfterMount(() => {
			if (!ipAddress) {
				setLocalIpAddress('')
			}
		}, [ipAddress])
		useEffectAfterMount(() => {
			if (!computerName) {
				setLocalComputerName('')
			}
		}, [computerName])

		const handleComputerName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalComputerName(value)
		}, [])
		const handleIpAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalIpAddress(value)
		}, [])

		return (
			<>
				<Input
					id="ipAddress-search"
					value={localIpAddress}
					label="Dirección IP"
					name="ipAddress"
					type="search"
					transform
					placeholder="Buscar por IP"
					onChange={handleIpAddress}
				/>
				<Input
					id="computerName-search"
					value={localComputerName}
					label="Nombre de equipo"
					name="computerName"
					type="search"
					transform
					placeholder="Buscar por nombre de equipo"
					onChange={handleComputerName}
				/>
				<DeviceMonitoringStatusCombobox
					name="status"
					type="device"
					handleChange={handleChange}
					value={status}
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

MainDeviceMonitoringFilter.displayName = 'MainDeviceMonitoringFilter'

import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { InputFallback } from '@/components/Loading/InputFallback'
import { Input } from '@/components/Input/Input'
import { DeviceMonitoringStatusCombobox } from '@/components/ComboBox/Sincrono/DeviceMonitoringStatusComboBox'

const StateCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/StateComboBox').then(m => ({ default: m.StateCombobox }))
)
const CityCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/CityComboBox').then(m => ({ default: m.CityCombobox }))
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

export const MainLocationMonitoringFilter = memo(
	({
		handleChange,
		cityId,
		stateId,
		subnet,
		status,
		name,
		regionId,
		administrativeRegionId
	}: {
		subnet?: string | null
		name?: string
		status?: string
		cityId?: string
		stateId?: string
		regionId?: string
		administrativeRegionId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const [localSubnet, setLocalSubnet] = useState(subnet ?? '')
		const [localName, setLocalName] = useState(name ?? '')
		const [debounceSubnet] = useDebounce(localSubnet)
		const [debounceName] = useDebounce(localName)

		useEffectAfterMount(() => {
			handleChange('subnet', debounceSubnet)
		}, [debounceSubnet])
		useEffectAfterMount(() => {
			handleChange('name', debounceName)
		}, [debounceName])

		useEffectAfterMount(() => {
			if (!subnet) {
				setLocalSubnet('')
			}
		}, [subnet])
		useEffectAfterMount(() => {
			if (!name) {
				setLocalName('')
			}
		}, [name])

		const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalName(value)
		}, [])
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
				<Input
					id="Name-search"
					value={localName}
					label="Nombre del sitio"
					name="Name"
					type="search"
					transform
					placeholder="Buscar por nombre del sitio"
					onChange={handleName}
				/>
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
			</>
		)
	}
)

MainLocationMonitoringFilter.displayName = 'MainLocationMonitoringFilter'

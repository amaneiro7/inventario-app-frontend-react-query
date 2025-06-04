import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { InputFallback } from '@/components/Loading/InputFallback'

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
const LocationStatusComboBox = lazy(() =>
	import('@/components/ComboBox/Sincrono/LocationStatusComboBox').then(m => ({
		default: m.LocationStatusCombobox
	}))
)
const StateCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/StateComboBox').then(m => ({ default: m.StateCombobox }))
)
const CityCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/CityComboBox').then(m => ({ default: m.CityCombobox }))
)
const TypeOfSiteCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/TypeOfSiteComboBox').then(m => ({
		default: m.TypeOfSiteCombobox
	}))
)
interface LocationMainFilterProps {
	name?: string
	locationStatusId?: string
	subnet?: string
	typeOfSiteId?: string | string[]
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	handleChange: (name: string, value: string | number) => void
}

export const LocationMainFilter = memo(
	({
		name,
		subnet,
		typeOfSiteId,
		cityId,
		locationStatusId,
		stateId,
		regionId,
		administrativeRegionId,
		handleChange
	}: LocationMainFilterProps) => {
		const [localName, setLocalName] = useState(name ?? '')
		const [localSubnet, setLocalSubnet] = useState(subnet ?? '')
		const [debouncedName] = useDebounce(localName)
		const [debouncedSubnet] = useDebounce(localSubnet)

		useEffectAfterMount(() => {
			handleChange('name', debouncedName)
		}, [debouncedName])

		useEffectAfterMount(() => {
			handleChange('subnet', debouncedSubnet)
		}, [debouncedSubnet])

		useEffectAfterMount(() => {
			if (!name) {
				setLocalName('')
			}
		}, [name])

		useEffectAfterMount(() => {
			if (!subnet) {
				setLocalSubnet('')
			}
		}, [subnet])

		const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toLowerCase()
			setLocalName(value)
		}, [])

		const handleSubnet = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toLowerCase()
			setLocalSubnet(value)
		}, [])

		return (
			<>
				<Input
					id="siteName-search"
					value={localName}
					name="name"
					label="Nombre del sitio"
					type="search"
					onChange={handleName}
				/>
				<Suspense fallback={<InputFallback />}>
					<LocationStatusComboBox
						handleChange={handleChange}
						name="locationStatusId"
						value={locationStatusId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<AdministrativeRegionCombobox
						handleChange={handleChange}
						name="administrativeRegionId"
						value={administrativeRegionId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<RegionCombobox
						handleChange={handleChange}
						name="regionId"
						value={regionId}
						administrativeRegionId={administrativeRegionId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<StateCombobox
						handleChange={handleChange}
						name="stateId"
						value={stateId}
						regionId={regionId}
						administrativeRegionId={administrativeRegionId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CityCombobox
						handleChange={handleChange}
						name="cityId"
						value={cityId}
						regionId={regionId}
						stateId={stateId}
						administrativeRegionId={administrativeRegionId}
					/>
				</Suspense>

				<Suspense fallback={<InputFallback />}>
					<TypeOfSiteCombobox
						name="typeOfSiteId"
						value={typeof typeOfSiteId === 'string' ? typeOfSiteId : ''}
						handleChange={handleChange}
					/>
				</Suspense>

				<Input
					id="site-subnet-search"
					value={localSubnet}
					name="subnet"
					label="Subnet del sitio"
					type="search"
					onChange={handleSubnet}
				/>
			</>
		)
	}
)

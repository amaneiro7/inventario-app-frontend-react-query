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
	subnet?: string
	typeOfSiteId?: string | string[]
	cityId?: string
	stateId?: string
	regionId?: string
	handleChange: (name: string, value: string | number) => void
}

export const LocationMainFilter = memo(
	({
		name,
		subnet,
		typeOfSiteId,
		cityId,
		stateId,
		regionId,
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
					value={localName}
					name="name"
					label="Nombre del sitio"
					type="search"
					onChange={handleName}
				/>
				<Suspense fallback={<InputFallback />}>
					<RegionCombobox handleChange={handleChange} name="regionId" value={regionId} />
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<StateCombobox
						handleChange={handleChange}
						name="stateId"
						value={stateId}
						regionId={regionId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CityCombobox
						handleChange={handleChange}
						name="cityId"
						value={cityId}
						regionId={regionId}
						stateId={stateId}
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

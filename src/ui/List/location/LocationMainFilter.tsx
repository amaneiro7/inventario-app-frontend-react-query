import { memo, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { RegionCombobox } from '@/components/ComboBox/Sincrono/RegionComboBox'
import { StateCombobox } from '@/components/ComboBox/Sincrono/StateComboBox'
import { CityCombobox } from '@/components/ComboBox/Asincrono/CityComboBox'
import { TypeOfSiteCombobox } from '@/components/ComboBox/Sincrono/TypeOfSiteComboBox'
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
				<RegionCombobox handleChange={handleChange} name="regionId" value={regionId} />
				<StateCombobox
					handleChange={handleChange}
					name="stateId"
					value={stateId}
					regionId={regionId}
				/>
				<CityCombobox
					handleChange={handleChange}
					name="cityId"
					value={cityId}
					regionId={regionId}
					stateId={stateId}
				/>

				<TypeOfSiteCombobox
					name="typeOfSiteId"
					value={typeof typeOfSiteId === 'string' ? typeOfSiteId : ''}
					handleChange={handleChange}
				/>

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

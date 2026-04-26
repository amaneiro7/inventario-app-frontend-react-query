import { lazy, memo } from 'react'
import { useLocationPrimaryFilter } from '../model/useLocationPrimaryFilter'
import { Input } from '@/shared/ui/Input/Input'

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
const TypeOfSiteCombobox = lazy(() =>
	import('@/entities/locations/typeOfSites/infra/ui/TypeOfSiteComboBox').then(m => ({
		default: m.TypeOfSiteCombobox
	}))
)

interface LocationPrimaryFilterProps {
	name?: string
	subnet?: string
	typeOfSiteId?: string | string[]
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	handleChange: (name: string, value: string | number) => void
}

export const LocationPrimaryFilter = memo(
	({
		name,
		subnet,
		typeOfSiteId,
		cityId,
		stateId,
		regionId,
		administrativeRegionId,
		handleChange
	}: LocationPrimaryFilterProps) => {
		const { handleName, handleSubnet, localName, localSubnet } = useLocationPrimaryFilter({
			handleChange,
			name,
			subnet
		})

		return (
			<>
				{/* Grupo 1: Búsqueda y Estado */}
				<Input
					id="siteName-search"
					value={localName}
					name="name"
					label="Nombre de la ubicación"
					type="search"
					onChange={handleName}
				/>

				<TypeOfSiteCombobox
					name="typeOfSiteId"
					value={typeof typeOfSiteId === 'string' ? typeOfSiteId : ''}
					handleChange={handleChange}
				/>

				<StateCombobox
					handleChange={handleChange}
					name="stateId"
					value={stateId}
					regionId={regionId}
					administrativeRegionId={administrativeRegionId}
				/>
				<CityCombobox
					handleChange={handleChange}
					name="cityId"
					value={cityId}
					regionId={regionId}
					stateId={stateId}
					administrativeRegionId={administrativeRegionId}
				/>

				<Input
					id="site-subnet-search"
					value={localSubnet}
					name="subnet"
					label="Subnet"
					type="search"
					onChange={handleSubnet}
				/>
			</>
		)
	}
)

LocationPrimaryFilter.displayName = 'LocationPrimaryFilter'

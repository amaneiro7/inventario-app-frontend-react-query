import { useNavigate } from 'react-router-dom'
//components
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { useLocationFilter } from '@/core/locations/locations/infra/hook/useLocationFilters'
import { LocationMainFilter } from '@/ui/List/location/LocationMainFilter'
import { LocationDataWrapper } from '@/ui/List/location/LocationDataWrapper'

export default function ListSite() {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useLocationFilter()

	return (
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<LocationMainFilter
						name={query.name}
						regionId={query.regionId}
						stateId={query.stateId}
						cityId={query.cityId}
						typeOfSiteId={query.typeOfSiteId}
						subnet={query.subnet}
						handleChange={handleChange}
					/>
				</FilterSection>
				<ButtonSection
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/location/add')
					}}
				/>
			</DetailsBoxWrapper>
			<LocationDataWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleChange={handleChange}
				handleSort={handleSort}
				query={query}
			/>
		</>
	)
}

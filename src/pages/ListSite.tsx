import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocationFilter } from '@/entities/locations/locations/infra/hook/useLocationFilters'
//components
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { ButtonSection } from '@/shared/ui/ButttonSection/ButtonSection'
import { Loading } from '@/shared/ui/Loading'
import { LocationDataWrapper } from '@/widgets/tables/LocationTable'

const LocationPrimaryFilter = lazy(() =>
	import('@/features/location-filter/ui/LocationPrimaryFilter').then(m => ({
		default: m.LocationPrimaryFilter
	}))
)

export default function ListSite() {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useLocationFilter()

	return (
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
					<LocationPrimaryFilter
						administrativeRegionId={query.administrativeRegionId}
						locationStatusId={query.locationStatusId}
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
						navigate('/form/location/add')
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
		</Suspense>
	)
}

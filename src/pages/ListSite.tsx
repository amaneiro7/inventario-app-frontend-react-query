import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocationFilter } from '@/entities/locations/locations/infra/hook/useLocationFilters'
//components
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const LocationDataWrapper = lazy(() =>
	import('@/widgets/tables/LocationTable').then(m => ({ default: m.LocationDataWrapper }))
)

const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)
const FilterSection = lazy(() =>
	import('@/shared/ui/FilterSection').then(m => ({ default: m.FilterSection }))
)
const ButtonSection = lazy(() =>
	import('@/shared/ui/ButttonSection/ButtonSection').then(m => ({ default: m.ButtonSection }))
)

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
		<>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="Error al cargar los filtros."
					/>
				)}
			>
				<DetailsBoxWrapper>
					<FilterSection>
						<Suspense fallback={<PrimaryFilterSkeleton />}>
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
						</Suspense>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
						<ButtonSection
							handleClear={cleanFilters}
							handleAdd={() => {
								navigate('/form/location/add')
							}}
						/>
					</Suspense>
				</DetailsBoxWrapper>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudo cargar la tabla de datos."
					/>
				)}
			>
				<Suspense fallback={null}>
					<LocationDataWrapper
						handlePageSize={handlePageSize}
						handlePageClick={handlePageClick}
						handleChange={handleChange}
						handleSort={handleSort}
						query={query}
					/>
				</Suspense>
			</ErrorBoundary>
		</>
	)
}

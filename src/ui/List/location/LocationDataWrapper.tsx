import { memo } from 'react'
import { useGetAllLocations } from '@/core/locations/locations/infra/hook/useGetAllLocation'
import { type LocationFilters } from '@/core/locations/locations/application/CreateLocationQueryParams'
import { SpinnerSKCircle } from '@/components/Loading/spinner-sk-circle'
import { InfoBox } from '@/components/InfoBox/InfoBox'
import { InfoBoxTitle } from '@/components/InfoBox/InfoBoxTitle'
import { InfoBoxText } from '@/components/InfoBox/InfoBoxText'
import { PaginationBar } from '../Pagination/PaginationBar'
import { LocationGetByCriteria } from '@/core/locations/locations/application/LocationGetByCriteria'
import { TabsNav } from '../Tab/TabsNav'

interface LocationDataWrapperProps {
	query: LocationFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const LocationDataWrapper = memo(
	({ query, handlePageClick, handlePageSize }: LocationDataWrapperProps) => {
		const { locations, isError, isLoading } = useGetAllLocations(query)
		return (
			<>
				{locations && !isLoading && !isError && (
					<PaginationBar
						registerOptions={LocationGetByCriteria.pegaSizeOptions}
						totalPages={locations?.info?.totalPage}
						total={locations?.info?.total}
						currentPage={locations?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
				<TabsNav
					isLoading={isLoading}
					total={locations?.info?.total}
					pageSize={query.pageSize}
					pageNumber={query.pageNumber}
					defaultPageSize={LocationGetByCriteria.defaultPageSize}
				/>
				<section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
					{isLoading && <SpinnerSKCircle />}
					{!isLoading && locations && locations.data.length === 0 && (
						<p>No hay resultados</p>
					)}
					{!isLoading &&
						locations &&
						locations.data.map(location => (
							<InfoBox key={location.id}>
								<InfoBoxTitle
									title={location?.name}
									url={`/location/edit/${location?.id}`}
								/>
								<InfoBoxText desc="Tipo" text={location?.typeOfSite?.name} />
								<InfoBoxText
									className="flex-1 select-all"
									desc="Dirección"
									text={location?.site?.address}
								/>
								<InfoBoxText
									desc="Estado"
									text={location?.site?.city?.state?.name}
								/>
								<InfoBoxText desc="Ciudad" text={location?.site?.city?.name} />
								<InfoBoxText desc="Subnet" text={location?.subnet ?? ''} />
							</InfoBox>
						))}
				</section>
			</>
		)
	}
)

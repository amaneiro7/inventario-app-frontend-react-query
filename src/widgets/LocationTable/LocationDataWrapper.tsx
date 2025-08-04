import { memo } from 'react'
import { MapPin } from 'lucide-react'
import { useGetAllLocations } from '@/entities/locations/locations/infra/hook/useGetAllLocation'
import { cn } from '@/shared/lib/utils'
import { LocationGetByCriteria } from '@/entities/locations/locations/application/LocationGetByCriteria'
import { InfoBox } from '@/shared/ui/InfoBox/InfoBox'
import { InfoBoxTitle } from '@/shared/ui/InfoBox/InfoBoxTitle'
import { InfoBoxText } from '@/shared/ui/InfoBox/InfoBoxText'
import { PaginationBar } from '@/shared/ui/Pagination/PaginationBar'
import { TabsNav } from '@/shared/ui/Tabs/TabsNav'
import { LocationInfoBoxSkeleton } from '@/shared/ui/SkeletonInfoBox'
import { LOCATION_STATUS_CONFIG } from './locationStatusConfig'
import { type LocationStatusByName } from '@/entities/locations/locationStatus/domain/entity/LocationStatusOptionsByName'
import { type LocationFilters } from '@/entities/locations/locations/application/CreateLocationQueryParams'

interface LocationDataWrapperProps {
	query: LocationFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const LocationDataWrapper = memo(
	({ query, handlePageClick, handlePageSize }: LocationDataWrapperProps) => {
		const { data: locations, isError, isLoading } = useGetAllLocations(query)
		const showSkeletons = isLoading && !locations?.data
		const displayLocations = locations?.data ?? []
		const skeletonCount = query.pageSize ?? 10 // Show skeletons equal to page size or a default

		if (isError) {
			return (
				<div
					className="text-rojo-600 p-8 text-center font-medium"
					role="alert"
					aria-live="assertive"
				>
					<p>¡Ups! No se pudo cargar la información de las ubicaciones.</p>
					<p>Por favor, verifica tu conexión o intenta de nuevo más tarde.</p>
				</div>
			)
		}

		return (
			<>
				{/* Pagination Bar - show only when data is loaded and not empty */}

				{locations && !isLoading && !isError && locations.info?.total > 0 && (
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
				{/* Tabs Navigation - assuming it's related to filtering/view options */}

				<TabsNav
					isLoading={isLoading}
					total={locations?.info?.total}
					pageSize={query.pageSize}
					pageNumber={query.pageNumber}
					defaultPageSize={LocationGetByCriteria.defaultPageSize}
				/>
				<section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
					{showSkeletons ? (
						// Render skeletons while loading
						Array.from({ length: skeletonCount }).map((_, index) => (
							<LocationInfoBoxSkeleton key={`location-skeleton-${index}`} />
						))
					) : displayLocations.length === 0 ? (
						<div className="col-span-full py-8 text-center text-gray-500" role="status">
							<MapPin
								className="mx-auto mb-4 h-12 w-12 text-gray-400"
								aria-hidden="true"
							/>
							<p className="mb-2 text-lg font-semibold">
								No se encontraron ubicaciones.
							</p>
							<p>Intenta ajustar tus filtros o agrega nuevas ubicaciones.</p>
						</div>
					) : (
						displayLocations.map(location => {
							const statusName = location.locationStatus?.name || 'Desconocido'
							const statusConfig = LOCATION_STATUS_CONFIG[
								statusName as LocationStatusByName
							] || {
								colorClass: 'bg-gray-50 border-gray-300', // Default if status is unknown
								textColorClass: 'text-gray-700',
								icon: MapPin, // Default icon
								displayName: statusName // Fallback name
							}
							const StatusIcon = statusConfig.icon // Component for the icon

							return (
								<InfoBox
									key={location.id}
									className={cn(
										statusConfig.colorClass // Apply status-specific background/border
									)}
								>
									<InfoBoxTitle
										title={location?.name}
										url={`/form/location/edit/${location?.id}`}
									/>
									<InfoBoxText desc="Tipo" text={location?.typeOfSite?.name} />
									<InfoBoxText
										desc="Estatus"
										text={
											<span
												className={cn(
													'inline-flex items-center gap-1',
													statusConfig.textColorClass
												)}
											>
												<StatusIcon
													className="h-4 w-4"
													aria-hidden="true"
												/>
												{statusConfig.displayName}
											</span>
										}
									/>
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
									<InfoBoxText desc="Subnet" text={location?.subnet ?? 'N/A'} />
								</InfoBox>
							)
						})
					)}
				</section>
			</>
		)
	}
)

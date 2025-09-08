import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShipmentFilter } from '@/entities/shipment/infra/hooks/useShipmentFilter'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'
import { type FilterAsideRef } from '@/widgets/FilterAside'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
// import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)
const FilterSection = lazy(() =>
	import('@/shared/ui/FilterSection').then(m => ({ default: m.FilterSection }))
)

const FilterAside = lazy(() =>
	import('@/widgets/FilterAside').then(m => ({ default: m.FilterAside }))
)
const ButtonSection = lazy(() =>
	import('@/shared/ui/ButttonSection/ButtonSection').then(m => ({ default: m.ButtonSection }))
)

const ShipmentPrimaryFilter = lazy(() =>
	import('@/features/shipment-filter/ui/ShipmentPrimaryFilter').then(m => ({
		default: m.ShipmentPrimaryFilter
	}))
)
const ShipmentOtherFilter = lazy(() =>
	import('@/features/shipment-filter/ui/ShipmentOtherFilter').then(m => ({
		default: m.ShipmentOtherFilter
	}))
)

const TableShipmentWrapper = lazy(() =>
	import('@/widgets/tables/ShipmentTable').then(m => ({ default: m.TableShipmentWrapper }))
)

export default function ListShipment() {
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useShipmentFilter()

	// const { download, isDownloading } = useDownloadExcelService()

	// const handleDownloadToExcel = async () => {
	//     await download({ source: 'computer', query })
	// }

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
							<ShipmentPrimaryFilter
								handleChange={handleChange}
								shipmentCode={query.shipmentCode}
								status={query.status}
								destination={query.destination}
								shipmentDate={query.shipmentDate}
								deliveryDate={query.deliveryDate}
								sentBy={query.sentBy}
							/>
						</Suspense>
						<Suspense fallback={null}>
							<FilterAside ref={filterAsideRef}>
								<ShipmentOtherFilter
									reason={query.reason}
									origin={query.origin}
									receivedBy={query.receivedBy}
									trackingNumber={query.trackingNumber}
									observation={query.observation}
									deviceId={query.deviceId}
									handleChange={handleChange}
								/>
							</FilterAside>
						</Suspense>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
						<ButtonSection
							handleClear={cleanFilters}
							filterButton
							handleAdd={() => {
								navigate('/form/shipment/add')
							}}
							handleFilter={() => filterAsideRef.current?.handleOpen()}
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
				<Suspense fallback={<TableSkeleton />}>
					<TableShipmentWrapper
						handlePageSize={handlePageSize}
						handlePageClick={handlePageClick}
						handleSort={handleSort}
						query={query}
					/>
				</Suspense>
			</ErrorBoundary>
		</>
	)
}

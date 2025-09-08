import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHistoryFilter } from '@/entities/history/infra/hook/useHistoryFilters'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
// import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
const TableHistoryWrapper = lazy(() =>
	import('@/widgets/tables/HistoryTable').then(m => ({ default: m.TableHistoryWrapper }))
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

const HistoryPrimaryFilter = lazy(() =>
	import('@/features/history-filter/ui/HistoryPrimaryFilter').then(m => ({
		default: m.HistoryPrimaryFilter
	}))
)

export default function ListHstory() {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useHistoryFilter()

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
							<HistoryPrimaryFilter
								employeeId={query.employeeId}
								deviceId={query.deviceId}
								userId={query.userId}
								action={query.action}
								startDate={query.startDate}
								endDate={query.endDate}
								handleChange={handleChange}
							/>
						</Suspense>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
						<ButtonSection
							handleClear={cleanFilters}
							handleAdd={() => {
								navigate('/form/device/add')
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
				<Suspense fallback={<TableSkeleton />}>
					<TableHistoryWrapper
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

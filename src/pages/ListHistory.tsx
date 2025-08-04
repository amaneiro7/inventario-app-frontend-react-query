import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHistoryFilter } from '@/entities/history/infra/hook/useHistoryFilters'
// import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'

import { ButtonSection } from '@/shared/ui/ButttonSection/ButtonSection'

import { Loading } from '@/shared/ui/Loading'
import { TableHistoryWrapper } from '@/widgets/HistoryTable/TableHistoryWrapper'

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
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
					<HistoryPrimaryFilter
						employeeId={query.employeeId}
						deviceId={query.deviceId}
						userId={query.userId}
						action={query.action}
						startDate={query.startDate}
						endDate={query.endDate}
						handleChange={handleChange}
					/>
				</FilterSection>
				<ButtonSection
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/form/device/add')
					}}
				/>
			</DetailsBoxWrapper>
			<TableHistoryWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleSort={handleSort}
				query={query}
			/>
		</Suspense>
	)
}

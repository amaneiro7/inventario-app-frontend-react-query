import { useNavigate } from 'react-router-dom'
// import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'

import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { TableHistoryWrapper } from '@/ui/List/history/TableHistoryWrapper'

import { useHistoryFilter } from '@/core/history/infra/hook/useHistoryFilters'
import { MainHistoryFilter } from '@/ui/List/MainHistoryFilter'

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
			<DetailsBoxWrapper>
				<FilterSection>
					<MainHistoryFilter
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
						navigate('/device/add')
					}}
				/>
			</DetailsBoxWrapper>
			<TableHistoryWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleSort={handleSort}
				query={query}
			/>
		</>
	)
}

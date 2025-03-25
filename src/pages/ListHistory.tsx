import { useNavigate } from 'react-router-dom'
// import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'

import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { TableHistoryWrapper } from '@/ui/List/history/TableHistoryWrapper'

import { useHistoryFilter } from '@/core/history/infra/hook/useHistoryFilters'

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
					{/* <MainComputerFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						mainCategoryId={mainCategoryId}
						typeOfSiteId={query.typeOfSiteId}
						departamentoId={query.departamentoId}
						handleChange={handleChange}
					/> */}
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

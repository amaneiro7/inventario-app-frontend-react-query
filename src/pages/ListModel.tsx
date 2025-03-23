import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
import { useModelsFilter } from '@/core/model/models/infra/hook/useModelsFilters'
import { TableModelWrapper } from '@/ui/List/models/TableModelWrapper'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { MainModelFilter } from '@/ui/List/MainModelFilter'

export default function ListModel() {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useModelsFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'model', query })
	}

	return (
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<MainModelFilter
						handleChange={handleChange}
						categoryId={query.categoryId}
						mainCategoryId={query.mainCategoryId}
						brandId={query.brandId}
						id={query.id}
					/>
				</FilterSection>
				<ButtonSection
					handleExportToExcel={handleDownloadToExcel}
					loading={isDownloading}
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/model/add')
					}}
				/>
			</DetailsBoxWrapper>
			<TableModelWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleSort={handleSort}
				query={query}
			/>
		</>
	)
}

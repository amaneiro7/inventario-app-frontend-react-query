import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { useModelsFilter } from '@/entities/model/models/infra/hook/useModelsFilters'
import { TableModelWrapper } from '@/widgets/ModelTable/TableModelWrapper'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { ButtonSection } from '@/shared/ui/ButttonSection/ButtonSection'
import { Loading } from '@/shared/ui/Loading'
const MainModelFilter = lazy(() =>
	import('@/features/model-filter/ui/MainModelFilter').then(m => ({ default: m.MainModelFilter }))
)

export default function ListModel() {
	const navigate = useNavigate()
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useModelsFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'model', query })
	}

	return (
		<Suspense fallback={<Loading />}>
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
						navigate('/form/model/add')
					}}
				/>
			</DetailsBoxWrapper>
			<TableModelWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleSort={handleSort}
				query={query}
			/>
		</Suspense>
	)
}

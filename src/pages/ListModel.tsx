import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { useModelsFilter } from '@/entities/model/models/infra/hook/useModelsFilters'
//components
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'

const TableModelWrapper = lazy(() =>
	import('@/widgets/tables/ModelTable').then(m => ({ default: m.TableModelWrapper }))
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

const ModelPrimaryFilter = lazy(() =>
	import('@/features/model-filter/ui/ModelPrimaryFilter').then(m => ({
		default: m.ModelPrimaryFilter
	}))
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
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<Suspense fallback={<PrimaryFilterSkeleton />}>
						<ModelPrimaryFilter
							handleChange={handleChange}
							categoryId={query.categoryId}
							mainCategoryId={query.mainCategoryId}
							brandId={query.brandId}
							id={query.id}
						/>
					</Suspense>
				</FilterSection>
				<Suspense fallback={<ButtonSectionSkeleton />}>
					<ButtonSection
						handleExportToExcel={handleDownloadToExcel}
						loading={isDownloading}
						handleClear={cleanFilters}
						handleAdd={() => {
							navigate('/form/model/add')
						}}
					/>
				</Suspense>
			</DetailsBoxWrapper>
			<Suspense fallback={<TableSkeleton />}>
				<TableModelWrapper
					handlePageSize={handlePageSize}
					handlePageClick={handlePageClick}
					handleSort={handleSort}
					query={query}
				/>
			</Suspense>
		</>
	)
}

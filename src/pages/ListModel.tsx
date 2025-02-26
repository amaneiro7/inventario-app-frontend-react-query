import { lazy, Suspense, useCallback, useMemo } from 'react'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { useModelsFilter } from '@/hooks/filters/useModelsFilters'
import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { useGetAllModel } from '@/core/model/models/infra/hook/useGetAllModel'
import { Loading } from '@/components/Loading'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'

const ListWrapper = lazy(
	async () => await import('@/ui/List/ListWrapper').then(m => ({ default: m.ListWrapper }))
)
const TableModelWrapper = lazy(async () =>
	import('@/ui/List/models/TableModelWrapper').then(m => ({ default: m.TableModelWrapper }))
)
const TableModels = lazy(async () =>
	import('@/ui/List/models/TableModels').then(m => ({ default: m.TableModels }))
)

const LoadingTable = lazy(async () =>
	import('@/components/Table/LoadingTable').then(m => ({
		default: m.LoadingTable
	}))
)

const MainModelFilter = lazy(async () =>
	import('@/ui/List/MainModelFilter').then(m => ({ default: m.MainModelFilter }))
)

export default function ListMonitor() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, ...query } = useModelsFilter()

	const handleChange = useCallback(
		(name: string, value: string | number) => {
			const key = name as keyof ModelFilters
			setFilters({ [key]: value })
			setPageNumber(1)
		},
		[setFilters]
	)

	const handlePageSize = useCallback(
		(pageSize: number) => {
			setPageSize(pageSize)
			setPageNumber(1)
		},
		[setPageSize, setPageNumber]
	)

	const handlePageSelection = useCallback(
		({ selected }: { selected: number }) => {
			setPageNumber(selected + 1)
		},
		[setPageNumber]
	)

	const { download, isDownloading } = useDownloadExcelService({
		query,
		source: 'model'
	})

	const { models, isLoading } = useGetAllModel({
		...query
	})

	const tableContent = useMemo(() => {
		return isLoading || models?.data === undefined ? (
			<LoadingTable registerPerPage={query.pageSize} colspan={5} />
		) : (
			<Suspense fallback={<LoadingTable registerPerPage={query.pageSize} colspan={5} />}>
				<TableModels models={models.data} />
			</Suspense>
		)
	}, [isLoading, models?.data, query.pageSize])

	return (
		<Suspense fallback={<Loading />}>
			<ListWrapper
				title="Lista de modelos"
				handleChange={handleChange}
				handleClear={cleanFilters}
				handleExportToExcel={download}
				isDownloading={isDownloading}
				url="/model/add"
				mainFilter={
					<Suspense>
						<MainModelFilter
							handleChange={handleChange}
							categoryId={query.categoryId}
							mainCategoryId={query.mainCategoryId}
							brandId={query.brandId}
							id={query.id}
						/>
					</Suspense>
				}
				// otherFilter={}
				total={models?.info.total}
				currentPage={models?.info.page}
				totalPages={models?.info.totalPage}
				loading={isLoading}
				table={<TableModelWrapper>{tableContent}</TableModelWrapper>}
				registerOptions={ModelGetByCriteria.pegaSizeOptions}
				pageSize={query.pageSize}
				handlePageClick={handlePageSelection}
				handlePageSize={handlePageSize}
			/>
		</Suspense>
	)
}

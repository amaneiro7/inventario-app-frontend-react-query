import { lazy, Suspense, useCallback } from 'react'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { useModelsFilter } from '@/hooks/filters/useModelsFilters'
import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { useGetAllModel } from '@/hooks/getAll/useGetAllModel'
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

export default function ListMonitor() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, ...query } = useModelsFilter()

	const handleChange = (name: string, value: string | number) => {
		const key = name as keyof ModelFilters
		setFilters({ [key]: value })
		setPageNumber(1)
	}

	const handlePageSize = useCallback((pageSize: number) => {
		setPageSize(pageSize)
		setPageNumber(1)
	}, [])

	const handlePageClick = useCallback(({ selected }: { selected: number }) => {
		setPageNumber(selected + 1)
	}, [])

	const { download, isDownloading } = useDownloadExcelService({
		query: query,
		source: 'model'
	})

	const { models, isLoading } = useGetAllModel({
		...query
	})

	return (
		<>
			<ListWrapper
				title="Lista de modelos"
				handleChange={handleChange}
				handleClear={cleanFilters}
				handleExportToExcel={download}
				isDownloading={isDownloading}
				url="/model/add"
				// mainFilter={}
				// otherFilter={}
				total={models?.info.total}
				loading={isLoading}
				table={
					<TableModelWrapper>
						{isLoading ? (
							<LoadingTable registerPerPage={query.pageSize} colspan={7} />
						) : (
							<Suspense>
								<TableModels models={models?.data} />
							</Suspense>
						)}
					</TableModelWrapper>
				}
				currentPage={models?.info.page}
				totalPages={models?.info.totalPage}
				registerOptions={ModelGetByCriteria.pegaSizeOptions}
				pageSize={query.pageSize}
				handlePageClick={handlePageClick}
				handlePageSize={handlePageSize}
			/>
		</>
	)
}

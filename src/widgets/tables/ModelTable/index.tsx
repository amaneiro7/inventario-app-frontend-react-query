import { lazy, memo, Suspense } from 'react'
import { useGetAllModel } from '@/entities/model/models/infra/hook/useGetAllModel'
import { useTableModelWrapper } from './useTableModelWrapper'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { ModelGetByCriteria } from '@/entities/model/models/application/ModelGetByCriteria'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'

const Table = lazy(() => import('@/shared/ui/Table/Table').then(m => ({ default: m.Table })))
const TableBody = lazy(() =>
	import('@/shared/ui/Table/TableBody').then(m => ({ default: m.TableBody }))
)
const TableHead = lazy(() =>
	import('@/shared/ui/Table/TableHead').then(m => ({ default: m.TableHead }))
)
const TableHeader = lazy(() =>
	import('@/shared/ui/Table/TableHeader').then(m => ({ default: m.TableHeader }))
)
const TablePageWrapper = lazy(() =>
	import('@/shared/ui/Table/TablePageWrapper').then(m => ({ default: m.TablePageWrapper }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

const TabsNav = lazy(() => import('@/shared/ui/Tabs/TabsNav').then(m => ({ default: m.TabsNav })))
const PaginationBar = lazy(() =>
	import('@/shared/ui/Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)

const TableModels = lazy(() =>
	import('@/entities/model/models/infra/ui/TableModels').then(m => ({
		default: m.TableModels
	}))
)
interface TableModelWrapperProps {
	query: ModelFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

export const TableModelWrapper = memo(
	({ query, handlePageSize, handlePageClick, handleSort }: TableModelWrapperProps) => {
		const REFETCH_INTERVAL_IN_MS = 60000 // 1 min
		const {
			data: models,
			isError,
			isLoading
		} = useGetAllModel({
			query,
			refetchInterval: REFETCH_INTERVAL_IN_MS
		})
		const { colSpan, headers, visibleColumns } = useTableModelWrapper()
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={models?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={ModelGetByCriteria.defaultPageSize}
					/>
					<Table>
						<TableHeader>
							<TableRow>
								{headers
									.filter(header => header.visible)
									.map((header, index) => (
										<TableHead
											aria-colindex={index}
											key={header.key}
											isTab={header.isTab}
											handleSort={
												header.hasOrder
													? eventManager(handleSort)
													: undefined
											}
											name={header.label}
											orderBy={header.hasOrder ? query.orderBy : undefined}
											orderType={
												header.hasOrder ? query.orderType : undefined
											}
											orderByField={header.hasOrder ? header.key : undefined}
											size={header.size}
										/>
									))}
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading ||
									(models === undefined && (
										<LoadingTable
											registerPerPage={query?.pageSize}
											colspan={colSpan}
										/>
									))}
								{models !== undefined && (
									<Suspense
										fallback={
											<LoadingTable
												registerPerPage={query?.pageSize}
												colspan={colSpan}
											/>
										}
									>
										<TableModels
											colSpan={colSpan}
											isError={isError}
											models={models.data}
											visibleColumns={visibleColumns}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{models && !isLoading && !isError && (
					<PaginationBar
						registerOptions={ModelGetByCriteria.pageSizeOptions}
						totalPages={models?.info?.totalPage}
						total={models?.info?.total}
						currentPage={models?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

TableModelWrapper.displayName = 'TableModelWrapper'

import { lazy, memo, Suspense, useMemo } from 'react'
import { useGetAllModel } from '@/entities/model/models/infra/hook/useGetAllModel'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { ModelGetByCriteria } from '@/entities/model/models/application/ModelGetByCriteria'
import { ModelTableLoading } from './ModelTableLoading'
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

const REFETCH_INTERVAL_IN_MS = 60000 // 1 min
export const TableModelWrapper = memo(
	({ query, handlePageSize, handlePageClick, handleSort }: TableModelWrapperProps) => {
		const {
			data: models,
			isError,
			isLoading
		} = useGetAllModel({
			query,
			refetchInterval: REFETCH_INTERVAL_IN_MS
		})
		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? ModelGetByCriteria.defaultPageSize
			}).map((_, index) => <ModelTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, ModelGetByCriteria.defaultPageSize])
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
								<TableHead
									aria-colindex={1}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="mainCategoryId"
									size="small"
								>
									Categoria
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="categoryId"
									size="small"
								>
									SubCategoria
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="brandId"
									size="small"
								>
									Marca
								</TableHead>
								<TableHead
									aria-colindex={4}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="name"
									size="large"
								>
									Modelo
								</TableHead>
								<TableHead
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="generic"
									size="small"
									className="hidden md:table-cell"
								>
									Genérico
								</TableHead>
								<TableHead aria-colindex={6} isTab size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{models !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<TableModels isError={isError} models={models.data} />
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

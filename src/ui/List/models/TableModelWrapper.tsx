import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'
import { useGetAllModel } from '@/core/model/models/infra/hook/useGetAllModel'
import { lazy, Suspense } from 'react'
import { TabsNav } from '../Tab/TabsNav'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { PaginationBar } from '../Pagination/PaginationBar'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'

interface Props {
	query: ModelFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => void
}

const TableModels = lazy(() => import('./TableModels').then(m => ({ default: m.TableModels })))

export function TableModelWrapper({ query, handlePageSize, handlePageClick, handleSort }: Props) {
	const { models, isError, isLoading } = useGetAllModel(query)
	const colSpan = 6
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
								handleSort={handleSort}
								aria-colindex={1}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="categoryId"
								size="small"
								name="Category"
							/>
							<TableHead
								handleSort={handleSort}
								aria-colindex={2}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="mainCategoyId"
								size="small"
								name="SubCategoria"
							/>
							<TableHead
								handleSort={handleSort}
								aria-colindex={3}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="brandId"
								size="small"
								name="Marca"
							/>
							<TableHead
								handleSort={handleSort}
								aria-colindex={4}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="name"
								size="large"
								name="Modelo"
							/>
							<TableHead
								handleSort={handleSort}
								aria-colindex={5}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="generic"
								size="small"
								name="Genérico"
							/>
							<TableHead aria-colindex={6} size="xxSmall" name="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={colSpan} />
							)}
							{models !== undefined && (
								<Suspense>
									<TableModels
										colSpan={colSpan}
										isError={isError}
										models={models.data}
									/>
								</Suspense>
							)}
						</>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{models && !isLoading && !isError && (
				<PaginationBar
					registerOptions={ModelGetByCriteria.pegaSizeOptions}
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

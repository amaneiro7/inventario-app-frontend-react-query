import { lazy, Suspense } from 'react'
import { eventManager } from '@/utils/eventManager'
import { useGetAllModel } from '@/core/model/models/infra/hook/useGetAllModel'
import { useTableModelWrapper } from './useTableModelWrapper'

import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'
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
	handleSort: (field: string) => Promise<void>
}

const TableModels = lazy(() => import('./TableModels').then(m => ({ default: m.TableModels })))

export function TableModelWrapper({ query, handlePageSize, handlePageClick, handleSort }: Props) {
	const { models, isError, isLoading } = useGetAllModel(query)
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
											header.hasOrder ? eventManager(handleSort) : undefined
										}
										name={header.label}
										orderBy={header.hasOrder ? query.orderBy : undefined}
										orderType={header.hasOrder ? query.orderType : undefined}
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

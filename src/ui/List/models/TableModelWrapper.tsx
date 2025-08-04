import { lazy, Suspense } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useGetAllModel } from '@/entities/model/models/infra/hook/useGetAllModel'
import { useTableModelWrapper } from './useTableModelWrapper'

import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TabsNav } from '../Tab/TabsNav'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { ModelGetByCriteria } from '@/entities/model/models/application/ModelGetByCriteria'
import { PaginationBar } from '../../../shared/ui/Pagination/PaginationBar'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'

interface Props {
	query: ModelFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

const TableModels = lazy(() => import('./TableModels').then(m => ({ default: m.TableModels })))

export function TableModelWrapper({ query, handlePageSize, handlePageClick, handleSort }: Props) {
	const REFETCH_INTERVAL_IN_MS = 60000 // 1 min
	const { models, isError, isLoading } = useGetAllModel({
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

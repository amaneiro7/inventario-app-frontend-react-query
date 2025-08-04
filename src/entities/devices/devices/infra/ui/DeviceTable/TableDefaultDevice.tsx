import { Suspense } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { OrderTypes } from '@/entities/shared/domain/criteria/OrderType'
import { TabsNav } from '@/shared/ui/Tabs/TabsNav'
import { TypeOfSiteTabNav } from '@/entities/locations/typeOfSites/infra/ui/TypeOfSiteTabNav'
import { PaginationBar } from '@/shared/ui/Pagination/PaginationBar'
import { type Headers, TableHeader } from '@/shared/ui/Table/TableHeader'

interface TableDefaultDeviceProps<T> {
	children?: React.ReactElement<T>
	total?: number
	pageSize?: number
	pageNumber?: number
	defaultPageSize?: number
	typeOfSiteId?: string
	isLoading?: boolean
	isError?: boolean
	pegaSizeOptions: number[]
	totalPage?: number
	page?: number
	colSpan: number
	orderBy?: string
	orderType?: OrderTypes
	dataIsLoaded: boolean
	headers: Headers[]
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handlePageSize: (pageSize: number) => void
}

export function TableDefaultDevice<T>({
	children,
	defaultPageSize,
	pageNumber,
	pageSize,
	total,
	typeOfSiteId,
	isLoading,
	isError,
	dataIsLoaded,
	pegaSizeOptions,
	totalPage,
	page,
	colSpan,
	orderBy,
	orderType,
	headers,
	handleChange,
	handleSort,
	handlePageClick,
	handlePageSize
}: TableDefaultDeviceProps<T>) {
	return (
		<>
			<TablePageWrapper>
				<TabsNav
					isLoading={isLoading}
					total={total}
					pageSize={pageSize}
					pageNumber={pageNumber}
					defaultPageSize={defaultPageSize}
				>
					<TypeOfSiteTabNav handleChange={handleChange} value={typeOfSiteId} />
				</TabsNav>
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
										orderBy={header.hasOrder ? orderBy : undefined}
										orderType={header.hasOrder ? orderType : undefined}
										orderByField={header.hasOrder ? header.key : undefined}
										size={header.size}
									/>
								))}
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && (
								<LoadingTable registerPerPage={pageSize} colspan={colSpan} />
							)}
							<Suspense
								fallback={
									<LoadingTable registerPerPage={pageSize} colspan={colSpan} />
								}
							>
								{children}
							</Suspense>
						</>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{dataIsLoaded && !isLoading && !isError && (
				<PaginationBar
					registerOptions={pegaSizeOptions}
					totalPages={totalPage}
					total={total}
					currentPage={page}
					pageSize={pageSize}
					handlePageClick={handlePageClick}
					handlePageSize={handlePageSize}
				/>
			)}
		</>
	)
}

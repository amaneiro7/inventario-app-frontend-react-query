import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { TableRow } from '@/components/Table/TableRow'
import { TabsNav } from './Tab/TabsNav'
import { PaginationBar } from './Pagination/PaginationBar'
import { TypeOfSiteTabNav } from './Tab/TypeOfSiteTabNav'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { eventManager } from '@/utils/eventManager'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Suspense } from 'react'

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
							<TableHead
								isTab
								aria-colindex={1}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="employeeId"
								size="small"
								name="Usuario"
							/>
							<TableHead
								isTab
								aria-colindex={2}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="locationId"
								size="large"
								name="Ubicación"
							/>
							<TableHead
								isTab
								aria-colindex={3}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="serial"
								size="small"
								name="Serial"
							/>
							<TableHead
								isTab
								aria-colindex={4}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="categoryId"
								size="small"
								name="Categoria"
							/>
							<TableHead
								isTab
								aria-colindex={5}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="brandId"
								size="small"
								name="Marca"
							/>
							<TableHead
								isTab
								aria-colindex={6}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="modelId"
								size="xLarge"
								name="Modelo"
							/>
							<TableHead
								isTab
								aria-colindex={7}
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="observation"
								size="small"
								name="Observaciones"
							/>
							<TableHead aria-colindex={8} size="xxSmall" name="" />
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

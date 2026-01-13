import { lazy, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { OrderTypes } from '@/entities/shared/domain/criteria/OrderType'
import { GenericTableDeviceSkeleton } from '@/widgets/tables/GenericTableDeviceSkeleton'

const Table = lazy(() => import('@/shared/ui/Table/Table').then(m => ({ default: m.Table })))
const TableBody = lazy(() =>
	import('@/shared/ui/Table/TableBody').then(m => ({ default: m.TableBody }))
)
const TableHead = lazy(() =>
	import('@/shared/ui/Table/TableHead').then(m => ({ default: m.TableHead }))
)
const TablePageWrapper = lazy(() =>
	import('@/shared/ui/Table/TablePageWrapper').then(m => ({ default: m.TablePageWrapper }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TabsNav = lazy(() => import('@/shared/ui/Tabs/TabsNav').then(m => ({ default: m.TabsNav })))
const TypeOfSiteTabNav = lazy(() =>
	import('@/features/type-of-site-tab-nav/ui/TypeOfSiteTabNav').then(m => ({
		default: m.TypeOfSiteTabNav
	}))
)
const PaginationBar = lazy(() =>
	import('@/shared/ui/Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)
const TableHeader = lazy(() =>
	import('@/shared/ui/Table/TableHeader').then(m => ({ default: m.TableHeader }))
)

interface TableLayoutProps<T> {
	children?: React.ReactElement<T>
	total?: number
	pageSize?: number
	pageNumber?: number
	defaultPageSize?: number
	typeOfSiteId?: string
	isLoading?: boolean
	isError?: boolean
	pageSizeOptions: number[]
	totalPage?: number
	page?: number
	orderBy?: string
	orderType?: OrderTypes
	dataIsLoaded: boolean
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handlePageSize: (pageSize: number) => void
}

export function TableLayout<T>({
	children,
	defaultPageSize = 25,
	pageNumber,
	pageSize,
	total,
	typeOfSiteId,
	isLoading,
	isError,
	dataIsLoaded,
	pageSizeOptions,
	totalPage,
	page,
	orderBy,
	orderType,
	handleChange,
	handleSort,
	handlePageClick,
	handlePageSize
}: TableLayoutProps<T>) {
	const SkeletonFallback = useMemo(() => {
		return Array.from({ length: pageSize ?? defaultPageSize }).map((_, index) => (
			<GenericTableDeviceSkeleton key={`loader-${index}`} />
		))
	}, [pageSize, defaultPageSize])
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
								aria-colindex={1}
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="employeeId"
								size="small"
							>
								Usuario
							</TableHead>
							<TableHead
								aria-colindex={2}
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="locationId"
								size="auto"
								className="hidden md:table-cell"
							>
								Ubicación
							</TableHead>
							<TableHead
								aria-colindex={3}
								className="1md:table-cell hidden"
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="serial"
								size="small"
							>
								Serial
							</TableHead>
							<TableHead
								aria-colindex={4}
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="categoryId"
								size="small"
								className="2lg:table-cell hidden"
							>
								Categoria
							</TableHead>
							<TableHead
								aria-colindex={5}
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="brandId"
								size="small"
								className="hidden lg:table-cell"
							>
								Marca
							</TableHead>
							<TableHead
								aria-colindex={6}
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="modelId"
								size="large"
							>
								Modelo
							</TableHead>
							<TableHead
								aria-colindex={7}
								isTab
								handleSort={eventManager(handleSort)}
								orderBy={orderBy}
								orderType={orderType}
								orderByField="observation"
								size="auto"
								className="hidden xl:table-cell"
							>
								Observaciones
							</TableHead>
							<TableHead aria-colindex={8} isTab size="xSmall">
								<span className="sr-only">Acciones</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && SkeletonFallback}
							<Suspense fallback={SkeletonFallback}>{children}</Suspense>
						</>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{dataIsLoaded && !isLoading && !isError && (
				<PaginationBar
					registerOptions={pageSizeOptions}
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

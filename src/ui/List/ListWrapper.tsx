import { lazy, memo, Suspense, useRef } from 'react'
import { FilterAsideRef } from './FilterAside/FilterAside'
import { useNavigate } from 'react-router-dom'
import { SpinnerSKCircle } from '@/components/Loading/spinner-sk-circle'

const PaginationBar = lazy(async () =>
	import('./Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)
const TypeOfSiteTabNav = lazy(
	async () => await import('./Tab/TypeOfSiteTabNav').then(m => ({ default: m.TypeOfSiteTabNav }))
)
const PageTitle = lazy(
	async () => await import('../PageTitle').then(m => ({ default: m.PageTitle }))
)
const DetailsWrapper = lazy(
	async () =>
		await import('@/components/DetailsWrapper/DetailsWrapper').then(m => ({
			default: m.DetailsWrapper
		}))
)
const DetailsBoxWrapper = lazy(
	async () =>
		await import('@/components/DetailsWrapper/DetailsBoxWrapper').then(m => ({
			default: m.DetailsBoxWrapper
		}))
)
const FilterSection = lazy(
	async () => await import('./FilterSection').then(m => ({ default: m.FilterSection }))
)
const FilterAside = lazy(
	async () => await import('./FilterAside/FilterAside').then(m => ({ default: m.FilterAside }))
)
const ButtonSection = lazy(
	async () =>
		await import('./ButttonSection/ButtonSection').then(m => ({ default: m.ButtonSection }))
)

export const ListWrapper = memo(function ({
	title,
	loading,
	url,
	total,
	mainFilter,
	otherFilter,
	typeOfSiteId,
	table,
	totalPages,
	currentPage,
	pageSize,
	registerOptions,
	isDownloading,
	handleExportToExcel,
	handleChange,
	handleClear,
	handlePageClick,
	handlePageSize
}: {
	isDownloading: boolean
	title: string
	url: string
	loading: boolean
	total?: number
	typeOfSiteId?: string
	totalPages?: number
	currentPage?: number
	pageSize?: number
	mainFilter?: React.ReactElement
	otherFilter?: React.ReactElement
	registerOptions: number[]
	table?: React.ReactElement
	handleExportToExcel: () => void
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleClear?: () => void
	handleChange: (name: string, value: string) => void
}) {
	const navigate = useNavigate()
	const filterAsideRef = useRef<FilterAsideRef>(null)

	return (
		<>
			<PageTitle title={title} optionalText={!loading ? `${total} resultados` : ''} />
			<DetailsWrapper borderColor="blue">
				<DetailsBoxWrapper>
					<FilterSection>
						<Suspense>
							{mainFilter}
							{otherFilter ? (
								<FilterAside ref={filterAsideRef}>{otherFilter}</FilterAside>
							) : null}
						</Suspense>
					</FilterSection>
					<Suspense>
						<ButtonSection
							loading={isDownloading}
							handleExportToExcel={handleExportToExcel}
							handleAdd={() => {
								navigate(url)
							}}
							handleFilter={filterAsideRef.current?.handleOpen}
							handleClear={handleClear}
						/>
					</Suspense>
				</DetailsBoxWrapper>
				<div className="w-full flex flex-col justify-start">
					{typeOfSiteId !== undefined ? (
						<Suspense>
							<TypeOfSiteTabNav handleChange={handleChange} value={typeOfSiteId} />
						</Suspense>
					) : null}
					{loading || table === undefined ? <SpinnerSKCircle /> : null}
					{table}
				</div>
				{!loading ? (
					<PaginationBar
						registerOptions={registerOptions}
						totalPages={totalPages}
						total={total}
						currentPage={currentPage}
						pageSize={pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				) : null}
			</DetailsWrapper>
		</>
	)
})

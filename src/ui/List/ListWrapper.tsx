import { memo, useRef } from 'react'
import { FilterAside, FilterAsideRef } from './FilterAside/FilterAside'
import { useNavigate } from 'react-router-dom'
import { SpinnerSKCircle } from '@/components/Loading/spinner-sk-circle'
import { PageTitle } from '../PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from './FilterSection'
import { ButtonSection } from './ButttonSection/ButtonSection'
import { TypeOfSiteTabNav } from './Tab/TypeOfSiteTabNav'
import { PaginationBar } from './Pagination/PaginationBar'

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
						<>
							{mainFilter}
							{otherFilter && (
								<FilterAside ref={filterAsideRef}>{otherFilter}</FilterAside>
							)}
						</>
					</FilterSection>

					<ButtonSection
						loading={isDownloading}
						handleExportToExcel={handleExportToExcel}
						handleAdd={() => {
							navigate(url)
						}}
						handleFilter={filterAsideRef.current?.handleOpen}
						handleClear={handleClear}
					/>
				</DetailsBoxWrapper>
				<div className="w-full flex flex-col justify-start">
					{typeOfSiteId !== undefined ? (
						<TypeOfSiteTabNav handleChange={handleChange} value={typeOfSiteId} />
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

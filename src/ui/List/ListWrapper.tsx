import { lazy, useCallback, useRef } from 'react'
import { FilterAsideRef } from './FilterAside/FilterAside'
import { useNavigate } from 'react-router-dom'
import { SpinnerSKCircle } from '@/components/Loading/spinner-sk-circle'

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

export function ListWrapper({
	title,
	loading,
	url,
	total,
	mainFilter,
	otherFilter,
	handleChange,
	typeOfSiteId,
	handleClear,
	table
}: {
	title: string
	url: string
	loading: boolean
	total: number
	typeOfSiteId: string
	mainFilter?: React.ReactElement
	otherFilter?: React.ReactElement
	handleClear?: () => void
	handleChange: (name: string, value: string) => void
	table?: React.ReactElement
}) {
	const navigate = useNavigate()
	const filterAsideRef = useRef<FilterAsideRef>(null)

	const handleFilter = useCallback(() => filterAsideRef.current?.handleOpen(), [])
	return (
		<>
			<PageTitle title={title} optionalText={!loading ? `${total} resultados` : undefined} />
			<DetailsWrapper borderColor="blue">
				<DetailsBoxWrapper>
					<FilterSection>
						{mainFilter}
						{otherFilter ? (
							<FilterAside ref={filterAsideRef}>{otherFilter}</FilterAside>
						) : null}
					</FilterSection>
					<ButtonSection
						handleAdd={() => {
							navigate(url)
						}}
						handleFilter={handleFilter}
						handleClear={handleClear}
					/>
				</DetailsBoxWrapper>
				<div className="w-full flex flex-col justify-start">
					{typeOfSiteId !== undefined ? (
						<TypeOfSiteTabNav handleChange={handleChange} value={typeOfSiteId} />
					) : null}
					{loading && <SpinnerSKCircle />}
					{table}
				</div>
			</DetailsWrapper>
		</>
	)
}

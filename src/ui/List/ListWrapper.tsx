import { lazy } from 'react'

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

export function ListWrapper({
	title,
	loading,
	total,
	mainFilter,
	table
}: {
	title: string
	loading: boolean
	total: number
	mainFilter?: React.ReactElement
	table?: React.ReactElement
}) {
	return (
		<>
			<PageTitle title={title} optionalText={!loading ? `${total} resultados` : undefined} />
			<DetailsWrapper borderColor="blue">
				<DetailsBoxWrapper>
					<FilterSection>{mainFilter}</FilterSection>
				</DetailsBoxWrapper>
				<div className="w-full flex flex-col justify-start">{table}</div>
			</DetailsWrapper>
		</>
	)
}

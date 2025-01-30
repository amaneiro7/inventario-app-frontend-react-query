import { PageTitle } from '../PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from './FilterSection'

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
	table: React.ReactElement
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

import { memo, Suspense } from 'react'
import { DetailsBoxWrapper } from '../DetailsWrapper/DetailsBoxWrapper'
import Typography from '../Typography'
import { StepsToFollow } from '../StepsToFollow/StepsToFollow'
import { RegisterNewDeviceToFollow } from '../StepsToFollow/RegisterNewDeviceToFollow'
import { FormComponent } from './FormComponent'
import { Tag } from '../Tag'
import { AddIcon } from '@/icon/AddIcon'
import { SearchSection } from './SearchSection'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'

interface Props {
	id: string
	description: string
	url: string
	isAddForm: boolean
	standBy?: boolean
	border?: boolean
	lastUpdated?: string
	updatedBy?: HistoryDto[] | null
	searchInput?: React.ReactElement
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose: () => void
	reset?: () => void
}

export const FormContainer = memo(
	({
		id,
		url,
		description,
		searchInput,
		isAddForm,
		children,
		border,
		updatedBy,
		lastUpdated,
		standBy = false,
		handleSubmit,
		handleClose,
		reset
	}: React.PropsWithChildren<Props>) => {
		return (
			<>
				<DetailsBoxWrapper>
					<Typography
						variant="p"
						className="inline-flex items-center justify-start gap-1 text-center"
					>
						<Typography color="gris" variant="span">
							{description}
						</Typography>
						{!isAddForm ? (
							<Tag
								color="white"
								backgroundColor="naranja"
								icon={<AddIcon width={16} />}
								iconText="Agregar nuevo"
							></Tag>
						) : null}
					</Typography>
					<Suspense>
						<SearchSection searchInput={searchInput} url={url} isEdit={!isAddForm} />
					</Suspense>
				</DetailsBoxWrapper>
				{!standBy && (
					<DetailsBoxWrapper position="center">
						<FormComponent
							id={id}
							handleSubmit={handleSubmit}
							handleClose={handleClose}
							reset={reset}
							border={border}
							updatedBy={updatedBy}
							lastUpdated={lastUpdated}
						>
							{children}
						</FormComponent>
					</DetailsBoxWrapper>
				)}

				{!standBy && (
					<StepsToFollow>
						<RegisterNewDeviceToFollow isEdit={!isAddForm} />
					</StepsToFollow>
				)}
			</>
		)
	}
)

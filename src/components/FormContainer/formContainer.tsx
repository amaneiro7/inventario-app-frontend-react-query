import { memo, Suspense } from 'react'
import { DetailsWrapper } from '../DetailsWrapper/DetailsWrapper'
import { DetailsBoxWrapper } from '../DetailsWrapper/DetailsBoxWrapper'
import Typography from '../Typography'
import { StepsToFollow } from '../StepsToFollow/StepsToFollow'
import { RegisterNewDeviceToFollow } from '../StepsToFollow/RegisterNewDeviceToFollow'
import { FormComponent } from './FormComponent'
import { Tag } from '../Tag'
import { AddIcon } from '@/icon/AddIcon'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'
import { SearchSection } from './SearchSection'

interface Props {
	id: string
	title: string
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
		title,
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
				<DetailsWrapper borderColor="blue">
					<DetailsBoxWrapper>
						<Typography variant="h3" color="azul">
							{`Gestión de ${title} - ${
								isAddForm ? 'Registre un nuevo' : 'modifique un'
							} ${title}`}
						</Typography>
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
							<SearchSection
								searchInput={searchInput}
								url={url}
								isEdit={!isAddForm}
							/>
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
				</DetailsWrapper>
				{!standBy && (
					<StepsToFollow>
						<RegisterNewDeviceToFollow isEdit={!isAddForm} />
					</StepsToFollow>
				)}
			</>
		)
	}
)

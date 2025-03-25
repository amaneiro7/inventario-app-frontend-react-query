import { memo, Suspense } from 'react'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'
import { DetailsWrapper } from '../DetailsWrapper/DetailsWrapper'
import { DetailsBoxWrapper } from '../DetailsWrapper/DetailsBoxWrapper'
import Typography from '../Typography'
import { StepsToFollow } from '../StepsToFollow/StepsToFollow'
import { RegisterNewDeviceToFollow } from '../StepsToFollow/RegisterNewDeviceToFollow'
import { FormComponent } from './FormComponent'
import { SearchSection } from './SearchSection'
import { Tag } from '../Tag'
import { AddIcon } from '@/icon/AddIcon'
interface Props {
	id: string
	title: string
	description: string
	url: string
	isAddForm: boolean
	border?: boolean
	action?: React.FormHTMLAttributes<HTMLFormElement>['action']
	lastUpdated?: string
	updatedBy?: HistoryDto[] | null
	searchInput?: React.ReactElement
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose: () => void
	reset?: () => void
}

export const FormContainer = memo(function ({
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
	handleSubmit,
	handleClose,
	reset
}: React.PropsWithChildren<Props>) {
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
						className="inline-flex gap-1 text-center justify-start items-center "
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
			</DetailsWrapper>
			<StepsToFollow>
				<RegisterNewDeviceToFollow isEdit={!isAddForm} />
			</StepsToFollow>
		</>
	)
})

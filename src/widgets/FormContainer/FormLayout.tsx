import { memo } from 'react'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import Typography from '@/shared/ui/Typography'
import { StepsToFollow } from '../StepsToFollow/StepsToFollow'
import { RegisterNewDeviceToFollow } from '../StepsToFollow/RegisterNewDeviceToFollow'
import { FormComponent } from './FormComponent'
import { Tag } from '@/shared/ui/Tag'
import { AddIcon } from '@/shared/ui/icon/AddIcon'
import { SearchSection } from './SearchSection'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
import { FormPermissionBanner } from './FormPermissionBanner'
import { FormErrorBanner } from './FormErrorBanner'

interface FormLayoutProps {
	id: string
	description: string
	url: string
	isAddForm: boolean
	standBy?: boolean
	border?: boolean
	lastUpdated?: string
	updatedBy?: HistoryDto[] | null
	searchInput?: React.ReactElement
	isLoading?: boolean
	isError?: boolean
	isNotFound?: boolean
	isSubmitting?: boolean
	canEdit?: boolean
	isDirty?: boolean
	title?: string
	subtitle?: string
	readOnlyMessage?: string
	submitError?: string | null
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose?: () => void
	reset?: () => void
	onRetry?: () => void
}

export const FormLayout = memo(
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
		isLoading,
		isError,
		isNotFound,
		isSubmitting = false,
		isDirty = false,
		title,
		subtitle,
		canEdit,
		submitError,
		readOnlyMessage,
		handleSubmit,
		handleClose,
		onRetry,
		reset
	}: React.PropsWithChildren<FormLayoutProps>) => {
		const isReadOnly = !isAddForm && !canEdit
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
							/>
						) : null}
					</Typography>

					<SearchSection searchInput={searchInput} url={url} isEdit={!isAddForm} />
				</DetailsBoxWrapper>
				<FormErrorBanner message={submitError} />
				{isReadOnly && <FormPermissionBanner readOnlyMessage={readOnlyMessage} />}
				{!standBy && (
					<DetailsBoxWrapper position="center">
						<FormComponent
							id={id}
							border={border}
							isLoading={isLoading}
							isError={isError}
							isSubmitting={isSubmitting}
							isDirty={isDirty}
							title={title}
							subtitle={subtitle}
							isNotFound={isNotFound}
							updatedBy={updatedBy}
							lastUpdated={lastUpdated}
							isReadOnly={isReadOnly}
							handleSubmit={handleSubmit}
							handleClose={handleClose}
							reset={reset}
							onRetry={onRetry}
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

import { lazy, memo, Suspense } from 'react'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'
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

const Tag = lazy(async () => import('@/components/Tag').then(m => ({ default: m.Tag })))
const DetailsWrapper = lazy(async () =>
	import('@/components/DetailsWrapper/DetailsWrapper').then(m => ({
		default: m.DetailsWrapper
	}))
)
const DetailsBoxWrapper = lazy(async () =>
	import('@/components/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)
const Typography = lazy(async () => import('@/components/Typography'))
const SearchSection = lazy(() =>
	import('./SearchSection').then(m => ({ default: m.SearchSection }))
)
const AddIcon = lazy(() => import('@/icon/AddIcon').then(m => ({ default: m.AddIcon })))
const FormComponent = lazy(() =>
	import('./FormComponent').then(m => ({ default: m.FormComponent }))
)
const StepsToFollow = lazy(() =>
	import('@/components/StepsToFollow/StepsToFollow').then(m => ({
		default: m.StepsToFollow
	}))
)
const RegisterNewDeviceToFollow = lazy(() =>
	import('@/components/StepsToFollow/RegisterNewDeviceToFollow').then(m => ({
		default: m.RegisterNewDeviceToFollow
	}))
)

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

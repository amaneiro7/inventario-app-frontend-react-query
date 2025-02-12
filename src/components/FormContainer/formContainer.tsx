import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'

interface Props {
	title: string
	description: string
	url: string
	isAddForm: boolean
	isDisabled: boolean
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose: () => void
	reset?: () => void
	lastUpdated?: string
	updatedBy?: HistoryDto[]
	searchInput?: React.ReactElement
}

const Tag = lazy(async () => import('@/components/Tag').then(m => ({ default: m.Tag })))
const PageTitle = lazy(async () =>
	import('../../ui/PageTitle').then(m => ({ default: m.PageTitle }))
)
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

export default function FormContainer({
	url,
	title,
	description,
	searchInput,
	isAddForm,
	children,
	isDisabled,
	handleSubmit,
	handleClose,
	reset,
	updatedBy,
	lastUpdated
}: React.PropsWithChildren<Props>) {
	const location = useLocation()
	return (
		<>
			<PageTitle title={`Gestión de ${title}`} />
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
						<SearchSection
							key={location.key}
							searchInput={searchInput}
							url={url}
							isEdit={!isAddForm}
						/>
					</Suspense>
				</DetailsBoxWrapper>
				<DetailsBoxWrapper position="center">
					<FormComponent
						key={location.key}
						id={location.key}
						handleSubmit={handleSubmit}
						handleClose={handleClose}
						reset={reset}
						isDisabled={isDisabled}
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
}

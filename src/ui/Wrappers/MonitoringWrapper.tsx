import { memo, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { PageTitle } from '../PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { Seo } from '@/components/Seo'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'

const MonitoringWrapper = memo(() => {
	const location = useLocation()
	const isListIndex = location.pathname === '/list'
	const outletTitle = useOutletContext<string>()

	const routeMetadata = useMemo(
		(): Record<string, { title: string; description: string }> => ({
			'/monitoring': {
				title: '',
				description: ''
			},
			'/monitoring/device': {
				title: '',
				description: ''
			}
		}),
		[]
	)

	const currentMetadata = routeMetadata[location.pathname] || {
		title: '',
		description: ''
	}
	const title = outletTitle || currentMetadata.title
	const description = outletTitle
		? `Página con la ${outletTitle}. Explora, filtra y gestiona la información de ${outletTitle.toLowerCase()}.`
		: currentMetadata.description

	const breadcrumbSegments = useMemo(() => {
		if (isListIndex) {
			return ['Monitoreo']
		}
		const segments: (string | { label: string; href?: string })[] = [
			{ label: 'Monitoreo', href: '/monitoring' },
			currentMetadata.title.split(' | ')[0] || currentMetadata.title // Toma la parte antes del '|' si existe, o el título completo
		]
		return segments
	}, [isListIndex, currentMetadata.title])

	return (
		<>
			<Seo title={title} description={description} />
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={breadcrumbSegments} />
			<PageTitle title={title} />
			<DetailsWrapper>
				<Suspense>
					<Outlet context={title} />
				</Suspense>
			</DetailsWrapper>
		</>
	)
})

export default MonitoringWrapper

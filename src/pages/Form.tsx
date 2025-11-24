import { useOutletContext } from 'react-router-dom'
import { LinkCard } from '@/shared/ui/LinkCard'
import Typography from '@/shared/ui/Typography'
import { type IconName } from '@/shared/ui/icon/Icon'
import { type RouterMetadata } from '@/app/layouts/types/metaData'

const Form = () => {
	const outletContext = useOutletContext<RouterMetadata[]>()

	const forms: {
		title: string
		description: string
		iconName: IconName
		to: string
	}[] = outletContext.map(metadata => ({
		title: metadata.title.split(' | ')[0],
		description: metadata.description.split('.')[0] + '.',
		iconName: metadata?.iconName ?? 'box',
		to: metadata.pathSegment ?? ''
	}))
	if (forms.length === 0) {
		return (
			<section className="rounded-lg border border-yellow-200 bg-yellow-50 p-8 text-center">
				<Typography variant="p" color="amarillo">
					No hay formularios disponibles para tu perfil de usuario.
				</Typography>
			</section>
		)
	}

	return (
		<>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{forms.map(form => (
					<LinkCard key={form.title} {...form} />
				))}
			</div>
		</>
	)
}
export default Form

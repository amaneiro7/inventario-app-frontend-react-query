import { useOutletContext } from 'react-router-dom'
import { LinkCard } from '@/shared/ui/LinkCard'
import Typography from '@/shared/ui/Typography'
import { type IconName } from '@/shared/ui/icon/Icon'
import { type RouterMetadata } from '@/app/layouts/types/metaData'

const List = () => {
	const outletContext = useOutletContext<RouterMetadata[]>()
	// Mapear los metadatos de las rutas permitidas al formato de LinkCard
	const lists: {
		title: string
		description: string
		iconName: IconName
		to: string
	}[] = outletContext.map(metadata => ({
		title: metadata.title.split(' | ')[0], // Título limpio
		description: metadata.description.split('.')[0] + '.', // Descripción limpia
		iconName: metadata?.iconName ?? 'box',
		to: metadata.pathSegment ?? '' // La ruta relativa
	}))

	if (lists.length === 0) {
		return (
			<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-8 text-center">
				<Typography variant="p" color="amarillo">
					No hay dashboards disponibles para tu perfil de usuario.
				</Typography>
			</div>
		)
	}

	return (
		<>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{lists.map(list => (
					<LinkCard key={list.title} {...list} />
				))}
			</div>
		</>
	)
}
export default List

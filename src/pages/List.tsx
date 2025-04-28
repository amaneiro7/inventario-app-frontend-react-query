import { LinkCard } from '@/components/LinkCard'
import {
	Building,
	Computer,
	FolderClock,
	Keyboard,
	Monitor,
	Printer,
	RectangleEllipsis,
	ScrollText,
	User2
} from 'lucide-react'

const List = () => {
	const list = [
		{
			title: 'Computadoras',
			description: '',
			icon: Computer,
			to: 'computer'
		},
		{
			title: 'Monitores',
			description: '',
			icon: Monitor,
			to: 'monitor'
		},
		{
			title: 'Impresoras Financieras',
			description: '',
			icon: RectangleEllipsis,
			to: 'finantialprinter'
		},
		{
			title: 'Impresoras',
			description: '',
			icon: Printer,
			to: 'printer'
		},
		{
			title: 'Partes y piezas',
			description: '',
			icon: Keyboard,
			to: 'parts'
		},
		{
			title: 'Usuarios',
			description: '',
			icon: User2,
			to: 'usuarios'
		},
		{
			title: 'Modelos',
			description: '',
			icon: ScrollText,
			to: 'model'
		},
		{
			title: 'Ubicaciones',
			description: '',
			icon: Building,
			to: 'location'
		},
		{
			title: 'Historial de modificaciones',
			description: '',
			icon: FolderClock,
			to: 'history'
		}
	]

	return (
		<>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{list.map(dashboard => (
					<LinkCard key={dashboard.title} {...dashboard} />
				))}
			</div>
		</>
	)
}
export default List

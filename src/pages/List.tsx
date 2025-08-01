import { LinkCard } from '@/shared/ui/LinkCard'
import {
	Building,
	Computer,
	Cpu,
	FolderClock,
	Monitor,
	Printer,
	RectangleEllipsis,
	ScrollText,
	Users
} from 'lucide-react'

const List = () => {
	const list = [
		{
			title: 'Computadoras',
			description: 'Explora y gestiona el inventario de equipos de computación.',
			icon: Computer,
			to: 'computer'
		},
		{
			title: 'Monitores',
			description: 'Visualiza y administra la lista de monitores disponibles.',
			icon: Monitor,
			to: 'monitor'
		},
		{
			title: 'Impresoras Financieras',
			description:
				'Gestiona el registro de impresoras utilizadas para operaciones financieras.',
			icon: RectangleEllipsis,
			to: 'finantialprinter'
		},
		{
			title: 'Impresoras',
			description: 'Administra el inventario general de impresoras.',
			icon: Printer,
			to: 'printer'
		},
		{
			title: 'Partes y piezas',
			description: 'Consulta y gestiona el stock de componentes y repuestos.',
			icon: Cpu, // Icono modificado
			to: 'parts'
		},
		{
			title: 'Usuarios',
			description: 'Administra la información y los roles de los empleados del sistema.',
			icon: Users, // Icono modificado
			to: 'usuarios'
		},
		{
			title: 'Modelos',
			description: 'Consulta y gestiona los diferentes modelos de equipos y dispositivos.',
			icon: ScrollText,
			to: 'model'
		},
		{
			title: 'Ubicaciones',
			description:
				'Administra los diferentes sitios y edificios donde se encuentran los activos.',
			icon: Building,
			to: 'location'
		},
		{
			title: 'Historial de modificaciones',
			description: 'Revisa el registro de todos los cambios realizados en el sistema.',
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

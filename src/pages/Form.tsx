import { LinkCard } from '@/shared/ui/LinkCard'
import {
	Computer,
	Factory,
	Cpu,
	UserPlus,
	Scale,
	Briefcase,
	Layers,
	Badge,
	MapPin,
	Package,
	Truck
} from 'lucide-react'

const Form = () => {
	const form = [
		{
			title: 'Dispositivo',
			description: 'Registrar un nuevo dispositivo en el sistema.',
			icon: Computer,
			to: 'device/add'
		},
		{
			title: 'Relación de envio',
			description: 'Crear una nueva relación de envío para el traslado de dispositivos.',
			icon: Truck,
			to: 'shipment/add'
		},
		{
			title: 'Modelo',
			description: 'Crear un nuevo modelo de equipo o dispositivo.',
			icon: Package,
			to: 'model/add'
		},
		{
			title: 'Marca',
			description: 'Añadir una nueva marca de fabricante.',
			icon: Factory,
			to: 'brand/add'
		},
		{
			title: 'Procesador',
			description: 'Registrar un nuevo tipo de procesador.',
			icon: Cpu,
			to: 'processors/add'
		},
		{
			title: 'Empleado',
			description: 'Dar de alta un nuevo empleado en el sistema.',
			icon: UserPlus,
			to: 'employee/add'
		},
		{
			title: 'Directiva',
			description: 'Crear una nueva directiva o vía de comunicación.',
			icon: Scale,
			to: 'directiva/add'
		},
		{
			title: 'Vicepresidencia Ejecutiva',
			description: 'Registrar una nueva vicepresidencia ejecutiva.',
			icon: Briefcase,
			to: 'vicepresidenciaejecutiva/add'
		},
		{
			title: 'Vicepresidencia',
			description: 'Crear una nueva vicepresidencia.',
			icon: Briefcase,
			to: 'vicepresidencia/add'
		},
		{
			title: 'Departamento',
			description: 'Añadir un nuevo departamento a la estructura organizacional.',
			icon: Layers,
			to: 'departamento/add'
		},
		{
			title: 'Cargo',
			description: 'Registrar un nuevo cargo o puesto de trabajo.',
			icon: Badge,
			to: 'cargo/add'
		},
		{
			title: 'Ubicación',
			description: 'Crear una nueva ubicación física.',
			icon: MapPin,
			to: 'location/add'
		},
		{
			title: 'Sitio',
			description: 'Registrar un nuevo sitio específico dentro de una ubicación.',
			icon: MapPin,
			to: 'site/add'
		},
		{
			title: 'Ciudad',
			description: 'Añadir una nueva ciudad al sistema.',
			icon: MapPin,
			to: 'city/add'
		},
		{
			title: 'Región',
			description: 'Crear una nueva región geográfica.',
			icon: MapPin,
			to: 'region'
		}
	]

	return (
		<>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{form.map(dashboard => (
					<LinkCard key={dashboard.title} {...dashboard} />
				))}
			</div>
		</>
	)
}
export default Form

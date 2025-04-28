import { LinkCard } from '@/components/LinkCard'
import {
	Computer,
	Factory, // Sugerencia para Marca
	Cpu, // Sugerencia para Procesador
	UserPlus, // Sugerencia para Empleado (creación)
	Scale, // Sugerencia para Directiva (camino, dirección)
	Briefcase, // Sugerencia para Vicepresidencia Ejecutiva/Vicepresidencia
	Layers, // Sugerencia para Departamento
	Badge, // Sugerencia para Cargo
	MapPin, // Sugerencia para Ubicación/Sitio/Ciudad/Región
	Package // Sugerencia genérica para Modelo
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
			title: 'Modelo',
			description: 'Crear un nuevo modelo de equipo o dispositivo.',
			icon: Package, // Icono sugerido
			to: 'model/add'
		},
		{
			title: 'Marca',
			description: 'Añadir una nueva marca de fabricante.',
			icon: Factory, // Icono sugerido
			to: 'brand/add'
		},
		{
			title: 'Procesador',
			description: 'Registrar un nuevo tipo de procesador.',
			icon: Cpu, // Icono sugerido
			to: 'processor/add'
		},
		{
			title: 'Empleado',
			description: 'Dar de alta un nuevo empleado en el sistema.',
			icon: UserPlus, // Icono sugerido
			to: 'employee/add'
		},
		{
			title: 'Directiva',
			description: 'Crear una nueva directiva o vía de comunicación.',
			icon: Scale, // Icono sugerido
			to: 'directvia/add'
		},
		{
			title: 'Vicepresidencia Ejecutiva',
			description: 'Registrar una nueva vicepresidencia ejecutiva.',
			icon: Briefcase, // Icono sugerido
			to: 'vicepresidenciaejecutiva/add'
		},
		{
			title: 'Vicepresidencia',
			description: 'Crear una nueva vicepresidencia.',
			icon: Briefcase, // Icono sugerido
			to: 'vicepresidencia/add'
		},
		{
			title: 'Departamento',
			description: 'Añadir un nuevo departamento a la estructura organizacional.',
			icon: Layers, // Icono sugerido
			to: 'departamento/add'
		},
		{
			title: 'Cargo',
			description: 'Registrar un nuevo cargo o puesto de trabajo.',
			icon: Badge, // Icono sugerido
			to: 'cargo/add'
		},
		{
			title: 'Ubicación',
			description: 'Crear una nueva ubicación física.',
			icon: MapPin, // Icono sugerido
			to: 'location/add'
		},
		{
			title: 'Sitio',
			description: 'Registrar un nuevo sitio específico dentro de una ubicación.',
			icon: MapPin, // Icono sugerido
			to: 'site/add'
		},
		{
			title: 'Ciudad',
			description: 'Añadir una nueva ciudad al sistema.',
			icon: MapPin, // Icono sugerido
			to: 'city/add'
		},
		{
			title: 'Región',
			description: 'Crear una nueva región geográfica.',
			icon: MapPin, // Icono sugerido
			to: 'region/add'
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

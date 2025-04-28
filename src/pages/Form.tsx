import { LinkCard } from '@/components/LinkCard'
import { Computer } from 'lucide-react'

const Form = () => {
	const form = [
		{
			title: 'Dispositivo',
			description: '',
			icon: Computer,
			to: 'device/add'
		},
		{
			title: 'Modelo',
			description: '',
			icon: Computer,
			to: 'model/add'
		},
		{
			title: 'Marca',
			description: '',
			icon: Computer,
			to: 'brand/add'
		},
		{
			title: 'Procesador',
			description: '',
			icon: Computer,
			to: 'processor/add'
		},
		{
			title: 'Empleado',
			description: '',
			icon: Computer,
			to: 'employee/add'
		},
		{
			title: 'Directiva',
			description: '',
			icon: Computer,
			to: 'directvia/add'
		},
		{
			title: 'Vicepresidencia Ejecutiva',
			description: '',
			icon: Computer,
			to: 'vicepresidenciaejecutiva/add'
		},
		{
			title: 'Vicepresidencia',
			description: '',
			icon: Computer,
			to: 'vicepresidencia/add'
		},
		{
			title: 'Departamento',
			description: '',
			icon: Computer,
			to: 'departamento/add'
		},
		{
			title: 'Cargo',
			description: '',
			icon: Computer,
			to: 'cargo/add'
		},
		{
			title: 'Ubicación',
			description: '',
			icon: Computer,
			to: 'location/add'
		},
		{
			title: 'Sitio',
			description: '',
			icon: Computer,
			to: 'site/add'
		},
		{
			title: 'Ciudad',
			description: '',
			icon: Computer,
			to: 'city/add'
		},
		{
			title: 'Región',
			description: '',
			icon: Computer,
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

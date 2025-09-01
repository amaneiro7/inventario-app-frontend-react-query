import { CheckCircle2, Clock, Truck, XCircle } from 'lucide-react'
import { StatusEnum } from '@/entities/shipment/domain/value-object/ShipmentStatus'

export const GetStatusIndicator = (status?: StatusEnum) => {
	let icon: React.ReactNode
	let className: string
	let text: string

	switch (status) {
		case StatusEnum.PENDING:
			icon = <Clock size={16} />
			className = 'bg-amarillo-100 text-amarillo-800'
			text = 'Pendiente'
			break
		case StatusEnum.IN_TRANSIT:
			icon = <Truck size={16} />
			className = 'bg-azul-100 text-azul-800'
			text = 'En Tránsito'
			break
		case StatusEnum.DELIVERED:
			icon = <CheckCircle2 size={16} />
			className = 'bg-verde-100 text-verde-800'
			text = 'Entregado'
			break
		case StatusEnum.CANCELLED:
			icon = <XCircle size={16} />
			className = 'bg-rojo-100 text-rojo-800'
			text = 'Cancelado'
			break
		default:
			return <>{'N/A'}</>
	}

	return (
		<div
			className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${className}`}
		>
			{icon}
			{text}
		</div>
	)
}

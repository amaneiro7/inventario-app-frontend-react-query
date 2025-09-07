import { getDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import Typography from '@/shared/ui/Typography'
import { Badge, type BadgeProps } from '@/shared/ui/Badge'

interface ModalTitleProps {
	serial: string | null
	activo: string | null
	// Se recomienda pasar el ID del estatus para una lógica más robusta
	statusId: string
	statusName: string
	computerName?: string | null | undefined
	category: string
}

// Mapa para asociar ID de estatus con un color de Badge
// Usamos los nombres de variantes que tu componente Badge pueda tener.
const statusColorMap: Record<string, BadgeProps['variant']> = {
	[StatusOptions.INUSE]: 'verde',
	[StatusOptions.DISPONIBLE]: 'azul',
	[StatusOptions.INALMACEN]: 'default', // Gris/Default
	[StatusOptions.PORDESINCORPORAR]: 'amarillo',
	[StatusOptions.DESINCORPORADO]: 'rojo',
	[StatusOptions.PRESTAMO]: 'purple',
	[StatusOptions.CONTINGENCIA]: 'naranja',
	[StatusOptions.GUARDIA]: 'sky',
	[StatusOptions.JORNADA]: 'pink'
}

export const ModalTitle = ({
	activo,
	category,
	computerName,
	serial,
	statusId,
	statusName
}: ModalTitleProps) => {
	// Se busca el color correspondiente. Si no se encuentra, se usa 'default'.
	const badgeVariant = statusColorMap[statusId] ?? 'default'

	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				{getDeviceIcon(category)}
				{computerName ?? 'Detalles del Equipo'}
			</Typography>
			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
				{/* El Badge ahora recibe la variante de color dinámicamente */}
				<Badge variant={badgeVariant}>{statusName}</Badge>
				<Typography variant="span" option="small" className="font-mono">
					Serial: {serial ?? 'Sin Serial'}
				</Typography>
				<Typography variant="span" option="small" className="font-mono">
					Activo: {activo ?? 'N/A'}
				</Typography>
			</div>
		</div>
	)
}

import { GetDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import Typography from '@/shared/ui/Typography'
import { Tag } from '@/shared/ui/Tag'
import { type BackgroundType } from '@/shared/ui/Typography/types'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceSerial } from '../../../domain/value-object/DeviceSerial'
import { type DeviceActivo } from '../../../domain/value-object/DeviceActivo'

interface ModalTitleProps {
	serial: Primitives<DeviceSerial>
	activo: Primitives<DeviceActivo>
	statusId: string
	statusName: string
	computerName?: string | null | undefined
	category: string
}

// Mapa para asociar ID de estatus con un color de Badge
// Usamos los nombres de variantes que tu componente Badge pueda tener.
const statusColorMap: Record<string, BackgroundType> = {
	[StatusOptions.INUSE]: 'verde',
	[StatusOptions.DISPONIBLE]: 'amarillo',
	[StatusOptions.INALMACEN]: 'gris',
	[StatusOptions.PORDESINCORPORAR]: 'rojo',
	[StatusOptions.DESINCORPORADO]: 'rojo',
	[StatusOptions.PRESTAMO]: 'naranja',
	[StatusOptions.CONTINGENCIA]: 'naranja',
	[StatusOptions.GUARDIA]: 'naranja',
	[StatusOptions.JORNADA]: 'naranja'
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
	const backGroundColor = statusColorMap[statusId] ?? 'default'

	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				{<GetDeviceIcon categoryName={category} />}
				{computerName ?? 'Detalles del Equipo'}
			</Typography>
			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
				{/* El Badge ahora recibe la variante de color dinámicamente */}
				<Tag
					option="tiny"
					backgroundColor={backGroundColor}
					iconText={statusName}
					color="white"
				/>
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

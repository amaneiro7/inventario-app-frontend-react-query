import Typography from '@/shared/ui/Typography'
import { getShipmentStatusColor } from './GetShipmentStatusColor'
import { GetShipmentStatusIcon } from './GetShipmentStatusIcon'
import { getShipmentStatusText } from './GetShipmentStatusText'
import { Icon } from '@/shared/ui/icon/Icon'
import { Tag } from '@/shared/ui/Tag'
import { type ShipmentStatus, StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ShipmendtCode } from '../../domain/value-object/ShipmentCode'

interface ShipmentModalTitleProps {
	shipmentCode: Primitives<ShipmendtCode>
	status: Primitives<ShipmentStatus>
}

export const ShipmentModalTitle = ({ shipmentCode, status }: ShipmentModalTitleProps) => {
	const statusName = status as StatusEnum
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				{<Icon name="package" size={24} />}
				Detalles del envio
			</Typography>
			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
				<Tag
					backgroundColor={getShipmentStatusColor(statusName)}
					iconText={getShipmentStatusText(statusName)}
					color="white"
					icon={<GetShipmentStatusIcon status={statusName} size={14} />}
				/>

				<Typography variant="span" option="small" className="font-mono">
					Código de envio: {shipmentCode}
				</Typography>
			</div>
		</div>
	)
}

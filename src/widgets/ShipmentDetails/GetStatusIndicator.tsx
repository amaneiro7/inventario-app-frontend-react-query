import { GetShipmentStatusIcon } from '@/entities/shipment/infra/ui/GetShipmentStatusIcon'
import { getShipmentStatusText } from '@/entities/shipment/infra/ui/GetShipmentStatusText'
import { getShipmentStatusClassName } from '@/entities/shipment/infra/ui/GetShipmentStatusClassName'
import { type StatusEnum } from '@/entities/shipment/domain/value-object/ShipmentStatus'

export const GetStatusIndicator = (status?: StatusEnum) => {
	if (!status) {
		return <>N/A</>
	}

	return (
		<div
			className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${getShipmentStatusClassName(status)}`}
		>
			<GetShipmentStatusIcon status={status} size={16} />
			{getShipmentStatusText(status)}
		</div>
	)
}

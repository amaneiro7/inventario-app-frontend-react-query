import { shipmentStatusConfig } from './shipmentStatusConfig'
import { type StatusEnum } from '../../domain/value-object/ShipmentStatus'

export const getShipmentStatusText = (status: StatusEnum): string => {
	return shipmentStatusConfig[status]?.text ?? 'N/A'
}

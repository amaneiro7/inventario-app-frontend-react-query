import { shipmentStatusConfig } from './shipmentStatusConfig'
import { type StatusEnum } from '../../domain/value-object/ShipmentStatus'

export const getShipmentStatusClassName = (status: StatusEnum): HTMLElement['className'] => {
	return shipmentStatusConfig[status]?.className ?? 'bg-gray-100 text-gray-800'
}

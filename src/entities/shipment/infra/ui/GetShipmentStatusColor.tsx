import { shipmentStatusConfig } from './shipmentStatusConfig'
import { type StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type BackgroundType } from '@/shared/ui/Typography/types'

export const getShipmentStatusColor = (status: StatusEnum): BackgroundType => {
	return shipmentStatusConfig[status]?.color ?? 'white'
}

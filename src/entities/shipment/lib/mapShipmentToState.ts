import { convetDateForInputs } from '@/shared/lib/utils/convertDateForInput'
import { type ShipmentDto } from '../domain/dto/Shipment.dto'
import { type DefaultShipment } from '../infra/reducers/shipmentFormReducers'

/**
 * `mapShipmentToState`
 * @function
 * @description Mapea un objeto `ShipmentDto` a la estructura `DefaultShipment` para ser utilizado en el estado de un formulario.
 * @param {ShipmentDto} shipment - El objeto `ShipmentDto` a mapear.
 * @returns {DefaultShipment} El objeto mapeado con la estructura `DefaultShipment`.
 */
export const mapShipmentToState = (
	shipment: ShipmentDto
): {
	originalData: ShipmentDto
	mappedData: DefaultShipment
} => {
	const deviceIds = [...shipment?.shipmentDevice.map(device => device.deviceId)]
	const shipmentDate = convetDateForInputs(shipment.shipmentDate)
	const deliveryDate = convetDateForInputs(shipment.deliveryDate)
	const sentBy = `${shipment?.fromUser?.employee?.name} ${shipment?.fromUser?.employee?.lastName}`
	const mappedData: DefaultShipment = {
		id: shipment.id,
		origin: shipment.origin,
		destination: shipment.destination,
		shipmentDate,
		deliveryDate,
		sentBy,
		receivedBy: shipment.receivedBy ?? '',
		trackingNumber: shipment.trackingNumber ?? '',
		observation: shipment.observation ?? '',
		status: shipment.status,
		reason: shipment.reason,
		deviceIds,
		updatedAt: shipment?.updatedAt
	}

	return {
		originalData: shipment,
		mappedData
	}
}

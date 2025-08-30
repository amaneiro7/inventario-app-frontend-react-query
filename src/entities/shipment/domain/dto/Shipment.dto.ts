import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ShipmentId } from '../value-object/ShipmentId'
import { type Origin } from '../value-object/Origin'
import { type Destination } from '../value-object/Destination'
import { type ShipmentDate } from '../value-object/ShipmentDate'
import { type DeliveryDate } from '../value-object/DeliveryDate'
import { type SentBy } from '../value-object/SentBy'
import { type ReceivedBy } from '../value-object/ReceivedBy'
import { type TrackingNumber } from '../value-object/TrackingNumber'
import { type Observation } from '../value-object/Observation'
import { type ShipmentStatus } from '../value-object/ShipmentStatus'
import { type ShipmentReason } from '../value-object/ShipmentReason'
import { type DeviceId } from '@/entities/devices/devices/domain/value-object/DeviceId'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { type ShipmendtCode } from '../value-object/ShipmentCode'

/**
 * @interface Shipment
 * @description Representa la entidad de dominio `Shipment` (envío) con sus propiedades básicas.
 * @property {Primitives<ShipmentId>} id - El identificador único del envío.
 * @property {Primitives<Origin>} origin - El origen del envío.
 * @property {Primitives<Destination>} destination - El destino del envío.
 * @property {Primitives<ShipmentDate>} shipmentDate - La fecha de envío.
 * @property {Primitives<DeliveryDate>} deliveryDate - La fecha de entrega.
 * @property {Primitives<SentBy>} sentBy - Quién envía.
 * @property {Primitives<ReceivedBy>} receivedBy - Quién recibe.
 * @property {Primitives<TrackingNumber>} trackingNumber - El número de seguimiento.
 * @property {Primitives<Observation>} observation - Observaciones adicionales.
 * @property {Primitives<ShipmentStatus>} status - El estado del envío.
 * @property {Primitives<ShipmentReason>} reason - La razón o motivo del envío.
 * @property {Primitives<DeviceId>[]} devices - Un array de IDs de dispositivos asociados al envío.
 */
export interface Shipment {
	id: Primitives<ShipmentId>
	origin: Primitives<Origin>
	destination: Primitives<Destination>
	shipmentDate: Primitives<ShipmentDate>
	deliveryDate: Primitives<DeliveryDate>
	receivedBy: Primitives<ReceivedBy>
	trackingNumber: Primitives<TrackingNumber>
	observation: Primitives<Observation>
	status: Primitives<ShipmentStatus>
	reason: Primitives<ShipmentReason>
	deviceIds: Primitives<DeviceId>[]
}

/**
 * @typedef {Object} ShipmentParams
 * @description Representa los parámetros para crear o actualizar una entidad `Shipment`.
 * Incluye todas las propiedades de `ShipmentPrimitives` y opcionalmente el `id`.
 */
export type ShipmentParams = ShipmentPrimitives & {
	id?: Primitives<ShipmentId> | undefined
	shipmentDate: string
	deliveryDate: string
}

/**
 * @typedef {Object} ShipmentPrimitives
 * @description Representa la forma primitiva de una entidad `Shipment` para la persistencia.
 * Excluye el `id` ya que puede ser generado por el sistema de persistencia.
 */
export type ShipmentPrimitives = Omit<Shipment, 'id'> & {}

/**
 * @interface ShipmentDto
 * @description Representa el Data Transfer Object (DTO) de una entidad `Shipment`.
 * Incluye todas las propiedades de `Shipment` más información sobre los dispositivos y la fecha de última actualización.
 * @extends {Shipment}
 * @property {object} shipmentDevice - Información sobre la relación entre envío y dispositivo.
 * @property {Primitives<ShipmentId>} shipmentDevice.id - ID de la relación.
 * @property {Primitives<ShipmentId>} shipmentDevice.shipmentId - ID del envío.
 * @property {Primitives<DeviceId>} shipmentDevice.deviceId - ID del dispositivo.
 * @property {DeviceDto[]} shipmentDevice.devices - El objeto DTO completo del dispositivo.
 * @property {string} updatedAt - La fecha y hora de la última actualización del envío.
 */
export type ShipmentDto = Shipment & {
	shipmentDevice: {
		id: Primitives<ShipmentId>
		shipmentId: Primitives<ShipmentId>
		deviceId: Primitives<DeviceId>
		devices: DeviceDto
	}[]
	sentBy: Primitives<SentBy>
	shipmentDate: string
	shipmentCode: Primitives<ShipmendtCode>
	deliveryDate: string
	updatedAt: string
}

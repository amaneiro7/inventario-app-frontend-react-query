import { Origin } from '../value-object/Origin'
import { Destination } from '../value-object/Destination'
import { ShipmentDate } from '../value-object/ShipmentDate'
import { DeliveryDate } from '../value-object/DeliveryDate'
import { ReceivedBy } from '../value-object/ReceivedBy'
import { TrackingNumber } from '../value-object/TrackingNumber'
import { Observation } from '../value-object/Observation'
import { ShipmentStatus, StatusEnum } from '../value-object/ShipmentStatus'
import { ShipmentReason } from '../value-object/ShipmentReason'
import { DeviceId } from '@/entities/devices/devices/domain/value-object/DeviceId'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { ShipmentParams, type ShipmentPrimitives } from '../dto/Shipment.dto'

/**
 * `Shipment`
 * @class
 * @description Representa la entidad de dominio `Shipment` (envío).
 * Encapsula la lógica de negocio y las reglas de validación para un envío.
 */
export class Shipment {
	/**
	 * Crea una instancia de `Shipment`.
	 * @param {Origin} origin - El origen del envío.
	 * @param {Destination} destination - El destino del envío.
	 * @param {ShipmentDate} shipmentDate - La fecha de envío.
	 * @param {DeliveryDate} deliveryDate - La fecha de entrega.
	 * @param {SentBy} sentBy - Quién envía.
	 * @param {ReceivedBy} receivedBy - Quién recibe.
	 * @param {TrackingNumber} trackingNumber - El número de seguimiento.
	 * @param {Observation} observation - Observaciones.
	 * @param {ShipmentStatus} status - El estado del envío.
	 * @param {ShipmentReason} reason - El motivo del envío.
	 * @param {DeviceId[]} deviceIds - IDs de dispositivos en el envío.
	 */
	constructor(
		private readonly origin: Origin,
		private readonly destination: Destination,
		private readonly shipmentDate: ShipmentDate,
		private readonly deliveryDate: DeliveryDate,
		private readonly receivedBy: ReceivedBy,
		private readonly trackingNumber: TrackingNumber,
		private readonly observation: Observation,
		private readonly status: ShipmentStatus,
		private readonly reason: ShipmentReason,
		private readonly deviceIds: DeviceId[]
	) {}

	/**
	 * Crea una instancia de `Shipment` a partir de datos existentes (p. ej., desde la base de datos o API).
	 * Este método se utiliza para reconstruir una entidad y solo valida invariantes que siempre deben cumplirse.
	 * @param {ShipmentParams} params - Las propiedades primitivas del envío.
	 * @returns {Shipment} Una instancia de `Shipment`.
	 */
	static fromPrimitives(params: ShipmentParams): Shipment {
		// Invariant rule: origin and destination cannot be the same.
		if (params.origin === params.destination) {
			throw new InvalidArgumentError('El origen y el destino no pueden ser el mismo.')
		}

		if (params.deliveryDate && params.deliveryDate < params.shipmentDate) {
			throw new InvalidArgumentError(
				'La fecha de entrega no puede ser anterior a la fecha de envío.'
			)
		}

		if (params.status === StatusEnum.DELIVERED && !params.receivedBy) {
			throw new InvalidArgumentError(
				'Para marcar un envío como entregado, el campo "recibido por" es obligatorio.'
			)
		}

		const deviceIds = params.deviceIds.map(device => new DeviceId(device))
		const shipmentDate = new Date(params.shipmentDate)
		const deliveryDate = params.deliveryDate ? new Date(params.deliveryDate) : null

		return new Shipment(
			new Origin(params.origin),
			new Destination(params.destination),
			new ShipmentDate(shipmentDate),
			new DeliveryDate(deliveryDate),
			new ReceivedBy(params.receivedBy),
			new TrackingNumber(params.trackingNumber),
			new Observation(params.observation),
			new ShipmentStatus(params.status),
			new ShipmentReason(params.reason),
			deviceIds
		)
	}

	/**
	 * Crea una **nueva** instancia de `Shipment` a partir de sus propiedades primitivas,
	 * aplicando las reglas de negocio para la creación.
	 * @param {ShipmentParams} params - Las propiedades primitivas del envío.
	 * @returns {Shipment} Una nueva instancia de `Shipment`.
	 */
	static create(params: ShipmentParams): Shipment {
		// --- Business Rules for Creation ---
		if (params.status !== StatusEnum.PENDING && params.status !== StatusEnum.IN_TRANSIT) {
			throw new InvalidArgumentError(
				`Un envío solo puede crearse con el estado PENDIENTE o EN TRÁNSITO, pero se recibió '${params.status}'.`
			)
		}
		if (params.deliveryDate) {
			throw new InvalidArgumentError('Un envío nuevo no puede tener una fecha de entrega.')
		}

		// Re-use fromPrimitives for construction and invariant validation
		return Shipment.fromPrimitives(params)
	}

	get originValue(): Origin['value'] {
		return this.origin.value
	}

	get destinationValue(): Destination['value'] {
		return this.destination.value
	}

	get shipmentDateValue(): ShipmentDate['value'] {
		return this.shipmentDate.value
	}

	get deliveryDateValue(): DeliveryDate['value'] {
		return this.deliveryDate.value
	}

	get receivedByValue(): ReceivedBy['value'] {
		return this.receivedBy.value
	}

	get trackingNumberValue(): TrackingNumber['value'] {
		return this.trackingNumber.value
	}

	get observationValue(): Observation['value'] {
		return this.observation.value
	}

	get statusValue(): ShipmentStatus['value'] {
		return this.status.value
	}

	get reasonValue(): ShipmentReason['value'] {
		return this.reason.value
	}

	get deviceValues(): Primitives<DeviceId>[] {
		return this.deviceIds.map(device => device.value)
	}

	/**
	 * Convierte la entidad `Shipment` a su representación primitiva.
	 * @returns {ShipmentPrimitives} La representación primitiva del envío.
	 */
	toPrimitives(): ShipmentPrimitives {
		return {
			origin: this.originValue,
			destination: this.destinationValue,
			shipmentDate: this.shipmentDateValue,
			deliveryDate: this.deliveryDateValue,
			receivedBy: this.receivedByValue,
			trackingNumber: this.trackingNumberValue,
			observation: this.observationValue,
			status: this.statusValue,
			reason: this.reasonValue,
			deviceIds: this.deviceValues
		}
	}
}

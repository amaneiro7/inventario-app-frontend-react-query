import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { TypeOfSiteId } from '@/entities/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { type LocationId } from '@/entities/locations/locations/domain/value-object/LocationId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class DeviceLocation extends AcceptedNullValueObject<Primitives<LocationId>> {
	private static errors = ''
	constructor(
		value: Primitives<LocationId> | null,
		private readonly status: Primitives<StatusId>,
		private readonly typeOfSite?: Primitives<TypeOfSiteId>
	) {
		super(value)
		if (
			!DeviceLocation.isValid({
				status: this.status,
				typeOfSite: this.typeOfSite
			})
		) {
			throw new Error(DeviceLocation.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		DeviceLocation.errors = error
	}

	private static get errorsValue(): string {
		return DeviceLocation.errors
	}

	public static isValid({
		status,
		typeOfSite
	}: {
		status?: Primitives<StatusId>
		typeOfSite?: Primitives<TypeOfSiteId>
	}): boolean {
		if (!status) return true
		// condicional para validar
		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.JORNADA:
			case StatusOptions.GUARDIA:
			case StatusOptions.DISPONIBLE:
				if (typeOfSite === TypeOfSiteOptions.ALMACEN) {
					this.updateError('Si esta en uso, la ubicación no puede estar en almacen.')
					return false
				}
				break
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
				if (typeOfSite !== TypeOfSiteOptions.ALMACEN) {
					this.updateError('Si no esta en uso, solo puede estar ubicado en el almacen.')
					return false
				}
				break
			default:
				break
		}
		if (status !== StatusOptions.DESINCORPORADO && !typeOfSite) {
			this.updateError('La ubicación es requerida.')
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}

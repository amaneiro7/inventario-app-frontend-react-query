import { type LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'

export class DeviceLocation extends AcceptedNullValueObject<Primitives<LocationId>> {
	private static errors = ''
	constructor(
		value: Primitives<LocationId> | null,
		private readonly status: (typeof StatusOptions)[keyof typeof StatusOptions],
		private readonly typeOfSite: (typeof TypeOfSiteOptions)[keyof typeof TypeOfSiteOptions]
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
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
		typeOfSite?: (typeof TypeOfSiteOptions)[keyof typeof TypeOfSiteOptions]
	}): boolean {
		if (!status) return true
		const allowedStausValuesInAlmacen = [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA,
			StatusOptions.DISPONIBLE
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (
			allowedStausValuesInAlmacen.includes(status) &&
			typeOfSite === TypeOfSiteOptions.ALMACEN
		) {
			this.updateError('Si esta en uso, la ubicación no puede estar en almacen')
			return false
		}
		const notAllowedStausValuesInAlmacen = [
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (
			notAllowedStausValuesInAlmacen.includes(status) &&
			typeOfSite !== TypeOfSiteOptions.ALMACEN
		) {
			this.updateError('Si no esta en uso, solo puede estar ubicado en el almacen')
			return false
		}
		if (status !== StatusOptions.DESINCORPORADO && !typeOfSite) {
			this.updateError('La ubicación es requerida')
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}

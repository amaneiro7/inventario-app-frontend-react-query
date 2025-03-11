import { Device } from '../domain/entity/Device'
import { DeviceId } from '../domain/value-object/DeviceId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type DeviceSaveRepository } from '../domain/repository/DeviceSaveRepository'
import { type Params } from '../domain/dto/Device.dto'
import { DeviceComputer } from '../domain/entity/DeviceComputer'
import { DeviceHardDrive } from '../domain/entity/DeviceHardDrive'
import { DeviceMFP } from '../domain/entity/DeviceComputerMFP'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'

export class DeviceCreator {
	constructor(
		private readonly repository: DeviceSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: Params) {
		this.events.notify({ type: 'loading' })
		try {
			let device: Device | DeviceComputer | DeviceHardDrive | DeviceMFP

			switch (params.categoryId) {
				// Logica cuando es computadora, laptop, servidor o all in one
				case CategoryOptions.COMPUTER:
				case CategoryOptions.ALLINONE:
				case CategoryOptions.LAPTOP:
				case CategoryOptions.SERVER:
					device = DeviceComputer.create(params)
					break
				// logica cuando es disco duro
				case CategoryOptions.HARDDRIVE:
					device = DeviceHardDrive.create(params)
					break
				// logica cuando esimMpresora multifuncional
				case CategoryOptions.MFP:
					device = DeviceMFP.create(params)
					break
				default:
					device = Device.create(params)
			}

			// Crea el payload del device.
			const payload = device.toPrimitives()
			// Guarda o actualiza el device basado en si existe un ID.
			const result = params.id
				? await this.repository.update({ id: new DeviceId(params.id).value, payload })
				: await this.repository.save({ payload })

			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw new Error(errorMessage)
		}
	}
}

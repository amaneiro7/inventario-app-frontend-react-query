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
		try {
			let device

			// Logica cuando es computadora, laptop, servidor o all in one
			if (
				params.categoryId === CategoryOptions.COMPUTER ||
				params.categoryId === CategoryOptions.ALLINONE ||
				params.categoryId === CategoryOptions.LAPTOP ||
				params.categoryId === CategoryOptions.SERVER
			) {
				device = DeviceComputer.create(params)
			}
			// logica cuando es disco duro
			else if (params.categoryId === CategoryOptions.HARDDRIVE) {
				device = DeviceHardDrive.create(params)
			}
			// logica cuando esimMpresora multifuncional
			else if (params.categoryId === CategoryOptions.MFP) {
				device = DeviceMFP.create(params)
			}
			// logica para el rsto que no tiene algunca caracteristicas especial
			else {
				device = Device.create(params)
			}
			const payload = device.toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new DeviceId(params.id).value
				return await this.repository
					.update({ id, payload })
					.then(res => {
						this.events.notify({
							type: 'success',
							message: res.message
						})
						return res
					})
			}
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}

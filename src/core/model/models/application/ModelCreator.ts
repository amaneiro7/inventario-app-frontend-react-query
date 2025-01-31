import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type ModelComputerParams } from '../domain/dto/ModelComputer.dto'
import { type ModelLaptopParams } from '../domain/dto/ModelLaptop.dto'
import { type ModelKeyboardParams } from '../domain/dto/ModelKeyboard.dto'
import { type ModelMonitorParams } from '../domain/dto/ModelMonitor.dto'
import { type ModelPrinterParams } from '../domain/dto/ModelPrinter.dto'
import { type ModelSaveRepository } from '../domain/repository/ModelSaveRepository'
import { ModelId } from '../domain/value-object/ModelId'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { Model } from '../domain/entity/Model'
import { ModelComputer } from '../domain/entity/ModelComputer'
import { ModelLaptop } from '../domain/entity/ModelLaptop'
import { ModelMonitor } from '../domain/entity/ModelMonitor'
import { ModelPrinter } from '../domain/entity/ModelPrinter'
import { ModelKeyboard } from '../domain/entity/ModelKeyboard'

type Params =
	| ModelComputerParams
	| ModelLaptopParams
	| ModelKeyboardParams
	| ModelMonitorParams
	| ModelPrinterParams
export class ModelCreator {
	constructor(
		private readonly repository: ModelSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: Params) {
		try {
			let payload

			// Validar si pertenece a Computadora, All in one o Servicores
			if (
				CategoryOptions.ALLINONE === params.categoryId ||
				CategoryOptions.SERVER === params.categoryId ||
				CategoryOptions.COMPUTER === params.categoryId
			) {
				payload = ModelComputer.create(params).toPrimitives()
			}
			// Validar si pertenece a Laptop
			if (CategoryOptions.LAPTOP === params.categoryId) {
				payload = ModelLaptop.create(params).toPrimitives()
			}
			// Validar si pertenece a Monitor
			if (CategoryOptions.MONITOR === params.categoryId) {
				payload = ModelMonitor.create(params).toPrimitives()
			}
			// Validar si pertenece a Impresora
			if (
				CategoryOptions.INKPRINTER === params.categoryId ||
				CategoryOptions.LASERPRINTER === params.categoryId
			) {
				payload = ModelPrinter.create(params).toPrimitives()
			}
			// Validar si pertenece a Teclados
			if (CategoryOptions.KEYBOARD === params.categoryId) {
				payload = ModelKeyboard.create(params).toPrimitives()
			} else {
				// el resto de modelos
				payload = Model.create(params).toPrimitives()
			}
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new ModelId(params.id).value
				return await this.repository.update({ id, payload }).then(res => {
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

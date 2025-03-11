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
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			let model:
				| Model
				| ModelComputer
				| ModelLaptop
				| ModelMonitor
				| ModelPrinter
				| ModelKeyboard
			switch (params.categoryId) {
				case CategoryOptions.COMPUTER:
				case CategoryOptions.ALLINONE:
				case CategoryOptions.SERVER:
					model = ModelComputer.create(params)
					break
				case CategoryOptions.LAPTOP:
					model = ModelLaptop.create(params)
					break
				case CategoryOptions.MONITOR:
					model = ModelMonitor.create(params)
					break
				case CategoryOptions.INKPRINTER:
				case CategoryOptions.LASERPRINTER:
					model = ModelPrinter.create(params)
					break
				case CategoryOptions.KEYBOARD:
					model = ModelKeyboard.create(params)
					break
				default:
					model = Model.create(params)
			}

			// Crea el payload del modelo.
			const payload = model.toPrimitives()

			// Guarda o actualiza el modelo basado en si existe un ID.
			const result = params.id
				? await this.repository.update({ id: new ModelId(params.id).value, payload })
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

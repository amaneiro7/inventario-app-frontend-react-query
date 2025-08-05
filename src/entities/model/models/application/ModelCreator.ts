import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type ModelComputerParams } from '../domain/dto/ModelComputer.dto'
import { type ModelLaptopParams } from '../domain/dto/ModelLaptop.dto'
import { type ModelKeyboardParams } from '../domain/dto/ModelKeyboard.dto'
import { type ModelMonitorParams } from '../domain/dto/ModelMonitor.dto'
import { type ModelPrinterParams } from '../domain/dto/ModelPrinter.dto'
import { type ModelSaveRepository } from '../domain/repository/ModelSaveRepository'
import { ModelId } from '../domain/value-object/ModelId'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
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

/**
 * Service class responsible for creating and updating Model entities based on their category.
 * It interacts with a ModelSaveRepository to persist data and an EventManager to notify about operation status.
 */
export class ModelCreator {
	/**
	 * Constructs a ModelCreator instance.
	 * @param repository - The repository responsible for saving and updating model data.
	 * @param events - The event manager to notify about the operation's progress (loading, success, error).
	 */
	constructor(
		private readonly repository: ModelSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Creates a new model or updates an existing one based on the provided parameters and category.
	 * It dynamically creates the correct model entity (e.g., ModelComputer, ModelLaptop) based on `params.categoryId`,
	 * converts it to primitives, and then uses the repository to save or update the data.
	 * Event notifications are sent for loading, success, and error states.
	 * @param params - The parameters for creating or updating a model. If `params.id` is provided,
	 *                 an update operation is performed; otherwise, a new model is created.
	 * @returns A Promise that resolves to the result of the save or update operation.
	 * @throws Error if the operation fails, with a message indicating the cause.
	 */
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
import { ScreenSize } from '../domain/value-object/ScreenSize'
import { type ModelDto } from '../domain/dto/Model.dto'
import { type DefaultModel } from '../infra/reducers/modelFormReducer'

/**
 * Maps the fetched ModelDto to the DefaultModel form state.
 * @param model - The ModelDto object fetched from the API.
 */
export const mapModelsToState = (model: ModelDto): DefaultModel => {
	const { modelComputer, modelKeyboard, modelLaptop, modelMonitor, modelPrinter } = model
	return {
		id: model.id,
		mainCategoryId: model.category.mainCategoryId,
		categoryId: model.categoryId,
		brandId: model.brandId,
		name: model.name,
		generic: model.generic,
		processors: model.processors.map(processor => processor.id),
		updatedAt: model.updatedAt,
		hasBluetooth: modelComputer?.hasBluetooth || modelLaptop?.hasBluetooth || false,
		hasWifiAdapter: modelComputer?.hasWifiAdapter || modelLaptop?.hasWifiAdapter || false,
		hasDVI: modelComputer?.hasDVI || modelLaptop?.hasDVI || modelMonitor?.hasDVI || false,
		hasHDMI: modelComputer?.hasHDMI || modelLaptop?.hasHDMI || modelMonitor?.hasHDMI || false,
		hasVGA: modelComputer?.hasVGA || modelLaptop?.hasVGA || modelMonitor?.hasVGA || false,
		memoryRamSlotQuantity:
			modelComputer?.memoryRamSlotQuantity || modelLaptop?.memoryRamSlotQuantity || 0,
		memoryRamTypeId: modelComputer?.memoryRamTypeId || modelLaptop?.memoryRamTypeId || '',
		batteryModel: modelLaptop?.batteryModel ?? '',
		hasFingerPrintReader: modelKeyboard?.hasFingerPrintReader || false,
		screenSize: modelMonitor?.screenSize ?? ScreenSize.MIN,
		cartridgeModel: modelPrinter?.cartridgeModel ?? '',
		inputTypeId: modelKeyboard?.inputTypeId ?? ''
	}
}

import { type ModelDto, type ModelParams } from '../../domain/dto/Model.dto'
import { MemoryRamSlotQuantity } from '../../domain/value-object/MemoryRamSlotQuantity'
import { ScreenSize } from '../../domain/value-object/ScreenSize'

/**
 * Represents the default structure for a model's form data, including all possible features.
 */
export interface DefaultModel extends ModelParams {
	hasBluetooth: boolean
	hasDVI: boolean
	hasHDMI: boolean
	hasVGA: boolean
	hasWifiAdapter: boolean
	hasFingerPrintReader: boolean
	memoryRamSlotQuantity: number
	memoryRamTypeId: string
	batteryModel: string
	screenSize: number
	cartridgeModel: string
	inputTypeId: string
	updatedAt?: ModelDto['updatedAt']
}

/**
 * Defines the structure for validation errors in the model form.
 */
export interface ModelErrors extends Record<string, string> {
	name: string
	mainCategoryId: string
	categoryId: string
	brandId: string
	memoryRamTypeId: string
	memoryRamSlotQuantity: string
	batteryModel: string
	screenSize: string
	cartridgeModel: string
	inputTypeId: string
}

/**
 * Defines which fields in the model form are required based on current state.
 */
export interface ModelRequired extends Record<string, boolean> {
	name: boolean
	mainCategoryId: boolean
	categoryId: boolean
	brandId: boolean
	memoryRamTypeId: boolean
	memoryRamSlotQuantity: boolean
	batteryModel: boolean
	screenSize: boolean
	cartridgeModel: boolean
	inputTypeId: boolean
}

/**
 * Defines which fields in the model form are disabled based on current state.
 */
export interface ModelDisabled extends Record<string, boolean> {
	name: boolean
	mainCategoryId: boolean
	categoryId: boolean
	brandId: boolean
	memoryRamTypeId: boolean
	memoryRamSlotQuantity: boolean
	batteryModel: boolean
	screenSize: boolean
	cartridgeModel: boolean
	inputTypeId: boolean
}

/**
 * Represents the entire state managed by the model form reducer.
 */
export interface State {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelRequired
	disabled: ModelDisabled
}

/**
 * The initial state for the model form reducer.
 */
export const initialModelState: State = {
	formData: {
		id: undefined,
		mainCategoryId: '',
		categoryId: '',
		brandId: '',
		name: '',
		processors: [],
		generic: false,
		hasBluetooth: false,
		hasDVI: false,
		hasHDMI: false,
		hasVGA: true,
		hasWifiAdapter: false,
		hasFingerPrintReader: false,
		memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
		memoryRamTypeId: '',
		batteryModel: '',
		screenSize: ScreenSize.MIN,
		cartridgeModel: '',
		inputTypeId: '',
		updatedAt: undefined
	},
	errors: {
		name: '',
		mainCategoryId: '',
		categoryId: '',
		brandId: '',
		memoryRamSlotQuantity: '',
		memoryRamTypeId: '',
		batteryModel: '',
		screenSize: '',
		cartridgeModel: '',
		inputTypeId: ''
	},
	required: {
		mainCategoryId: true,
		categoryId: true,
		brandId: true,
		name: true,
		memoryRamTypeId: true,
		memoryRamSlotQuantity: true,
		batteryModel: true,
		screenSize: true,
		cartridgeModel: false,
		inputTypeId: true
	},
	disabled: {
		mainCategoryId: false,
		categoryId: true,
		brandId: true,
		name: false,
		memoryRamTypeId: false,
		memoryRamSlotQuantity: false,
		batteryModel: false,
		screenSize: false,
		cartridgeModel: false,
		inputTypeId: false
	}
}

/**
 * Defines the possible actions that can be dispatched to the model form reducer.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultModel } }
	| { type: 'reset'; payload: { formData: DefaultModel } }
	| { type: 'mainCategoryId'; payload: { value: DefaultModel['mainCategoryId'] } }
	| { type: 'categoryId'; payload: { value: DefaultModel['categoryId'] } }
	| { type: 'brandId'; payload: { value: DefaultModel['brandId'] } }
	| { type: 'name'; payload: { value: DefaultModel['name'] } }
	| { type: 'generic'; payload: { value: DefaultModel['generic'] } }
	| { type: 'memoryRamTypeId'; payload: { value: DefaultModel['memoryRamTypeId'] } }
	| { type: 'memoryRamSlotQuantity'; payload: { value: DefaultModel['memoryRamSlotQuantity'] } }
	| { type: 'hasVGA'; payload: { value: DefaultModel['hasVGA'] } }
	| { type: 'hasDVI'; payload: { value: DefaultModel['hasDVI'] } }
	| { type: 'hasHDMI'; payload: { value: DefaultModel['hasHDMI'] } }
	| { type: 'hasBluetooth'; payload: { value: DefaultModel['hasBluetooth'] } }
	| { type: 'hasWifiAdapter'; payload: { value: DefaultModel['hasWifiAdapter'] } }
	| { type: 'batteryModel'; payload: { value: DefaultModel['batteryModel'] } }
	| { type: 'hasFingerPrintReader'; payload: { value: DefaultModel['hasFingerPrintReader'] } }
	| { type: 'screenSize'; payload: { value: DefaultModel['screenSize'] } }
	| { type: 'cartridgeModel'; payload: { value: DefaultModel['cartridgeModel'] } }
	| { type: 'inputTypeId'; payload: { value: DefaultModel['inputTypeId'] } }
	| { type: 'addProcessor'; payload: { value: string } }
	| { type: 'removeProcessor'; payload: { value: string } }

/**
 * Reducer function for managing the state of the model form.
 * It handles various actions to update form data, errors, required fields, and disabled fields.
 * @param state - The current state of the form.
 * @param action - The dispatched action.
 * @returns The new state after applying the action.
 */
export const modelFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		/**
		 * Initializes or resets the form data. Also updates disabled states for dependent fields.
		 */
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...state.disabled,
					categoryId: !action.payload.formData.mainCategoryId,
					brandId: !action.payload.formData.categoryId
				}
			}
		}
		/**
		 * Updates the mainCategoryId field and resets related fields (categoryId, brandId, and all feature-related fields).
		 * Also updates disabled states for dependent fields.
		 */
		case 'mainCategoryId': {
			const mainCategoryId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					mainCategoryId,
					categoryId: '',
					brandId: '',
					hasBluetooth: false,
					hasDVI: false,
					hasHDMI: false,
					hasVGA: true,
					hasWifiAdapter: false,
					hasFingerPrintReader: false,
					memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
					memoryRamTypeId: '',
					batteryModel: '',
					screenSize: ScreenSize.MIN,
					cartridgeModel: '',
					inputTypeId: ''
				},
				disabled: {
					...state.disabled,
					categoryId: !mainCategoryId,
					brandId: true
				}
			}
		}
		/**
		 * Updates the categoryId field and resets related fields (brandId and all feature-related fields).
		 * Also updates disabled states for dependent fields.
		 */
		case 'categoryId': {
			const categoryId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					categoryId,
					brandId: '',
					hasBluetooth: false,
					hasDVI: false,
					hasHDMI: false,
					hasVGA: true,
					hasWifiAdapter: false,
					hasFingerPrintReader: false,
					memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
					memoryRamTypeId: '',
					batteryModel: '',
					screenSize: ScreenSize.MIN,
					cartridgeModel: '',
					inputTypeId: ''
				},
				disabled: {
					...state.disabled,
					brandId: !categoryId
				}
			}
		}
		/**
		 * Updates the brandId field and resets all feature-related fields.
		 */
		case 'brandId': {
			const brandId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					brandId,
					hasBluetooth: false,
					hasDVI: false,
					hasHDMI: false,
					hasVGA: true,
					hasWifiAdapter: false,
					hasFingerPrintReader: false,
					memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
					memoryRamTypeId: '',
					batteryModel: '',
					screenSize: ScreenSize.MIN,
					cartridgeModel: '',
					inputTypeId: ''
				}
			}
		}
		/**
		 * Updates the name field.
		 */
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name }
			}
		}
		/**
		 * Updates the generic field.
		 */
		case 'generic': {
			const generic = action.payload.value
			return {
				...state,
				formData: { ...state.formData, generic }
			}
		}
		/**
		 * Updates the memoryRamTypeId field.
		 */
		case 'memoryRamTypeId': {
			const memoryRamTypeId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, memoryRamTypeId }
			}
		}
		/**
		 * Updates the memoryRamSlotQuantity field.
		 */
		case 'memoryRamSlotQuantity': {
			const memoryRamSlotQuantity = action.payload.value
			return {
				...state,
				formData: { ...state.formData, memoryRamSlotQuantity }
			}
		}
		/**
		 * Updates the hasVGA field.
		 */
		case 'hasVGA': {
			const hasVGA = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasVGA }
			}
		}
		/**
		 * Updates the hasDVI field.
		 */
		case 'hasDVI': {
			const hasDVI = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasDVI }
			}
		}
		/**
		 * Updates the hasHDMI field.
		 */
		case 'hasHDMI': {
			const hasHDMI = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasHDMI }
			}
		}
		/**
		 * Updates the hasBluetooth field.
		 */
		case 'hasBluetooth': {
			const hasBluetooth = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasBluetooth }
			}
		}
		/**
		 * Updates the hasWifiAdapter field.
		 */
		case 'hasWifiAdapter': {
			const hasWifiAdapter = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasWifiAdapter }
			}
		}
		/**
		 * Updates the batteryModel field.
		 */
		case 'batteryModel': {
			const batteryModel = action.payload.value
			return {
				...state,
				formData: { ...state.formData, batteryModel }
			}
		}
		/**
		 * Updates the hasFingerPrintReader field.
		 */
		case 'hasFingerPrintReader': {
			const hasFingerPrintReader = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasFingerPrintReader }
			}
		}
		/**
		 * Updates the screenSize field.
		 */
		case 'screenSize': {
			const screenSize = action.payload.value
			return {
				...state,
				formData: { ...state.formData, screenSize }
			}
		}
		/**
		 * Updates the cartridgeModel field.
		 */
		case 'cartridgeModel': {
			const cartridgeModel = action.payload.value
			return {
				...state,
				formData: { ...state.formData, cartridgeModel }
			}
		}
		/**
		 * Updates the inputTypeId field.
		 */
		case 'inputTypeId': {
			const inputTypeId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, inputTypeId }
			}
		}
		/**
		 * Adds a new processor ID to the form data.
		 */
		case 'addProcessor': {
			const processors = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					processors: [...state.formData.processors, processors]
				}
			}
		}
		/**
		 * Removes a processor ID from the form data.
		 */
		case 'removeProcessor': {
			const processors = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					processors: state.formData.processors.filter(c => c !== processors)
				}
			}
		}
		default:
			return state
	}
}

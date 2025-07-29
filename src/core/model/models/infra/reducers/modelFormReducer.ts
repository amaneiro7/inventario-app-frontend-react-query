import { type ModelDto, type ModelParams } from '../../domain/dto/Model.dto'
import { MemoryRamSlotQuantity } from '../../domain/value-object/MemoryRamSlotQuantity'
import { ScreenSize } from '../../domain/value-object/ScreenSize'

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

export interface ModelErrors {
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
export interface ModelRequired {
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

export interface ModelDisabled {
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

export interface State {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelRequired
	disabled: ModelDisabled
}

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
		cartridgeModel: true,
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

export const modelFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
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
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name }
			}
		}
		case 'generic': {
			const generic = action.payload.value
			return {
				...state,
				formData: { ...state.formData, generic }
			}
		}
		case 'memoryRamTypeId': {
			const memoryRamTypeId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, memoryRamTypeId }
			}
		}
		case 'memoryRamSlotQuantity': {
			const memoryRamSlotQuantity = action.payload.value
			return {
				...state,
				formData: { ...state.formData, memoryRamSlotQuantity }
			}
		}
		case 'hasVGA': {
			const hasVGA = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasVGA }
			}
		}
		case 'hasDVI': {
			const hasDVI = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasDVI }
			}
		}
		case 'hasHDMI': {
			const hasHDMI = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasHDMI }
			}
		}
		case 'hasBluetooth': {
			const hasBluetooth = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasBluetooth }
			}
		}
		case 'hasWifiAdapter': {
			const hasWifiAdapter = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasWifiAdapter }
			}
		}
		case 'batteryModel': {
			const batteryModel = action.payload.value
			return {
				...state,
				formData: { ...state.formData, batteryModel }
			}
		}
		case 'hasFingerPrintReader': {
			const hasFingerPrintReader = action.payload.value
			return {
				...state,
				formData: { ...state.formData, hasFingerPrintReader }
			}
		}
		case 'screenSize': {
			const screenSize = action.payload.value
			return {
				...state,
				formData: { ...state.formData, screenSize }
			}
		}
		case 'cartridgeModel': {
			const cartridgeModel = action.payload.value
			return {
				...state,
				formData: { ...state.formData, cartridgeModel }
			}
		}
		case 'inputTypeId': {
			const inputTypeId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, inputTypeId }
			}
		}
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

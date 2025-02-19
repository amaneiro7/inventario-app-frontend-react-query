import { DeviceParams } from '../../domain/dto/Device.dto'

export interface ProcessorsErrors {
	productCollection: string
	numberModel: string
	cores: string
	frequency: string
}

export interface State {
	formData: DeviceParams
	errors: ProcessorsErrors
}

export const initialParamsState: State = {
	formData: {
		id: undefined,
		serial: '',
		activo: '',
		statusId: '',
		modelId: '',
		mainCategoryId: '',
		categoryId: '',
		brandId: '',
		employeeId: '',
		locationId: '',
		typeOfSiteId: '',
		observation: '',
		stockNumber: '',
		computerName: '',
		processorId: '',
		memoryRamCapacity: 0,
		hardDriveCapacityId: '',
		hardDriveTypeId: '',
		operatingSystemArqId: '',
		operatingSystemId: '',
		macAddress: '',
		ipAddress: '',
		health: 100,
		updatedAt: undefined,
		memoryRamSlotQuantity: undefined,
		memoryRamType: '',
		memoryRam: [],
		history: []
	},
	errors: {
		productCollection: '',
		numberModel: '',
		cores: '',
		frequency: ''
	}
}

export type Action =
	| { type: 'init'; payload: { formData: ProcessorParams } }
	| { type: 'reset'; payload: { formData: ProcessorParams } }
	| { type: 'productCollection'; payload: { value: ProcessorParams['productCollection'] } }
	| { type: 'numberModel'; payload: { value: ProcessorParams['numberModel'] } }
	| { type: 'cores'; payload: { value: ProcessorParams['cores'] } }
	| { type: 'frequency'; payload: { value: ProcessorParams['frequency'] } }
	| { type: 'threads'; payload: { value: ProcessorParams['threads'] } }

export const processorFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialParamsState.errors }
			}
		}
		case 'reset':
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialParamsState.errors }
			}
		case 'productCollection': {
			const productCollection = action.payload.value
			return {
				...state,
				formData: { ...state.formData, productCollection },
				errors: {
					...state.errors,
					productCollection: ProcessorProductCollection.isValid(productCollection)
						? ''
						: ProcessorProductCollection.invalidMessage(productCollection)
				}
			}
		}
		case 'numberModel': {
			const numberModel = action.payload.value
			return {
				...state,
				formData: { ...state.formData, numberModel },
				errors: {
					...state.errors,
					numberModel: ProcessorNumberModel.isValid(numberModel)
						? ''
						: ProcessorNumberModel.invalidMessage(numberModel)
				}
			}
		}
		case 'cores': {
			const cores = action.payload.value
			return {
				...state,
				formData: { ...state.formData, cores },
				errors: {
					...state.errors,
					cores: ProcessorCores.isValid(cores) ? '' : ProcessorCores.invalidMessage(cores)
				}
			}
		}
		case 'frequency': {
			const frequency = action.payload.value
			return {
				...state,
				formData: { ...state.formData, frequency },
				errors: {
					...state.errors,
					frequency: ProcessorFrequency.isValid(frequency)
						? ''
						: ProcessorFrequency.invalidMessage(frequency)
				}
			}
		}
		case 'threads': {
			const threads = action.payload.value
			return {
				...state,
				formData: { ...state.formData, threads }
			}
		}
		default:
			return state
	}
}

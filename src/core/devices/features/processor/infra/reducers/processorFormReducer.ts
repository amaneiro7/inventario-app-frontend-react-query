import { type ProcessorParams } from '../../domain/dto/Processor.dto'

export const initialProcessorState: ProcessorParams = {
	id: undefined,
	productCollection: '',
	numberModel: '',
	cores: 1,
	frequency: 1,
	threads: false
}

export type Action =
	| { type: 'init'; payload: { formData: ProcessorParams } }
	| { type: 'reset'; payload: { formData: ProcessorParams } }
	| { type: 'productCollection'; payload: { value: ProcessorParams['productCollection'] } }
	| { type: 'numberModel'; payload: { value: ProcessorParams['numberModel'] } }
	| { type: 'cores'; payload: { value: ProcessorParams['cores'] } }
	| { type: 'frequency'; payload: { value: ProcessorParams['frequency'] } }
	| { type: 'threads'; payload: { value: ProcessorParams['threads'] } }

export const processorFormReducer = (state: ProcessorParams, action: Action): ProcessorParams => {
	switch (action.type) {
		case 'init':
			return {
				...state,
				...action.payload.formData
			}
		case 'reset':
			return {
				...state,
				...action.payload.formData
			}
		case 'productCollection':
			return {
				...state,
				productCollection: action.payload.value
			}
		case 'numberModel':
			return {
				...state,
				numberModel: action.payload.value
			}
		case 'cores':
			return {
				...state,
				cores: action.payload.value
			}
		case 'frequency':
			return {
				...state,
				frequency: action.payload.value
			}
		case 'threads':
			return {
				...state,
				threads: action.payload.value
			}
		default:
			return state
	}
}

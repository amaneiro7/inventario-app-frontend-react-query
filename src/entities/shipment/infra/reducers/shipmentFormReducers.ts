import { convetDateForInputs } from '@/shared/lib/utils/convertDateForInput'
import { ReasonEnum } from '../../domain/value-object/ShipmentReason'
import { StatusEnum } from '../../domain/value-object/ShipmentStatus'

/**
 * @typedef {Object} DefaultShipment
 * @description Tipo que extiende `ShipmentParams` para incluir una propiedad `updatedAt` opcional.
 * Representa el estado por defecto de una marca en el formulario.
 * @property {string} [updatedAt] - Fecha de la última actualización de la marca (opcional).
 */
export type DefaultShipment = {
	id?: string
	origin: string
	destination: string
	shipmentDate: string
	deliveryDate: string
	sentBy?: string
	receivedBy: string
	trackingNumber: string
	observation: string
	status: string
	reason: string
	deviceIds: string[]
	updatedAt?: string
}

/**
 * @interface ShipmentErrors
 * @description Define la estructura de los errores de validación para el formulario de `Shipment`.
 * @property {string} name - Mensaje de error para el campo `name`.
 */
export interface ShipmentErrors {
	origin: string
	destination: string
	shipmentDate: string
	deliveryDate: string
	sentBy: string
	receivedBy: string
	trackingNumber: string
	observation: string
	status: string
	reason: string
}
export interface ShipmentRequired {
	status: boolean
	reason: boolean
	origin: boolean
	destination: boolean
	sentBy: boolean
	receivedBy: boolean
	shipmentDate: boolean
	deliveryDate: boolean
	trackingNumber: boolean
	observation: boolean
}
export interface ShipmentDisabled {
	status: boolean
	reason: boolean
	origin: boolean
	destination: boolean
	sentBy: boolean
	receivedBy: boolean
	shipmentDate: boolean
	deliveryDate: boolean
	trackingNumber: boolean
	observation: boolean
}

/**
 * @interface State
 * @description Define la estructura del estado para el reducer del formulario de `Shipment`.
 * @property {DefaultShipment} formData - Los datos del formulario de la marca.
 * @property {ShipmentErrors} errors - Los errores de validación asociados a los campos del formulario.
 */
export interface State {
	formData: DefaultShipment
	errors: ShipmentErrors
	required: ShipmentRequired
	disabled: ShipmentDisabled
}

/**
 * Estado inicial del reducer del formulario de `Shipment`.
 * @type {State}
 */
export const initialShipmentState: State = {
	formData: {
		id: undefined,
		origin: '',
		destination: '',
		shipmentDate: convetDateForInputs(new Date()),
		deliveryDate: '',
		sentBy: '',
		receivedBy: '',
		trackingNumber: '',
		observation: '',
		status: StatusEnum.PENDING,
		reason: ReasonEnum.REPAIR,
		deviceIds: [],
		updatedAt: undefined
	},
	errors: {
		origin: '',
		destination: '',
		shipmentDate: '',
		deliveryDate: '',
		sentBy: '',
		receivedBy: '',
		trackingNumber: '',
		observation: '',
		status: '',
		reason: ''
	},
	required: {
		status: true,
		reason: true,
		origin: true,
		destination: true,
		sentBy: true,
		receivedBy: false,
		shipmentDate: true,
		deliveryDate: false,
		trackingNumber: false,
		observation: true
	},
	disabled: {
		status: false,
		reason: false,
		origin: false,
		destination: false,
		sentBy: false,
		receivedBy: false,
		shipmentDate: false,
		deliveryDate: false,
		trackingNumber: false,
		observation: false
	}
}

/**
 * @typedef {(
 *   { type: 'init'; payload: { formData: ShipmentParams } } |
 *   { type: 'reset'; payload: { formData: ShipmentParams } } |
 *   { type: 'name'; payload: { value: ShipmentParams['name'] } } |
 *   { type: 'addCategory'; payload: { value: string } } |
 *   { type: 'removeCategory'; payload: { value: string } }
 * )} Action
 * @description Tipos de acciones que puede manejar el reducer del formulario de `Shipment`.
 */
export type Action =
	| { type: 'init'; payload: { formData: DefaultShipment } }
	| { type: 'reset'; payload: { formData: DefaultShipment } }
	| { type: 'origin'; payload: { value: DefaultShipment['origin'] } }
	| { type: 'destination'; payload: { value: DefaultShipment['destination'] } }
	| { type: 'shipmentDate'; payload: { value: DefaultShipment['shipmentDate'] } }
	| { type: 'deliveryDate'; payload: { value: DefaultShipment['deliveryDate'] } }
	| { type: 'sentBy'; payload: { value: DefaultShipment['sentBy'] } }
	| { type: 'receivedBy'; payload: { value: DefaultShipment['receivedBy'] } }
	| { type: 'trackingNumber'; payload: { value: DefaultShipment['trackingNumber'] } }
	| { type: 'observation'; payload: { value: DefaultShipment['observation'] } }
	| { type: 'status'; payload: { value: DefaultShipment['status'] } }
	| { type: 'reason'; payload: { value: DefaultShipment['reason'] } }
	| { type: 'addDevice'; payload: { value: string } }
	| { type: 'removeDevice'; payload: { value: string } }

/**
 * `ShipmentFormReducer`
 * @function
 * @description Reducer para gestionar el estado del formulario de `Shipment`.
 * Maneja diferentes acciones para inicializar, resetear, actualizar campos y gestionar categorías.
 * @param {State} state - El estado actual del reducer.
 * @param {Action} action - La acción a despachar.
 * @returns {State} El nuevo estado después de aplicar la acción.
 */
export const ShipmentFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init':
		case 'reset': {
			const isFinalized =
				action.payload.formData.status === StatusEnum.CANCELLED ||
				action.payload.formData.status === StatusEnum.DELIVERED
			return {
				...state,
				formData: { ...action.payload.formData },
				errors: { ...initialShipmentState.errors },
				required: {
					...initialShipmentState.required,
					observation: action.payload.formData.deviceIds.length === 0
				},
				disabled: {
					...initialShipmentState.disabled,
					status: isFinalized,
					reason: isFinalized,
					origin: isFinalized,
					destination: isFinalized,
					sentBy: isFinalized,
					receivedBy: isFinalized,
					shipmentDate: isFinalized,
					deliveryDate: isFinalized,
					trackingNumber: isFinalized,
					observation: isFinalized
				}
			}
		}
		case 'origin': {
			const origin = action.payload.value
			return {
				...state,
				formData: { ...state.formData, origin }
			}
		}
		case 'destination': {
			const destination = action.payload.value
			return {
				...state,
				formData: { ...state.formData, destination }
			}
		}
		case 'shipmentDate': {
			const shipmentDate = action.payload.value
			return {
				...state,
				formData: { ...state.formData, shipmentDate }
			}
		}
		case 'deliveryDate': {
			const deliveryDate = action.payload.value
			return {
				...state,
				formData: { ...state.formData, deliveryDate }
			}
		}
		case 'sentBy': {
			const sentBy = action.payload.value
			return {
				...state,
				formData: { ...state.formData, sentBy }
			}
		}
		case 'receivedBy': {
			const receivedBy = action.payload.value
			return {
				...state,
				formData: { ...state.formData, receivedBy }
			}
		}
		case 'trackingNumber': {
			const trackingNumber = action.payload.value
			return {
				...state,
				formData: { ...state.formData, trackingNumber }
			}
		}
		case 'observation': {
			const observation = action.payload.value
			return {
				...state,
				formData: { ...state.formData, observation }
			}
		}
		case 'status': {
			const status = action.payload.value
			const deliveryDate =
				status === StatusEnum.DELIVERED ? convetDateForInputs(new Date()) : ''
			return {
				...state,
				formData: {
					...state.formData,
					status,
					deliveryDate
				},
				required: {
					...state.required,
					receivedBy: status === StatusEnum.DELIVERED
				}
			}
		}
		case 'reason': {
			const reason = action.payload.value
			return {
				...state,
				formData: { ...state.formData, reason }
			}
		}
		case 'addDevice': {
			const deviceIds = [...state.formData.deviceIds, action.payload.value]

			return {
				...state,
				formData: {
					...state.formData,
					deviceIds
				},
				required: {
					...state.required,
					observation: deviceIds.length === 0
				}
			}
		}
		case 'removeDevice': {
			const deviceIds = state.formData.deviceIds.filter(
				device => device !== action.payload.value
			)

			return {
				...state,
				formData: {
					...state.formData,
					deviceIds
				},
				required: {
					...state.required,
					observation: deviceIds.length === 0
				}
			}
		}
		default:
			return state
	}
}

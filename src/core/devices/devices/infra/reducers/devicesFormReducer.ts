import { type ModelComputerDto } from '@/core/model/models/domain/dto/ModelComputer.dto'
import { type DeviceDto } from '../../domain/dto/Device.dto'
import { type DeviceComputerDto } from '../../domain/dto/DeviceComputer.dto'
import { type DeviceHardDriveDto } from '../../domain/dto/DeviceHardDrive.dto'
import { type DeviceMFPDto } from '../../domain/dto/DeviceMFPParams'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { MemoryRam } from '../../domain/value-object/MemoryRam'
import { updateValidation } from './errorManagement'

export interface DefaultDevice {
	id?: DeviceDto['id']
	statusId: DeviceDto['statusId']
	mainCategoryId: DeviceDto['category']['mainCategoryId']
	categoryId: DeviceDto['categoryId']
	serial: DeviceDto['serial']
	activo: DeviceDto['activo']
	brandId: DeviceDto['brandId']
	modelId: DeviceDto['modelId']
	genericModel?: DeviceDto['model']['generic']
	employeeId: DeviceDto['employeeId']
	locationId: DeviceDto['locationId']
	typeOfSiteId: DeviceDto['location']['typeOfSiteId']
	observation: DeviceDto['observation']
	stockNumber: DeviceDto['stockNumber']
	computerName: DeviceComputerDto['computerName']
	processorId: DeviceComputerDto['processorId']
	memoryRamCapacity: DeviceComputerDto['memoryRamCapacity']
	hardDriveCapacityId?:
		| DeviceComputerDto['hardDriveCapacityId']
		| DeviceHardDriveDto['hardDriveCapacityId']
	hardDriveTypeId: DeviceComputerDto['hardDriveTypeId'] | DeviceHardDriveDto['hardDriveTypeId']
	operatingSystemArqId: DeviceComputerDto['operatingSystemArqId']
	operatingSystemId: DeviceComputerDto['operatingSystemId']
	ipAddress: DeviceComputerDto['ipAddress'] | DeviceMFPDto['ipAddress']
	macAddress: DeviceComputerDto['macAddress']
	health: DeviceHardDriveDto['health']
	memoryRam: DeviceComputerDto['memoryRam']
	memoryRamSlotQuantity?: ModelComputerDto['memoryRamSlotQuantity']
	memoryRamType: ModelComputerDto['memoryRamTypeId']
	history: DeviceDto['history']
	updatedAt?: DeviceDto['updatedAt']
}

export interface DevicesErrors {
	statusId: string
	categoryId: string
	mainCategoryId: string
	brandId: string
	modelId: string
	serial: string
	activo: string
	employeeId: string
	locationId: string
	stockNumber: string
	observation: string
	computerName: string
	processorId: string
	memoryRamCapacity: string
	memoryRam: string
	hardDriveCapacityId: string
	hardDriveTypeId: string
	operatingSystemArqId: string
	operatingSystemId: string
	ipAddress: string
	macAddress: string
	health: string
}

export interface DevicesDisabled {
	statusId: boolean
	mainCategoryId: boolean
	categoryId: boolean
	brandId: boolean
	modelId: boolean
	serial: boolean
	activo: boolean
	employeeId: boolean
	locationId: boolean
	stockNumber: boolean
	observation: boolean
	computerName: boolean
	processorId: boolean
	memoryRamCapacity: boolean
	memoryRam: boolean
	hardDriveCapacityId: boolean
	hardDriveTypeId: boolean
	operatingSystemArqId: boolean
	operatingSystemId: boolean
	ipAddress: boolean
	macAddress: boolean
	health: boolean
}

export interface DeviceRequired {
	statusId: boolean
	mainCategoryId: boolean
	categoryId: boolean
	brandId: boolean
	modelId: boolean
	serial: boolean
	activo: boolean
	employeeId: boolean
	locationId: boolean
	stockNumber: boolean
	observation: boolean
	computerName: boolean
	processorId: boolean
	memoryRamCapacity: boolean
	memoryRam: boolean
	hardDriveCapacityId: boolean
	hardDriveTypeId: boolean
	operatingSystemArqId: boolean
	operatingSystemId: boolean
	ipAddress: boolean
	macAddress: boolean
	health: boolean
}

export interface State {
	formData: DefaultDevice
	errors: DevicesErrors
	disabled: DevicesDisabled
	required: DeviceRequired
}

export const initialDeviceState: State = {
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
		statusId: '',
		mainCategoryId: '',
		categoryId: '',
		brandId: '',
		modelId: '',
		serial: '',
		activo: '',
		employeeId: '',
		locationId: '',
		stockNumber: '',
		observation: '',
		computerName: '',
		processorId: '',
		memoryRamCapacity: '',
		memoryRam: '',
		hardDriveCapacityId: '',
		hardDriveTypeId: '',
		operatingSystemArqId: '',
		operatingSystemId: '',
		ipAddress: '',
		macAddress: '',
		health: ''
	},
	disabled: {
		statusId: false,
		mainCategoryId: false,
		categoryId: false,
		brandId: true,
		modelId: true,
		serial: false,
		activo: false,
		employeeId: true,
		locationId: true,
		stockNumber: true,
		observation: false,
		computerName: true,
		processorId: false,
		memoryRamCapacity: false,
		memoryRam: false,
		hardDriveCapacityId: false,
		hardDriveTypeId: false,
		operatingSystemArqId: false,
		operatingSystemId: false,
		ipAddress: false,
		macAddress: false,
		health: false
	},
	required: {
		statusId: true,
		mainCategoryId: true,
		categoryId: true,
		brandId: true,
		modelId: true,
		serial: true,
		activo: false,
		employeeId: false,
		locationId: false,
		stockNumber: false,
		observation: false,
		computerName: false,
		processorId: false,
		memoryRamCapacity: false,
		memoryRam: false,
		hardDriveCapacityId: false,
		hardDriveTypeId: false,
		operatingSystemArqId: false,
		operatingSystemId: false,
		ipAddress: false,
		macAddress: false,
		health: true
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultDevice } }
	| { type: 'reset'; payload: { formData: DefaultDevice } }
	| { type: 'statusId'; payload: { value: string } }
	| { type: 'mainCategoryId'; payload: { value: string } }
	| { type: 'categoryId'; payload: { value: string } }
	| { type: 'brandId'; payload: { value: string } }
	| {
			type: 'modelId'
			payload: {
				value: string
				memoryRamSlotQuantity?: number
				memoryRamType?: string
				generic?: boolean
			}
	  }
	| { type: 'serial'; payload: { value: string } }
	| { type: 'activo'; payload: { value: string } }
	| { type: 'employeeId'; payload: { value: string } }
	| {
			type: 'locationId'
			payload: { value: string; typeOfSiteId?: string; ipAddress?: string | null }
	  }
	| { type: 'stockNumber'; payload: { value: string } }
	| { type: 'observation'; payload: { value: string } }
	| { type: 'computerName'; payload: { value: string } }
	| { type: 'processorId'; payload: { value: string } }
	| { type: 'memoryRam'; payload: { value: string; index: number } }
	| { type: 'hardDriveCapacityId'; payload: { value: string } }
	| { type: 'hardDriveTypeId'; payload: { value: string } }
	| { type: 'operatingSystemArqId'; payload: { value: string } }
	| { type: 'operatingSystemId'; payload: { value: string } }
	| { type: 'ipAddress'; payload: { value: string } }
	| { type: 'macAddress'; payload: { value: string } }
	| { type: 'health'; payload: { value: number } }

const updateFormData = <T extends keyof DefaultDevice>(
	state: State,
	field: T,
	value: DefaultDevice[T],
	additionalUpdates?: Partial<DefaultDevice>
): State => ({
	...state,
	formData: {
		...state.formData,
		[field]: value,
		...additionalUpdates
	}
})

const updateAndValidate = <T extends keyof DefaultDevice>(
	state: State,
	field: T,
	value: DefaultDevice[T],
	additionalUpdates?: Partial<DefaultDevice>
): State => {
	const updateState = updateFormData(state, field, value, additionalUpdates)
	return updateValidation(updateState)
}
export const devicesFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init':
		case 'reset':
			return updateValidation({
				...state,
				formData: { ...action.payload.formData }
			})
		case 'statusId': {
			const { value } = action.payload

			switch (value) {
				case StatusOptions.INALMACEN:
				case StatusOptions.PORDESINCORPORAR:
				case StatusOptions.DESINCORPORADO:
					return updateAndValidate(state, 'statusId', value, {
						employeeId: '',
						locationId: '',
						computerName: '',
						operatingSystemId: '',
						operatingSystemArqId: '',
						ipAddress: ''
					})
				case StatusOptions.DISPONIBLE:
					return updateAndValidate(state, 'statusId', value, {
						employeeId: '',
						stockNumber: ''
					})
				default:
					return updateAndValidate(state, 'statusId', value, { stockNumber: '' })
			}
		}

		case 'categoryId':
			return updateAndValidate(state, 'categoryId', action.payload.value, {
				brandId: '',
				modelId: '',
				computerName: '',
				processorId: '',
				memoryRamSlotQuantity: undefined,
				memoryRamType: '',
				memoryRamCapacity: 0,
				memoryRam: [],
				hardDriveCapacityId: '',
				hardDriveTypeId: '',
				operatingSystemArqId: '',
				operatingSystemId: '',
				ipAddress: '',
				macAddress: '',
				health: 100
			})

		case 'mainCategoryId':
			return updateAndValidate(state, 'mainCategoryId', action.payload.value, {
				categoryId: '',
				brandId: '',
				modelId: '',
				computerName: '',
				processorId: '',
				memoryRamSlotQuantity: undefined,
				memoryRamType: '',
				memoryRamCapacity: 0,
				memoryRam: [],
				hardDriveCapacityId: '',
				hardDriveTypeId: '',
				operatingSystemArqId: '',
				operatingSystemId: '',
				ipAddress: '',
				macAddress: '',
				health: 100
			})

		case 'brandId':
			return updateAndValidate(state, 'brandId', action.payload.value, {
				modelId: '',
				memoryRamSlotQuantity: undefined,
				memoryRamType: '',
				memoryRamCapacity: 0,
				memoryRam: []
			})

		case 'modelId': {
			const { value, memoryRamSlotQuantity, memoryRamType, generic } = action.payload
			const memoryRam =
				state.formData.memoryRam?.length === memoryRamSlotQuantity
					? state.formData.memoryRam
					: new Array(memoryRamSlotQuantity).fill(0)

			return updateAndValidate(state, 'modelId', value, {
				memoryRamSlotQuantity,
				memoryRamType,
				memoryRam,
				genericModel: generic
			})
		}
		case 'memoryRam': {
			const { value, index } = action.payload
			const memoryRam = [...state.formData.memoryRam]
			const parsedValue = parseFloat(value)
			memoryRam[index] = isNaN(parsedValue) ? 0 : parsedValue

			return updateAndValidate(state, 'memoryRam', memoryRam, {
				memoryRamCapacity: MemoryRam.totalAmount(memoryRam)
			})
		}
		case 'locationId': {
			const { value, typeOfSiteId, ipAddress } = action.payload
			const newIpAddress = ipAddress
				? ipAddress.split('.').slice(0, -1).join('.') + '.'
				: state.formData.ipAddress

			return updateAndValidate(state, 'locationId', value, {
				typeOfSiteId,
				stockNumber: '',
				ipAddress: newIpAddress
			})
		}
		case 'hardDriveCapacityId': {
			const { value } = action.payload
			const additionalUpdates = value
				? {}
				: {
						hardDriveTypeId: '',
						operatingSystemId: '',
						operatingSystemArqId: ''
				  }
			return updateAndValidate(state, 'hardDriveCapacityId', value, additionalUpdates)
		}
		case 'operatingSystemId': {
			const { value } = action.payload
			const additionalUpdates = value ? {} : { operatingSystemArqId: '' }

			return updateAndValidate(state, 'operatingSystemId', value, additionalUpdates)
		}
		case 'serial': {
			const { value } = action.payload

			return updateAndValidate(state, 'serial', value.trim().toUpperCase())
		}
		case 'activo': {
			const { value } = action.payload
			return updateAndValidate(state, 'activo', value)
		}
		case 'employeeId': {
			const { value } = action.payload
			return updateAndValidate(state, 'employeeId', value)
		}
		case 'stockNumber': {
			const { value } = action.payload
			return updateAndValidate(state, 'stockNumber', value)
		}
		case 'observation': {
			const { value } = action.payload
			return updateAndValidate(state, 'observation', value)
		}
		case 'computerName': {
			const { value } = action.payload
			return updateAndValidate(state, 'computerName', value)
		}
		case 'processorId': {
			const { value } = action.payload
			value.toUpperCase().trim()
			return updateAndValidate(state, 'processorId', value)
		}
		case 'hardDriveTypeId': {
			const { value } = action.payload
			return updateAndValidate(state, 'hardDriveTypeId', value)
		}
		case 'operatingSystemArqId': {
			const { value } = action.payload
			return updateAndValidate(state, 'operatingSystemArqId', value)
		}
		case 'ipAddress': {
			const { value } = action.payload
			return updateAndValidate(state, 'ipAddress', value)
		}
		case 'macAddress': {
			const { value } = action.payload
			return updateAndValidate(state, 'macAddress', value)
		}
		case 'health': {
			const { value } = action.payload
			return updateAndValidate(state, 'health', value)
		}
		// ... (Other cases: serial, activo, employeeId, stockNumber, observation, computerName, processorId, hardDriveTypeId, operatingSystemArqId, ipAddress, macAddress, health) - all similar to the simpler cases above.  Use updateFormData()
		default:
			return state
	}
}

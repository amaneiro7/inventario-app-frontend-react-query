import { ModelComputerDto } from '@/core/model/models/domain/dto/ModelComputer.dto'
import { DeviceDto } from '../../domain/dto/Device.dto'
import { DeviceComputerDto } from '../../domain/dto/DeviceComputer.dto'
import { DeviceHardDriveDto } from '../../domain/dto/DeviceHardDrive.dto'

export interface DefaultDevice {
	id?: DeviceDto['id']
	serial: DeviceDto['serial']
	activo: DeviceDto['activo']
	statusId: DeviceDto['statusId']
	modelId: DeviceDto['modelId']
	genericModel?: DeviceDto['model']['generic']
	categoryId: DeviceDto['categoryId']
	mainCategoryId: DeviceDto['category']['mainCategoryId']
	brandId: DeviceDto['brandId']
	employeeId: DeviceDto['employeeId']
	locationId: DeviceDto['locationId']
	typeOfSiteId: DeviceDto['location']['typeOfSiteId']
	observation: DeviceDto['observation']
	stockNumber: DeviceDto['stockNumber']
	computerName?: DeviceComputerDto['computerName']
	processorId?: DeviceComputerDto['processorId']
	memoryRamCapacity?: DeviceComputerDto['memoryRamCapacity']
	hardDriveCapacityId?: DeviceComputerDto['hardDriveCapacityId']
	hardDriveTypeId?: DeviceComputerDto['hardDriveTypeId']
	operatingSystemArqId?: DeviceComputerDto['operatingSystemArqId']
	operatingSystemId?: DeviceComputerDto['operatingSystemId']
	ipAddress?: DeviceComputerDto['ipAddress']
	macAddress?: DeviceComputerDto['macAddress']
	health?: DeviceHardDriveDto['health']
	memoryRam?: DeviceComputerDto['memoryRam']
	memoryRamSlotQuantity?: ModelComputerDto['memoryRamSlotQuantity']
	memoryRamType?: ModelComputerDto['memoryRamTypeId']
	history: DeviceDto['history'][]
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
				memoryRamSlotQuantity: number
				memoryRamType: string
				generic?: boolean
			}
	  }
	| { type: 'serial'; payload: { value: string } }
	| { type: 'activo'; payload: { value: string } }
	| { type: 'employeeId'; payload: { value: string } }
	| {
			type: 'locationId'
			payload: { value: string; typeOfSiteId: string; ipAddress?: string }
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

export const devicesFormReducer = (state: State, action: Action): State => {
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

		default:
			return state
	}
}

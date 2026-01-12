import { type ModelComputerDto } from '@/entities/model/models/domain/dto/ModelComputer.dto'
import { type DeviceDto } from '../../domain/dto/Device.dto'
import { type DeviceComputerDto } from '../../domain/dto/DeviceComputer.dto'
import { type DeviceHardDriveDto } from '../../domain/dto/DeviceHardDrive.dto'
import { type DevicePrinterDto } from '../../domain/dto/DevicePrinterParams'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { MemoryRam } from '../../domain/value-object/MemoryRam'
import { DeviceLocation } from '../../domain/value-object/DeviceLocation'
import { DeviceStockNumber } from '../../domain/value-object/DeviceStockNumber'
import { IPAddress } from '../../domain/value-object/IPAddress'
import { ComputerHDDCapacity } from '../../domain/value-object/ComputerHDDCapacity'
import { ComputerHDDType } from '../../domain/value-object/ComputerHDDType'
import { ComputerOs } from '../../domain/value-object/ComputerOS'
import { ComputerOsArq } from '../../domain/value-object/ComputerOSArq'
import { DeviceSerial } from '../../domain/value-object/DeviceSerial'
import { DeviceActivo } from '../../domain/value-object/DeviceActivo'
import { DeviceEmployee } from '../../domain/value-object/DeviceEmployee'
import { ComputerName } from '../../domain/value-object/ComputerName'
import { ComputerProcessor } from '../../domain/value-object/ComputerProcessor'
import { MACAddress } from '../../domain/value-object/MACAddress'
import { HardDriveHealth } from '../../domain/value-object/HardDriveHealth'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { IPAddressMFP } from '../../domain/value-object/IPAddressMFP'

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
	ipAddress: DeviceComputerDto['ipAddress'] | DevicePrinterDto['ipAddress']
	macAddress: DeviceComputerDto['macAddress']
	health: DeviceHardDriveDto['health']
	memoryRam: DeviceComputerDto['memoryRam']
	memoryRamSlotQuantity?: ModelComputerDto['memoryRamSlotQuantity']
	memoryRamType: ModelComputerDto['memoryRamTypeId']
	history: DeviceDto['history']
	updatedAt?: DeviceDto['updatedAt']
}

export interface DevicesErrors extends Record<string, string> {
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

export interface DevicesDisabled extends Record<string, boolean> {
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

export interface DeviceRequired extends Record<string, boolean> {
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

export const devicesFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'init':
		case 'reset': {
			const status = action.payload.formData.statusId
			return {
				...state,
				formData: {
					...action.payload.formData
				},
				errors: {
					...initialDeviceState.errors
				},
				required: {
					...state.required,
					serial: !action.payload.formData.genericModel,
					employeeId:
						status === StatusOptions.PRESTAMO ||
						status === StatusOptions.CONTINGENCIA ||
						status === StatusOptions.GUARDIA,
					locationId: status !== StatusOptions.DESINCORPORADO,
					computerName: !(
						status === StatusOptions.INALMACEN ||
						status === StatusOptions.PORDESINCORPORAR ||
						status === StatusOptions.DESINCORPORADO
					),
					ipAddress: status === StatusOptions.INUSE,
					memoryRamCapacity:
						status === StatusOptions.INUSE ||
						status === StatusOptions.PRESTAMO ||
						status === StatusOptions.CONTINGENCIA ||
						status === StatusOptions.GUARDIA,
					processorId:
						status === StatusOptions.INUSE ||
						status === StatusOptions.INALMACEN ||
						status === StatusOptions.PRESTAMO ||
						status === StatusOptions.GUARDIA ||
						status === StatusOptions.CONTINGENCIA,
					hardDriveCapacityId:
						status === StatusOptions.INUSE ||
						status === StatusOptions.PRESTAMO ||
						status === StatusOptions.CONTINGENCIA ||
						status === StatusOptions.GUARDIA,
					hardDriveTypeId: !!action.payload.formData.hardDriveCapacityId,
					operatingSystemId:
						status === StatusOptions.INUSE ||
						status === StatusOptions.PRESTAMO ||
						status === StatusOptions.CONTINGENCIA ||
						status === StatusOptions.GUARDIA,
					operatingSystemArqId: !!action.payload.formData.operatingSystemId
				},
				disabled: {
					...state.disabled,
					categoryId: !action.payload.formData.mainCategoryId,
					brandId: !action.payload.formData.categoryId,
					modelId: !action.payload.formData.brandId,
					locationId: !status || status === StatusOptions.DESINCORPORADO,
					stockNumber:
						!status ||
						!(
							status === StatusOptions.INALMACEN ||
							status === StatusOptions.PORDESINCORPORAR
						),
					employeeId:
						!status ||
						status === StatusOptions.INALMACEN ||
						status === StatusOptions.PORDESINCORPORAR ||
						status === StatusOptions.DESINCORPORADO ||
						status === StatusOptions.JORNADA ||
						status === StatusOptions.DISPONIBLE,

					computerName:
						status === StatusOptions.INALMACEN ||
						status === StatusOptions.PORDESINCORPORAR ||
						status === StatusOptions.DESINCORPORADO,
					ipAddress:
						status === StatusOptions.INALMACEN ||
						status === StatusOptions.PORDESINCORPORAR ||
						status === StatusOptions.DESINCORPORADO,
					hardDriveTypeId: !action.payload.formData.hardDriveCapacityId,
					operatingSystemId:
						status === StatusOptions.INALMACEN ||
						status === StatusOptions.PORDESINCORPORAR ||
						status === StatusOptions.DESINCORPORADO ||
						!action.payload.formData.hardDriveCapacityId,
					operatingSystemArqId: !action.payload.formData.operatingSystemId
				}
			}
		}
		case 'statusId': {
			const statusId = action.payload.value
			const employeeId =
				statusId === StatusOptions.INALMACEN ||
				statusId === StatusOptions.PORDESINCORPORAR ||
				statusId === StatusOptions.DESINCORPORADO ||
				statusId === StatusOptions.JORNADA ||
				statusId === StatusOptions.DISPONIBLE
					? ''
					: state.formData.employeeId
			const locationId =
				statusId === StatusOptions.INALMACEN ||
				statusId === StatusOptions.PORDESINCORPORAR ||
				statusId === StatusOptions.DESINCORPORADO
					? ''
					: state.formData.locationId
			const computerName =
				statusId === StatusOptions.INALMACEN ||
				statusId === StatusOptions.PORDESINCORPORAR ||
				statusId === StatusOptions.DESINCORPORADO
					? ''
					: state.formData.computerName
			const operatingSystemId =
				statusId === StatusOptions.INALMACEN ||
				statusId === StatusOptions.PORDESINCORPORAR ||
				statusId === StatusOptions.DESINCORPORADO
					? ''
					: state.formData.operatingSystemId
			const operatingSystemArqId =
				statusId === StatusOptions.INALMACEN ||
				statusId === StatusOptions.PORDESINCORPORAR ||
				statusId === StatusOptions.DESINCORPORADO
					? ''
					: state.formData.operatingSystemArqId
			const ipAddress =
				statusId === StatusOptions.INALMACEN ||
				statusId === StatusOptions.PORDESINCORPORAR ||
				statusId === StatusOptions.JORNADA ||
				statusId === StatusOptions.DESINCORPORADO
					? ''
					: state.formData.ipAddress
			const stockNumber = ''

			const additionalErrors = updateAddionalErrors({
				state,
				categoryId: state.formData.categoryId,
				mainCategoryId: state.formData.mainCategoryId,
				computerName,
				operatingSystemId,
				operatingSystemArqId,
				ipAddress,
				statusId
			})

			return {
				...state,
				formData: {
					...state.formData,
					statusId,
					employeeId,
					locationId,
					computerName,
					operatingSystemId,
					operatingSystemArqId,
					ipAddress,
					stockNumber
				},
				disabled: {
					...state.disabled,
					locationId: !statusId || statusId === StatusOptions.DESINCORPORADO,
					stockNumber:
						!statusId ||
						!(
							statusId === StatusOptions.INALMACEN ||
							statusId === StatusOptions.PORDESINCORPORAR
						),
					employeeId:
						!statusId ||
						statusId === StatusOptions.INALMACEN ||
						statusId === StatusOptions.PORDESINCORPORAR ||
						statusId === StatusOptions.DESINCORPORADO ||
						statusId === StatusOptions.JORNADA ||
						statusId === StatusOptions.DISPONIBLE,

					computerName:
						statusId === StatusOptions.INALMACEN ||
						statusId === StatusOptions.PORDESINCORPORAR ||
						statusId === StatusOptions.DESINCORPORADO,
					ipAddress:
						statusId === StatusOptions.INALMACEN ||
						statusId === StatusOptions.PORDESINCORPORAR ||
						statusId === StatusOptions.JORNADA ||
						statusId === StatusOptions.DESINCORPORADO,
					operatingSystemId:
						statusId === StatusOptions.INALMACEN ||
						statusId === StatusOptions.PORDESINCORPORAR ||
						statusId === StatusOptions.DESINCORPORADO ||
						!state.formData.hardDriveCapacityId,
					operatingSystemArqId: !operatingSystemId
				},
				required: {
					...state.required,
					employeeId:
						statusId === StatusOptions.PRESTAMO ||
						statusId === StatusOptions.CONTINGENCIA ||
						statusId === StatusOptions.GUARDIA,
					locationId: statusId !== StatusOptions.DESINCORPORADO,
					computerName: !(
						statusId === StatusOptions.INALMACEN ||
						statusId === StatusOptions.PORDESINCORPORAR ||
						statusId === StatusOptions.DESINCORPORADO
					),
					ipAddress: statusId === StatusOptions.INUSE,
					memoryRamCapacity:
						statusId === StatusOptions.INUSE ||
						statusId === StatusOptions.PRESTAMO ||
						statusId === StatusOptions.CONTINGENCIA ||
						statusId === StatusOptions.JORNADA ||
						statusId === StatusOptions.GUARDIA,
					processorId:
						statusId === StatusOptions.INUSE ||
						statusId === StatusOptions.INALMACEN ||
						statusId === StatusOptions.PRESTAMO ||
						statusId === StatusOptions.JORNADA ||
						statusId === StatusOptions.GUARDIA ||
						statusId === StatusOptions.CONTINGENCIA,
					hardDriveCapacityId:
						statusId === StatusOptions.INUSE ||
						statusId === StatusOptions.PRESTAMO ||
						statusId === StatusOptions.JORNADA ||
						statusId === StatusOptions.CONTINGENCIA ||
						statusId === StatusOptions.GUARDIA,
					operatingSystemId:
						statusId === StatusOptions.INUSE ||
						statusId === StatusOptions.PRESTAMO ||
						statusId === StatusOptions.JORNADA ||
						statusId === StatusOptions.CONTINGENCIA ||
						statusId === StatusOptions.GUARDIA,
					operatingSystemArqId: Boolean(operatingSystemId)
				},
				errors: {
					...state.errors,
					...additionalErrors,
					locationId: DeviceLocation.isValid({
						typeOfSite: state.formData.typeOfSiteId,
						status: statusId
					})
						? ''
						: DeviceLocation.invalidMessage(),
					employeeId: DeviceEmployee.isValid({
						value: employeeId,
						status: statusId
					})
						? ''
						: DeviceEmployee.invalidMessage(),
					stockNumber: DeviceStockNumber.isValid({
						value: stockNumber,
						status: statusId
					})
						? ''
						: DeviceStockNumber.invalidMessage()
				}
			}
		}

		case 'categoryId': {
			const categoryId = action.payload.value
			const additionalErrors = updateAddionalErrors({
				state,
				categoryId,
				mainCategoryId: state.formData.mainCategoryId,
				computerName: state.formData.computerName,
				operatingSystemId: state.formData.operatingSystemId,
				operatingSystemArqId: state.formData.operatingSystemArqId,
				ipAddress: state.formData.ipAddress,
				statusId: state.formData.statusId
			})
			return {
				...state,
				formData: {
					...state.formData,
					categoryId,
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
				},
				disabled: {
					...state.disabled,
					brandId: !categoryId
				},
				errors: {
					...state.errors,
					...additionalErrors
				}
			}
		}
		case 'mainCategoryId': {
			const mainCategoryId = action.payload.value
			const additionalErrors = updateAddionalErrors({
				state,
				mainCategoryId,
				categoryId: state.formData.categoryId,
				computerName: state.formData.computerName,
				operatingSystemId: state.formData.operatingSystemId,
				operatingSystemArqId: state.formData.operatingSystemArqId,
				ipAddress: state.formData.ipAddress,
				statusId: state.formData.statusId
			})
			return {
				...state,
				formData: {
					...state.formData,
					mainCategoryId,
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
				},
				disabled: {
					...state.disabled,
					categoryId: !mainCategoryId
				},
				errors: {
					...state.errors,
					...additionalErrors
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
					modelId: '',
					memoryRamSlotQuantity: undefined,
					memoryRamType: '',
					memoryRamCapacity: 0,
					memoryRam: []
				},
				disabled: {
					...state.disabled,
					modelId: !brandId
				}
			}
		}
		case 'modelId': {
			const { value: modelId, memoryRamSlotQuantity, memoryRamType, generic } = action.payload
			const memoryRam =
				state.formData.memoryRam?.length === memoryRamSlotQuantity
					? state.formData.memoryRam
					: new Array(memoryRamSlotQuantity).fill(0)

			return {
				...state,
				formData: {
					...state.formData,
					modelId,
					memoryRamSlotQuantity,
					memoryRamType: memoryRamType ?? '',
					memoryRam,
					genericModel: generic
				},
				required: {
					...state.required,
					serial: !generic
				}
			}
		}
		case 'memoryRam': {
			const { value, index } = action.payload
			const memoryRam = [...state.formData.memoryRam]
			const parsedValue = parseFloat(value)
			memoryRam[index] = isNaN(parsedValue) ? 0 : parsedValue
			return {
				...state,
				formData: {
					...state.formData,
					memoryRam,
					memoryRamCapacity: MemoryRam.totalAmount(memoryRam)
				},
				errors: {
					...state.errors,
					memoryRamCapacity: MemoryRam.isValid({
						value: memoryRam,
						status: state.formData.statusId
					})
						? ''
						: MemoryRam.invalidMessage()
				}
			}
		}
		case 'locationId': {
			const { value: locationId, typeOfSiteId, ipAddress } = action.payload
			const isComputer = state.formData.mainCategoryId === MainCategoryOptions.COMPUTER
			const isMFP = state.formData.categoryId === CategoryOptions.MFP
			const newIpAddress = ipAddress ? ipAddress.split('.').slice(0, -1).join('.') + '.' : ''
			const oldIpAddress = state.formData.ipAddress
				? state.formData.ipAddress.split('.').slice(0, -1).join('.') + '.'
				: ''
			const ipAddressValue =
				newIpAddress === oldIpAddress ? state.formData.ipAddress : newIpAddress
			return {
				...state,
				formData: {
					...state.formData,
					locationId,
					typeOfSiteId: typeOfSiteId ?? '',
					stockNumber: '',
					ipAddress: ipAddressValue
				},
				errors: {
					...state.errors,
					locationId: DeviceLocation.isValid({
						typeOfSite: typeOfSiteId,
						status: state.formData.statusId
					})
						? ''
						: DeviceLocation.invalidMessage(),
					ipAddress:
						isComputer &&
						!IPAddress.isValid({
							value: ipAddressValue,
							status: state.formData.statusId
						})
							? IPAddress.invalidMessage()
							: isMFP && !IPAddressMFP.isValid(ipAddressValue)
								? IPAddressMFP.invalidMessage()
								: ''
				}
			}
		}
		case 'hardDriveCapacityId': {
			const hardDriveCapacityId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					hardDriveCapacityId,
					hardDriveTypeId: !hardDriveCapacityId ? '' : state.formData.hardDriveTypeId,
					operatingSystemId: !hardDriveCapacityId ? '' : state.formData.operatingSystemId,
					operatingSystemArqId: !hardDriveCapacityId
						? ''
						: state.formData.operatingSystemArqId
				},
				required: {
					...state.required,
					hardDriveTypeId: Boolean(hardDriveCapacityId)
				},
				disabled: {
					...state.disabled,
					hardDriveTypeId: !hardDriveCapacityId,
					operatingSystemId:
						state.formData.statusId === StatusOptions.INALMACEN ||
						state.formData.statusId === StatusOptions.PORDESINCORPORAR ||
						state.formData.statusId === StatusOptions.DESINCORPORADO ||
						!hardDriveCapacityId
				},
				errors: {
					...state.errors,
					hardDriveCapacityId: ComputerHDDCapacity.isValid({
						value: hardDriveCapacityId,
						status: state.formData.statusId
					})
						? ''
						: ComputerHDDCapacity.invalidMessage(),
					hardDriveTypeId: ComputerHDDType.isValid({
						value: !hardDriveCapacityId ? '' : state.formData.hardDriveTypeId,
						hardDriveCapacity: hardDriveCapacityId
					})
						? ''
						: ComputerHDDType.invalidMessage(),
					operatingSystemId: ComputerOs.isValid({
						value: !hardDriveCapacityId ? '' : state.formData.operatingSystemId,
						status: state.formData.statusId,
						hardDriveCapacity: hardDriveCapacityId
					})
						? ''
						: ComputerOs.invalidMessage(),
					operatingSystemArqId: ComputerOsArq.isValid({
						value: !hardDriveCapacityId ? '' : state.formData.operatingSystemArqId,
						operatingSystem: !hardDriveCapacityId
							? ''
							: state.formData.operatingSystemId
					})
						? ''
						: ComputerOsArq.invalidMessage()
				}
			}
		}
		case 'operatingSystemId': {
			const operatingSystemId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					operatingSystemId,
					operatingSystemArqId: !operatingSystemId
						? ''
						: state.formData.operatingSystemArqId
				},
				disabled: {
					...state.disabled,
					operatingSystemArqId: !operatingSystemId
				},
				required: {
					...state.required,
					operatingSystemArqId: Boolean(operatingSystemId)
				},
				errors: {
					...state.errors,
					operatingSystemId: ComputerOs.isValid({
						value: operatingSystemId,
						status: state.formData.statusId,
						hardDriveCapacity: state.formData.hardDriveCapacityId
					})
						? ''
						: ComputerOs.invalidMessage(),
					operatingSystemArqId: ComputerOsArq.isValid({
						value: !operatingSystemId ? '' : state.formData.operatingSystemArqId,
						operatingSystem: operatingSystemId
					})
						? ''
						: ComputerOsArq.invalidMessage()
				}
			}
		}
		case 'serial': {
			const serial = action.payload.value.trim().toUpperCase()

			return {
				...state,
				formData: {
					...state.formData,
					serial
				},
				errors: {
					...state.errors,
					serial: DeviceSerial.isValid({
						serial,
						genericModel: state.formData.genericModel
					})
						? ''
						: DeviceSerial.invalidMessage()
				}
			}
		}
		case 'activo': {
			const activo = action.payload.value.trim().toUpperCase()

			return {
				...state,
				formData: {
					...state.formData,
					activo
				},
				errors: {
					...state.errors,
					activo: DeviceActivo.isValid({ value: activo })
						? ''
						: DeviceActivo.invalidMessage()
				}
			}
		}
		case 'employeeId': {
			const employeeId = action.payload.value

			return {
				...state,
				formData: {
					...state.formData,
					employeeId
				},
				errors: {
					...state.errors,
					employeeId: DeviceEmployee.isValid({
						value: employeeId,
						status: state.formData.statusId
					})
						? ''
						: DeviceEmployee.invalidMessage()
				}
			}
		}
		case 'stockNumber': {
			const stockNumber = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					stockNumber
				},
				errors: {
					...state.errors,
					stockNumber: DeviceStockNumber.isValid({
						value: stockNumber,
						status: state.formData.statusId
					})
						? ''
						: DeviceStockNumber.invalidMessage()
				}
			}
		}
		case 'observation': {
			const observation = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					observation
				}
			}
		}
		case 'computerName': {
			const computerName = action.payload.value.trim().toUpperCase()
			return {
				...state,
				formData: {
					...state.formData,
					computerName
				},
				errors: {
					...state.errors,
					computerName: ComputerName.isValid({
						value: computerName,
						status: state.formData.statusId
					})
						? ''
						: ComputerName.invalidMessage()
				}
			}
		}
		case 'processorId': {
			const processorId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					processorId
				},
				errors: {
					...state.errors,
					processorId: ComputerProcessor.isValid({
						value: processorId,
						status: state.formData.statusId
					})
						? ''
						: ComputerProcessor.invalidMessage()
				}
			}
		}
		case 'hardDriveTypeId': {
			const hardDriveTypeId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					hardDriveTypeId
				},
				errors: {
					...state.errors,
					hardDriveTypeId: ComputerHDDType.isValid({
						value: hardDriveTypeId,
						hardDriveCapacity: state.formData.hardDriveCapacityId
					})
						? ''
						: ComputerHDDType.invalidMessage()
				}
			}
		}
		case 'operatingSystemArqId': {
			const operatingSystemArqId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					operatingSystemArqId
				},
				errors: {
					...state.errors,
					operatingSystemArqId: ComputerOsArq.isValid({
						value: operatingSystemArqId,
						operatingSystem: state.formData.operatingSystemId
					})
						? ''
						: ComputerOsArq.invalidMessage()
				}
			}
		}
		case 'ipAddress': {
			const ipAddress = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					ipAddress
				},
				errors: {
					...state.errors,
					ipAddress: IPAddress.isValid({
						value: ipAddress,
						status: state.formData.statusId
					})
						? ''
						: IPAddress.invalidMessage()
				}
			}
		}
		case 'macAddress': {
			const macAddress = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					macAddress
				},
				errors: {
					...state.errors,
					macAddress: MACAddress.isValid({
						value: macAddress
					})
						? ''
						: MACAddress.invalidMessage(macAddress)
				}
			}
		}
		case 'health': {
			const health = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					health
				},
				errors: {
					...state.errors,
					health: HardDriveHealth.isValid({
						value: health
					})
						? ''
						: HardDriveHealth.invalidMessage()
				}
			}
		}

		default:
			return state
	}
}

const updateAddionalErrors = ({
	state,
	statusId,
	computerName,
	operatingSystemId,
	operatingSystemArqId,
	ipAddress,
	mainCategoryId,
	categoryId
}: {
	state: State
	statusId: DefaultDevice['statusId']
	categoryId: DefaultDevice['categoryId']
	mainCategoryId: DefaultDevice['mainCategoryId']
	computerName: DefaultDevice['computerName']
	operatingSystemId: DefaultDevice['operatingSystemId']
	operatingSystemArqId: DefaultDevice['operatingSystemArqId']
	ipAddress: DefaultDevice['ipAddress']
}) => {
	const isComputer = mainCategoryId === MainCategoryOptions.COMPUTER
	const isMFP = categoryId === CategoryOptions.MFP

	const additionalErrores: Pick<
		DevicesErrors,
		| 'computerName'
		| 'memoryRamCapacity'
		| 'processorId'
		| 'ipAddress'
		| 'operatingSystemId'
		| 'operatingSystemArqId'
		| 'hardDriveCapacityId'
	> = {
		computerName:
			isComputer &&
			!ComputerName.isValid({
				value: computerName,
				status: statusId
			})
				? ComputerName.invalidMessage()
				: '',
		memoryRamCapacity:
			isComputer &&
			!MemoryRam.isValid({
				value: state.formData.memoryRam,
				status: statusId
			})
				? MemoryRam.invalidMessage()
				: '',
		processorId:
			isComputer &&
			!ComputerProcessor.isValid({
				value: state.formData.processorId,
				status: statusId
			})
				? ComputerProcessor.invalidMessage()
				: '',
		hardDriveCapacityId:
			isComputer &&
			!ComputerHDDCapacity.isValid({
				value: state.formData.hardDriveCapacityId,
				status: statusId
			})
				? ComputerHDDCapacity.invalidMessage()
				: '',
		operatingSystemId:
			isComputer &&
			!ComputerOs.isValid({
				value: operatingSystemId,
				status: statusId,
				hardDriveCapacity: state.formData.hardDriveCapacityId
			})
				? ComputerOs.invalidMessage()
				: '',
		operatingSystemArqId:
			isComputer &&
			!ComputerOsArq.isValid({
				value: operatingSystemArqId,
				operatingSystem: operatingSystemId
			})
				? ComputerOsArq.invalidMessage()
				: '',
		ipAddress:
			isComputer &&
			!IPAddress.isValid({
				value: ipAddress,
				status: statusId
			})
				? IPAddress.invalidMessage()
				: isMFP && !IPAddressMFP.isValid(ipAddress)
					? IPAddressMFP.invalidMessage()
					: ''
	}

	return additionalErrores
}

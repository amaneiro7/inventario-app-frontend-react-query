import { StatusOptions } from '@/core/status/status/domain/entity/StatusOptions'
import { ComputerHDDCapacity } from '../../domain/value-object/ComputerHDDCapacity'
import { ComputerHDDType } from '../../domain/value-object/ComputerHDDType'
import { IPAddress } from '../../domain/value-object/ComputerIPAddress'
import { ComputerName } from '../../domain/value-object/ComputerName'
import { ComputerOs } from '../../domain/value-object/ComputerOS'
import { ComputerOsArq } from '../../domain/value-object/ComputerOSArq'
import { ComputerProcessor } from '../../domain/value-object/ComputerProcessor'
import { DeviceActivo } from '../../domain/value-object/DeviceActivo'
import { DeviceEmployee } from '../../domain/value-object/DeviceEmployee'
import { DeviceLocation } from '../../domain/value-object/DeviceLocation'
import { DeviceSerial } from '../../domain/value-object/DeviceSerial'
import { DeviceStockNumber } from '../../domain/value-object/DeviceStockNumber'
import { HardDriveHealth } from '../../domain/value-object/HardDriveHealth'
import { MACAddress } from '../../domain/value-object/MACAddress'
import { MemoryRam } from '../../domain/value-object/MemoryRam'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type DevicesErrors,
	type State
} from './devicesFormReducer'

export const updateValidation = (state: State): State => {
	const { formData } = state
	//const status = formData.statusId as (typeof StatusOptions)[keyof typeof StatusOptions]
	const status = formData.statusId
		? (formData.statusId as (typeof StatusOptions)[keyof typeof StatusOptions])
		: undefined

	const errors: DevicesErrors = {
		statusId: '',
		mainCategoryId: '',
		categoryId: '',
		brandId: '',
		modelId: '',
		memoryRam: '',
		observation: '',
		serial: DeviceSerial.isValid({ serial: formData.serial })
			? ''
			: DeviceSerial.invalidMessage(),
		activo: DeviceActivo.isValid({ value: formData.activo })
			? ''
			: DeviceActivo.invalidMessage(),
		locationId: DeviceLocation.isValid({
			typeOfSite: formData.typeOfSiteId,
			status
		})
			? ''
			: DeviceLocation.invalidMessage(),
		employeeId: DeviceEmployee.isValid({
			value: formData.employeeId,
			status
		})
			? ''
			: DeviceEmployee.invalidMessage(),
		stockNumber: DeviceStockNumber.isValid({
			value: formData.stockNumber,
			status
		})
			? ''
			: DeviceStockNumber.invalidMessage(),
		computerName: ComputerName.isValid({ value: formData.computerName, status })
			? ''
			: ComputerName.invalidMessage(),
		ipAddress: IPAddress.isValid({ value: formData.ipAddress, status })
			? ''
			: IPAddress.invalidMessage(),
		memoryRamCapacity: MemoryRam.isValid({
			value: formData.memoryRam,
			status
		})
			? ''
			: MemoryRam.invalidMessage(),
		processorId: ComputerProcessor.isValid({
			value: formData.processorId,
			status
		})
			? ''
			: ComputerProcessor.invalidMessage(),
		hardDriveCapacityId: ComputerHDDCapacity.isValid({
			value: formData.hardDriveCapacityId,
			status
		})
			? ''
			: ComputerHDDCapacity.invalidMessage(),
		hardDriveTypeId: ComputerHDDType.isValid({
			value: formData.hardDriveTypeId,
			hardDriveCapacity: formData.hardDriveCapacityId
		})
			? ''
			: ComputerHDDType.invalidMessage(),
		operatingSystemId: ComputerOs.isValid({
			value: formData.operatingSystemId,
			status,
			hardDriveCapacity: formData.hardDriveCapacityId
		})
			? ''
			: ComputerOs.invalidMessage(),
		operatingSystemArqId: ComputerOsArq.isValid({
			value: formData.operatingSystemArqId,
			operatingSystem: formData.operatingSystemId
		})
			? ''
			: ComputerOsArq.invalidMessage(),
		macAddress: MACAddress.isValid({ value: formData.macAddress })
			? ''
			: MACAddress.invalidMessage(formData.macAddress),
		health: HardDriveHealth.isValid({ value: formData.health })
			? ''
			: HardDriveHealth.invalidMessage()
	}

	const disabled: DevicesDisabled = {
		...state.disabled,
		categoryId: !formData.mainCategoryId,
		brandId: !formData.categoryId,
		modelId: !formData.brandId,
		locationId: !status || status === StatusOptions.DESINCORPORADO,
		stockNumber:
			!status ||
			!(status === StatusOptions.INALMACEN || status === StatusOptions.PORDESINCORPORAR),
		employeeId:
			!status ||
			status === StatusOptions.INALMACEN ||
			status === StatusOptions.PORDESINCORPORAR ||
			status === StatusOptions.DESINCORPORADO ||
			status === StatusOptions.DISPONIBLE,

		computerName:
			status === StatusOptions.INALMACEN ||
			status === StatusOptions.PORDESINCORPORAR ||
			status === StatusOptions.DESINCORPORADO,
		ipAddress:
			status === StatusOptions.INALMACEN ||
			status === StatusOptions.PORDESINCORPORAR ||
			status === StatusOptions.DESINCORPORADO,
		hardDriveTypeId: !formData.hardDriveCapacityId,
		operatingSystemId:
			status === StatusOptions.INALMACEN ||
			status === StatusOptions.PORDESINCORPORAR ||
			status === StatusOptions.DESINCORPORADO ||
			!formData.hardDriveCapacityId,
		operatingSystemArqId: !formData.operatingSystemId
	}

	const required: DeviceRequired = {
		...state.required,
		serial: !formData.genericModel,
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
		hardDriveTypeId: !!formData.hardDriveCapacityId,
		operatingSystemId:
			status === StatusOptions.INUSE ||
			status === StatusOptions.PRESTAMO ||
			status === StatusOptions.CONTINGENCIA ||
			status === StatusOptions.GUARDIA,
		operatingSystemArqId: !!formData.operatingSystemId
	}
	return {
		formData,
		errors,
		disabled,
		required
	}
}

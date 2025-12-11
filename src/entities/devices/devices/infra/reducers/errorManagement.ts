import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { ComputerHDDCapacity } from '../../domain/value-object/ComputerHDDCapacity'
import { ComputerHDDType } from '../../domain/value-object/ComputerHDDType'
import { IPAddress } from '../../domain/value-object/IPAddress'
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
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'

export const updateValidation = (state: State): State => {
	const { formData, errors: prevErrors, disabled: prevDisabled, required: prevRequired } = state
	const status = formData.statusId as (typeof StatusOptions)[keyof typeof StatusOptions]

	const isComputer = formData.mainCategoryId === MainCategoryOptions.COMPUTER
	const isHardDrive = formData.categoryId === CategoryOptions.HARDDRIVE

	// Limpiar campos que no aplican a la categoría para evitar validaciones incorrectas
	if (!isComputer) {
		formData.computerName = ''
		// ... limpiar otros campos específicos de computadora
	}

	const errors: DevicesErrors = {
		statusId: '',
		mainCategoryId: '',
		categoryId: '',
		brandId: '',
		modelId: '',
		memoryRam: prevErrors.memoryRam,
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
		computerName:
			isComputer && ComputerName.isValid({ value: formData.computerName, status })
				? ''
				: isComputer
				? ComputerName.invalidMessage()
				: '',
		ipAddress: IPAddress.isValid({ value: formData.ipAddress, status }) ? '' : IPAddress.invalidMessage(),
		memoryRamCapacity:
			isComputer && MemoryRam.isValid({ value: formData.memoryRam, status })
				? ''
				: isComputer
				? MemoryRam.invalidMessage()
				: '',
		processorId:
			isComputer && ComputerProcessor.isValid({ value: formData.processorId, status })
				? ''
				: isComputer
				? ComputerProcessor.invalidMessage()
				: '',
		hardDriveCapacityId:
			(isComputer || isHardDrive) &&
			ComputerHDDCapacity.isValid({
				value: formData.hardDriveCapacityId,
				status
			})
				? ''
				: isComputer || isHardDrive
				? ComputerHDDCapacity.invalidMessage()
				: '',
		hardDriveTypeId:
			(isComputer || isHardDrive) &&
			ComputerHDDType.isValid({
				value: formData.hardDriveTypeId,
				hardDriveCapacity: formData.hardDriveCapacityId
			})
				? ''
				: isComputer || isHardDrive
				? ComputerHDDType.invalidMessage()
				-				: '',
		operatingSystemId:
			isComputer &&
			ComputerOs.isValid({
				value: formData.operatingSystemId,
				status,
				hardDriveCapacity: formData.hardDriveCapacityId
			})
				? ''
				: isComputer
				? ComputerOs.invalidMessage()
				: '',
		operatingSystemArqId:
			isComputer &&
			ComputerOsArq.isValid({
				value: formData.operatingSystemArqId,
				operatingSystem: formData.operatingSystemId
			})
				? ''
				: isComputer
				? ComputerOsArq.invalidMessage()
				: '',
		macAddress:
			isComputer && MACAddress.isValid({ value: formData.macAddress })
				? ''
				: isComputer
				? MACAddress.invalidMessage(formData.macAddress)
				: '',
		health:
			isHardDrive && HardDriveHealth.isValid({ value: formData.health })
				? ''
				: isHardDrive
				? HardDriveHealth.invalidMessage()
				: ''
	}

	const disabled: DevicesDisabled = {
		...prevDisabled,
		categoryId: !formData.mainCategoryId,
		brandId: !formData.categoryId,
		modelId: !formData.brandId,
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
		hardDriveTypeId: !formData.hardDriveCapacityId || !isComputer,
		operatingSystemId:
			status === StatusOptions.INALMACEN ||
			status === StatusOptions.PORDESINCORPORAR ||
			status === StatusOptions.DESINCORPORADO ||
			!formData.hardDriveCapacityId,
		operatingSystemArqId: !formData.operatingSystemId
	}

	const required: DeviceRequired = {
		...prevRequired,
		serial: !formData.genericModel,
		employeeId:
			status === StatusOptions.PRESTAMO ||
			status === StatusOptions.CONTINGENCIA ||
			status === StatusOptions.GUARDIA,
		locationId: status !== StatusOptions.DESINCORPORADO,
		computerName: !(
			!isComputer ||
			status === StatusOptions.INALMACEN ||
			status === StatusOptions.PORDESINCORPORAR ||
			status === StatusOptions.DESINCORPORADO
		),
		ipAddress:
			status === StatusOptions.INUSE &&
			(isComputer || formData.categoryId === CategoryOptions.PRINTERS),
		memoryRamCapacity:
			isComputer &&
			(status === StatusOptions.INUSE ||
				status === StatusOptions.PRESTAMO ||
				status === StatusOptions.CONTINGENCIA ||
				status === StatusOptions.GUARDIA),
		processorId:
			isComputer &&
			(status === StatusOptions.INUSE ||
				status === StatusOptions.INALMACEN ||
				status === StatusOptions.PRESTAMO ||
				status === StatusOptions.GUARDIA ||
				status === StatusOptions.CONTINGENCIA),
		hardDriveCapacityId:
			(isComputer || isHardDrive) &&
			(status === StatusOptions.INUSE ||
				status === StatusOptions.PRESTAMO ||
				status === StatusOptions.CONTINGENCIA ||
				status === StatusOptions.GUARDIA),
		hardDriveTypeId: !!formData.hardDriveCapacityId && (isComputer || isHardDrive),
		operatingSystemId:
			isComputer &&
			status === StatusOptions.INUSE ||
				status === StatusOptions.PRESTAMO ||
				status === StatusOptions.CONTINGENCIA ||
				status === StatusOptions.GUARDIA),
		operatingSystemArqId: !!formData.operatingSystemId && isComputer
	}
	return {
		formData,
		errors,
		disabled,
		required
	}
}

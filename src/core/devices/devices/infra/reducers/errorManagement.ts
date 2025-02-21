import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
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
import { type State } from './devicesFormReducer'

export const updateValidation = (state: State) => {
	const newState = { ...state }
	const { formData } = newState

	newState.errors = {
		...newState.errors,
		serial: DeviceSerial.isValid(formData.serial) ? '' : DeviceSerial.invalidMessage(),
		activo: DeviceActivo.isValid(formData.activo) ? '' : DeviceActivo.invalidMessage(),
		locationId: DeviceLocation.isValid({
			typeOfSite: formData.typeOfSiteId,
			status: formData.statusId
		})
			? ''
			: DeviceLocation.invalidMessage(),
		employeeId: DeviceEmployee.isValid(formData.employeeId, formData.statusId)
			? ''
			: DeviceEmployee.invalidMessage(),
		stockNumber: DeviceStockNumber.isValid(formData.stockNumber, formData.statusId)
			? ''
			: DeviceStockNumber.invalidMessage(),
		computerName: ComputerName.isValid(formData.computerName, formData.statusId)
			? ''
			: ComputerName.invalidMessage(),
		ipAddress: IPAddress.isValid(formData.ipAddress, formData.statusId)
			? ''
			: IPAddress.invalidMessage(),
		memoryRamCapacity: MemoryRam.isValid(formData.memoryRam, formData.statusId)
			? ''
			: MemoryRam.invalidMessage(),
		processorId: ComputerProcessor.isValid(formData.processorId, formData.statusId)
			? ''
			: ComputerProcessor.invalidMessage(),
		hardDriveCapacityId: ComputerHDDCapacity.isValid(
			formData.hardDriveCapacityId,
			formData.statusId
		)
			? ''
			: ComputerHDDCapacity.invalidMessage(),
		hardDriveTypeId: ComputerHDDType.isValid(
			formData.hardDriveTypeId,
			formData.hardDriveCapacityId
		)
			? ''
			: ComputerHDDType.invalidMessage(),
		operatingSystemId: ComputerOs.isValid(
			formData.operatingSystemId,
			formData.statusId,
			formData.hardDriveCapacityId
		)
			? ''
			: ComputerOs.invalidMessage(),
		operatingSystemArqId: ComputerOsArq.isValid(
			formData.operatingSystemArqId,
			formData.operatingSystemId
		)
			? ''
			: ComputerOsArq.invalidMessage(),
		macAddress: MACAddress.isValid(formData.macAddress)
			? ''
			: MACAddress.invalidMessage(formData.macAddress),
		health: HardDriveHealth.isValid(formData.health) ? '' : HardDriveHealth.invalidMessage()
	}

	newState.disabled = {
		...newState.disabled,
		categoryId: !formData.mainCategoryId,
		brandId: !formData.categoryId,
		modelId: !formData.brandId,
		locationId:
			!formData.statusId || [StatusOptions.DESINCORPORADO].includes(formData.statusId),
		stockNumber:
			!formData.statusId ||
			![StatusOptions.INALMACEN, StatusOptions.PORDESINCORPORAR].includes(formData.statusId),
		employeeId:
			!formData.statusId ||
			[
				StatusOptions.INALMACEN,
				StatusOptions.PORDESINCORPORAR,
				StatusOptions.DESINCORPORADO,
				StatusOptions.DISPONIBLE
			].includes(formData.statusId),
		computerName: [
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO
		].includes(formData.statusId),
		ipAddress: [
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO
		].includes(formData.statusId),
		hardDriveTypeId: !formData.hardDriveCapacityId,
		operatingSystemId:
			[
				StatusOptions.INALMACEN,
				StatusOptions.PORDESINCORPORAR,
				StatusOptions.DESINCORPORADO
			].includes(formData.statusId) || !formData.hardDriveCapacityId,
		operatingSystemArqId: !formData.operatingSystemId
	}

	newState.required = {
		...newState.required,
		serial: !formData.genericModel,
		employeeId: [
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		].includes(formData.statusId),
		locationId: ![StatusOptions.DESINCORPORADO].includes(formData.statusId),
		computerName: ![
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO
		].includes(formData.statusId),
		ipAddress: [StatusOptions.INUSE].includes(formData.statusId),
		memoryRamCapacity: [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		].includes(formData.statusId),
		processorId: [
			StatusOptions.INUSE,
			StatusOptions.INALMACEN,
			StatusOptions.PRESTAMO,
			StatusOptions.GUARDIA,
			StatusOptions.CONTINGENCIA
		].includes(formData.statusId),
		hardDriveCapacityId: [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		].includes(formData.statusId),
		hardDriveTypeId: !!formData.hardDriveCapacityId,
		operatingSystemId: [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		].includes(formData.statusId),
		operatingSystemArqId: !!formData.operatingSystemId
	}
	return newState
}

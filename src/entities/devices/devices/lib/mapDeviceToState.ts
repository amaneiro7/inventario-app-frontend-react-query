import { type DeviceDto } from '../domain/dto/Device.dto'
import { type DefaultDevice } from '../infra/reducers/devicesFormReducer'
import { setMemoryRamValues } from './setMemoryRamValues'

export const mapDeviceToState = (
	device: DeviceDto
): {
	originalData: DeviceDto
	mappedData: DefaultDevice
} => {
	const { computer, model, hardDrive, printer } = device
	const memoryRamSlotQuantity =
		model?.modelComputer?.memoryRamSlotQuantity || model?.modelLaptop?.memoryRamSlotQuantity
	const memoryRamType =
		model?.modelComputer?.memoryRamType?.name ?? model?.modelLaptop?.memoryRamType?.name ?? ''
	const memoryRam = setMemoryRamValues(computer, memoryRamSlotQuantity)

	// Si la capacidad de la RAM está definida y el número de slots no coincide, actualiza el primer slot.
	if (
		computer &&
		computer.memoryRamCapacity > 0 &&
		computer.memoryRam.length !== memoryRamSlotQuantity
	) {
		memoryRam[0] = Number(computer.memoryRamCapacity)
	}

	const mappedData: DefaultDevice = {
		id: device.id,
		statusId: device.statusId,
		mainCategoryId: device.category.mainCategoryId,
		categoryId: device.categoryId,
		serial: device.serial ?? '',
		activo: device.activo ?? '',
		brandId: device.brandId,
		modelId: device.modelId,
		genericModel: model?.generic,
		employeeId: device.employeeId ?? '',
		locationId: device.locationId ?? '',
		typeOfSiteId: device.location?.typeOfSiteId ?? '',
		observation: device.observation ?? '',
		stockNumber: device.stockNumber ?? '',
		computerName: computer?.computerName ?? '',
		processorId: computer?.processorId ?? '',
		memoryRamCapacity: computer?.memoryRamCapacity ?? 0,
		hardDriveCapacityId: computer?.hardDriveCapacityId || hardDrive?.hardDriveCapacityId || '',
		hardDriveTypeId: computer?.hardDriveTypeId || hardDrive?.hardDriveTypeId || '',
		operatingSystemArqId: computer?.operatingSystemArqId ?? '',
		operatingSystemId: computer?.operatingSystemId ?? '',
		ipAddress: computer?.ipAddress || printer?.ipAddress || '',
		macAddress: computer?.macAddress ?? '',
		health: hardDrive?.health ?? 100,
		memoryRam: memoryRam,
		memoryRamSlotQuantity,
		memoryRamType,
		history: device.history,
		updatedAt: device.updatedAt
	}

	return {
		originalData: device,
		mappedData
	}
}

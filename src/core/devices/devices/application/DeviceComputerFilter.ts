import { DeviceGetAllRepository } from '../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from './DeviceGetAll'

export interface DeviceComputerFilters {
	categoryId: string
	brandId: string
	statusId: string
	activo: string
	serial: string
	modelId: string
	employeeId: string
	locationId: string
	typeOfSiteId: string
	cityId: string
	stateId: string
	regionId: string
	computerName: string
	operatingSystemId: string
	operatingSystemArqId: string
	ipAddress: string
	processor: string
}

export class DeviceComputerFilter {
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search(optiosn?: DeviceComputerFilters) {
		let

		return this.getAll.execute()
	}
}

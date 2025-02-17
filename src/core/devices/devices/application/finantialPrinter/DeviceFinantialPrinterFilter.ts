import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import {
	createDeviceQueryParams,
	type DeviceFinantialPrinterFilters
} from './CreateDeviceFinantialPrinterParams'

export const defaultMainCategoryValue = MainCategoryOptions.FINANTIALPRINTER

export class DeviceFinantialPrinterFilter {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'employeeId'
	private readonly getAll: DeviceGetAll
	constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = DeviceFinantialPrinterFilter.defaultPageSize,
		orderBy = DeviceFinantialPrinterFilter.defaultOrderBy,
		orderType,
		...options
	}: DeviceFinantialPrinterFilters) {
		const queryParams = await createDeviceQueryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType,
			defaultQuery: 'finantialPrinter'
		})

		return this.getAll.execute(queryParams)
	}
}

import { type HardDriveTypeGetAllRepository } from '../domain/repository/HardDriveTypeGetAllRepository'
import { HardDriveTypeGetAll } from './HardDriveTypeGetAll'
import {
	createHardDriveTypeParams,
	type HardDriveTypeFilters
} from './createHardDriveTypeQueryParams'

/**
 * @class HardDriveTypeGetByCriteria
 * @description Clase de caso de uso para obtener entidades `HardDriveType` por criterios de búsqueda.
 * Utiliza `HardDriveTypeGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class HardDriveTypeGetByCriteria {
	private readonly getAll: HardDriveTypeGetAll

	/**
	 * Crea una instancia de `HardDriveTypeGetByCriteria`.
	 * @param {HardDriveTypeGetAllRepository} repository - El repositorio para obtener todos los tipos de disco duro.
	 */ constructor(private readonly repository: HardDriveTypeGetAllRepository) {
		this.getAll = new HardDriveTypeGetAll(this.repository)
	}

	/**
	 * Busca tipos de disco duro basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `HardDriveTypeGetAll`.
	 * @param {HardDriveTypeFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/HardDriveType.dto').HardDriveTypeDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: HardDriveTypeFilters) {
		const queryParams = await createHardDriveTypeParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
